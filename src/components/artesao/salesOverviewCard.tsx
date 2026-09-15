import { Text } from "@/components/ui/text";
import { SalesSummary } from "@/mocks/salesMock";
import { View } from "react-native";

interface SalesOverviewCardProps {
  summary: SalesSummary;
}

export const SalesOverviewCard = ({ summary }: SalesOverviewCardProps) => {
  const formatCurrency = (val: number) =>
    `R$${val.toFixed(2).replace(".", ",")}`;

  return (
    <View className="rounded-3xl border-2 border-artesao-surface mb-6 p-4 bg-general-bg">
      {/* Total Vendido */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="font-poppins-regular text-[16px] text-artesao-extraDark">
          Total Vendido:
        </Text>
        <Text className="font-poppins-regular text-[16px] text-toaster-success">
          {formatCurrency(summary.totalSold)}
        </Text>
      </View>

      {/* Total Descontos */}
      <View className="flex-row justify-between items-center mb-1">
        <Text className="font-poppins-regular text-[16px] text-artesao-extraDark">
          Total Descontos:
        </Text>
        <Text className="font-poppins-regular text-[16px] text-toaster-warning">
          {formatCurrency(summary.totalDiscounts)}
        </Text>
      </View>

      {/* Detalhamento dos Descontos */}
      <View className="pl-0 mb-4">
        {summary.discountsBreakdown.map((discount, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center mb-1"
          >
            <Text className="font-poppins-light text-[13px] w-[60%] text-artesao-extraDark/50">
              {discount.label}
            </Text>
            <Text className="font-poppins-light text-[13px] text-toaster-warning">
              {formatCurrency(discount.amount)}
            </Text>
          </View>
        ))}
      </View>

      {/* Linha separadora */}
      <View className="h-[1px] w-full bg-[#E8EFE8] mb-4" />

      {/* Total a Receber */}
      <View className="flex-row justify-between items-center">
        <Text className="font-poppins-medium text-xl text-artesao-extraDark">
          Total a Receber:
        </Text>
        <Text className="font-poppins-medium text-xl text-toaster-success">
          {formatCurrency(summary.totalToReceive)}
        </Text>
      </View>
    </View>
  );
};
