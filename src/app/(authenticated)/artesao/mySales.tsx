import { SalesOverviewCard } from "@/components/artesao/salesOverviewCard";
import { SoldItemCard } from "@/components/artesao/soldItemCard";
import { DiscountInfoModal } from "@/components/modals/discountInfoModal";
import { CalendarModal } from "@/components/shared/calendarModal";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import { fetchSalesData, SalesSummary, SoldItem } from "@/mocks/salesMock";
import { exportSalesToExcel } from "@/utils/exportSales";
import { Calendar, Info, Printer } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";

const getCurrentWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const start = new Date(today);
  start.setDate(today.getDate() - dayOfWeek);

  const end = new Date(today);
  end.setDate(today.getDate() + (6 - dayOfWeek));

  return { start, end };
};

// Função auxiliar para formatar a data
const formatRangeString = (start: Date, end: Date) => {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const startStr = formatter.format(start);
  const endStr = formatter.format(end);

  if (start.getFullYear() === end.getFullYear()) {
    const shortStartStr = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
    }).format(start);
    return `De ${shortStartStr} até\n${endStr}`;
  }
  return `De ${startStr} até\n${endStr}`;
};

export default function MySalesScreen() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SalesSummary | null>(null);
  const [items, setItems] = useState<SoldItem[]>([]);
  const [IsOpenDiscountInfo, setIsOpenDiscountInfo] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const initialWeek = getCurrentWeek();
  const [selectedStart, setSelectedStart] = useState<Date | null>(
    initialWeek.start,
  );
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(initialWeek.end);
  const [dateRange, setDateRange] = useState(
    formatRangeString(initialWeek.start, initialWeek.end),
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchSalesData();
        setSummary(data.summary);
        setItems(data.items);
      } catch (error) {
        toast.error("Erro ao carregar dados de vendas.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handlePrint = async () => {
    if (!summary || items.length === 0) {
      toast.error("Sem dados para exportar", {
        description: "Não há vendas no período selecionado.",
      });
      return;
    }

    toast.info("Gerando relatório...");

    const success = await exportSalesToExcel(items, summary, dateRange);

    if (success) {
      toast.success("Relatório gerado com sucesso!");
    } else {
      toast.error("Erro ao gerar arquivo", {
        description: "Não foi possível criar o relatório em Excel.",
      });
    }
  };

  const handleConfirmDateRange = (start: Date | null, end: Date | null) => {
    setCalendarOpen(false);

    setSelectedStart(start);
    setSelectedEnd(end);

    if (start && end) {
      setDateRange(formatRangeString(start, end));
      toast.success("Período atualizado.");
    } else if (start) {
      const str = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(start);
      setDateRange(`Dia ${str}`);
      toast.success("Data atualizada.");
    }
  };

  return (
    <ScreenTemplate
      navbar={{ appRole: "artesao", title: "Minhas Vendas", showBack: true }}
      className="bg-[#FDFBF5]"
    >
      {loading || !summary ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#14532D" />
        </View>
      ) : (
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="flex-row items-center justify-between py-6">
            <TouchableOpacity onPress={handlePrint} className="p-2">
              <Printer size={24} color="#14532D" strokeWidth={1.5} />
            </TouchableOpacity>

            <Text className="text-center font-poppins-regular text-[16px] text-artesao-dark leading-tight">
              {dateRange}
            </Text>

            <TouchableOpacity
              onPress={() => setCalendarOpen(true)}
              className="p-2"
            >
              <Calendar size={24} color="#14532D" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
          <View className="h-[1px] w-full bg-artesao-dark/50 mb-4" />

          <TouchableOpacity
            className="flex-row items-center justify-between mb-3"
            onPress={() => setIsOpenDiscountInfo(true)}
          >
            <Text className="font-poppins-medium text-xl text-artesao-main">
              Faturamento
            </Text>
            <Info size={18} color="#14532D" />
          </TouchableOpacity>

          <SalesOverviewCard summary={summary} />

          <Text className="font-poppins-medium text-xl text-artesao-main mb-4 mt-2">
            Peças Vendidas
          </Text>

          {items.map((item) => (
            <SoldItemCard key={item.id} item={item} />
          ))}
        </ScrollView>
      )}

      <CalendarModal
        visible={isCalendarOpen}
        onClose={() => setCalendarOpen(false)}
        onConfirm={handleConfirmDateRange}
        initialStartDate={selectedStart}
        initialEndDate={selectedEnd}
        role="artesao"
        selectPeriod
      />
      <DiscountInfoModal
        visible={IsOpenDiscountInfo}
        onClose={() => setIsOpenDiscountInfo(false)}
      />
    </ScreenTemplate>
  );
}
