import { Text } from "@/components/ui/text";
import { SoldItem } from "@/mocks/salesMock";
import { View } from "react-native";

interface SoldItemCardProps {
  item: SoldItem;
}

export const SoldItemCard = ({ item }: SoldItemCardProps) => {
  const formatCurrency = (val: number) =>
    `R$${val.toFixed(2).replace(".", ",")}`;

  return (
    <View className="rounded-3xl bg-artesao-surface p-5 mb-4 ">
      {/* Cabeçalho do Card */}
      <View className="flex-row justify-between items-start mb-3">
        <Text className="font-poppins-regular text-xl text-artesao-main flex-1 mr-2">
          {item.title}
        </Text>
        <Text className="font-poppins-light text-4xl text-artesao-main/70">
          {item.code}
        </Text>
      </View>

      {/* Tag de Status */}
      <View className="bg-artesao-main rounded-full self-start px-3 py-0.5 mb-4">
        <Text className="font-poppins-regular text-[11px] text-white">
          {item.status}
        </Text>
      </View>

      <View className="h-[1px] w-full bg-artesao-light mb-4" />

      {/* Preço de Venda */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="font-poppins-light text-lg text-artesao-dark">
          Preço de Venda
        </Text>
        <Text className="font-poppins-regular text-lg text-artesao-dark">
          {formatCurrency(item.salePrice)}
        </Text>
      </View>

      {/* Forma de Pagamento */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="font-poppins-light text-lg text-artesao-dark">
          Forma de Pagamento
        </Text>
        <View className="bg-artesao-main rounded-full px-3 py-0.5">
          <Text className="font-poppins-regular text-[11px] text-white">
            {item.paymentMethod}
          </Text>
        </View>
      </View>

      {/* Descontos Gerais */}
      <View className="flex-row justify-between items-center mb-1">
        <Text className="font-poppins-light text-lg text-artesao-dark">
          Descontos
        </Text>
        <Text className="font-poppins-regular text-[16px] text-toaster-warning">
          {formatCurrency(
            item.discounts.reduce((acc, curr) => acc + curr.amount, 0),
          )}
        </Text>
      </View>

      {/* Detalhamento Descontos Item */}
      <View className="pl-0 mb-4">
        {item.discounts.map((discount, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center mb-1"
          >
            <Text className="font-poppins-light text-[13px] text-artesao-main/70">
              {discount.label}
            </Text>
            <Text className="font-poppins-light text-[13px] text-toaster-warning">
              {formatCurrency(discount.amount)}
            </Text>
          </View>
        ))}
      </View>

      <View className="h-[1px] w-full bg-artesao-light mb-4" />

      {/* Faturamento Líquido */}
      <View className="flex-row justify-between items-center">
        <Text className="font-poppins-regular text-xl text-artesao-main">
          Faturamento
        </Text>
        <Text className="font-poppins-medium text-xl text-artesao-main">
          {formatCurrency(item.netTotal)}
        </Text>
      </View>
    </View>
  );
};
