import { roleConfig } from "@/constants/theme";
import type { Role } from "@/types/role.type";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../ui/text";

interface ShiftCardProps {
  pieces: number;
  date: Date;
  totalValue: number;
  role: Role;
  onPress?: () => void;
}

export const ShiftCard = ({
  pieces,
  date,
  totalValue,
  role,
  onPress,
}: ShiftCardProps) => {
  const colors = roleConfig[role];

  const formattedPrice = `R$${totalValue.toFixed(2).replace(".", ",")}`;

  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const dataFormatada = `${date.getDate()} de ${meses[date.getMonth()]} de ${date.getFullYear()}`;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="mb-4 w-full rounded-3xl border-[1.5px] py-3 px-4 bg-general-bg"
      style={{ borderColor: colors.surface }}
    >
      {/* Peças e Data */}
      <View className="flex-row justify-between items-center mb-1">
        <Text
          className="font-poppins-medium text-xl"
          style={{ color: colors.main }}
        >
          {pieces} {pieces === 1 ? "Peça" : "Peças"}
        </Text>
        <Text
          className="font-poppins-extralight text-lg"
          style={{ color: "#6b7280" }}
        >
          {dataFormatada}
        </Text>
      </View>

      {/* Valor Total e Preço */}
      <View className="flex-row justify-between items-center">
        <Text
          className="font-poppins-regular text-lg"
          style={{ color: colors.dark }}
        >
          Valor Total
        </Text>
        <Text
          className="font-poppins-regular text-xl"
          style={{ color: colors.main }}
        >
          {formattedPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
