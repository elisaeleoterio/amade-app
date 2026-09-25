import { SalesSummary, SoldItem } from "@/mocks/salesMock";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import * as XLSX from "xlsx";

const formatExcelDate = (dateObj: Date) => {
  return new Intl.DateTimeFormat("pt-BR").format(dateObj);
};

export const exportSalesToExcel = async (
  items: SoldItem[],
  summary: SalesSummary,
  dateRangeText: string,
) => {
  try {
    const dataRows = items.map((item) => ({
      "Data da Venda": formatExcelDate(item.date),
      "Nome do Produto": item.title,
      Código: item.code,
      Status: item.status,
      "Forma de Pagamento": item.paymentMethod,
      "Preço de Venda (R$)": item.salePrice,
      "Descontos (R$)": item.discounts.reduce((acc, d) => acc + d.amount, 0),
      "Faturamento Líquido (R$)": item.netTotal,
    }));

    // Linha em branco
    dataRows.push({} as any);

    dataRows.push({
      "Nome do Produto": "Resumo do Período",
      Código: "",
      Status: "",
      "Forma de Pagamento": "",
      "Preço de Venda (R$)": summary.totalSold,
      "Descontos (R$)": summary.totalDiscounts,
      "Faturamento Líquido (R$)": summary.totalToReceive,
    } as any);

    // Cria a planilha (Worksheet) e a pasta de trabalho (Workbook)
    const worksheet = XLSX.utils.json_to_sheet(dataRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendas");

    // Converte o arquivo para formato Base64 (necessário para o mobile)
    const wbout = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });

    // Definir o caminho temporário onde o arquivo será salvo no celular
    const safeDateRange = dateRangeText.replace(/\n/g, " ").replace(/\//g, "-");
    const uri =
      FileSystem.cacheDirectory + `Relatorio_Vendas_${safeDateRange}.xlsx`;

    // Escreve o arquivo no dispositivo
    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Abre compartilhamento
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(uri, {
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        dialogTitle: "Exportar Relatório de Vendas",
      });
    }

    return true;
  } catch (error) {
    console.error("Erro ao gerar Excel:", error);
    return false;
  }
};
