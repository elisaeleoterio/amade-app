import AmadeLogo from "@/assets/logoComplete.svg";
import { roleConfig } from "@/constants/theme";
import type { Role } from "@/types/role.type";
import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "../ui/text";

interface ItemCardProps {
  title: string;
  code: string;
  price: number;
  imageUrl: string;
  role: Role;
  status: string;
  paymentMethod?: string;
  onPress?: () => void;
  quantity?: number;
}

export const ProductCard = ({
  title,
  code,
  price,
  imageUrl,
  role,
  status,
  paymentMethod,
  onPress,
  quantity,
}: ItemCardProps) => {
  const colors = roleConfig[role];

  const Tag = ({ label }: { label?: string }) => {
    if (!label) return null;
    return (
      <View
        className="self-start rounded-full px-3 py-1 mr-2 mb-2"
        style={{ backgroundColor: colors.tagBg }}
      >
        <Text
          className="font-poppins-medium text-[12px]"
          style={{ color: colors.primary }}
        >
          {label}
        </Text>
      </View>
    );
  };

  const formattedPrice = `R$${price.toFixed(2).replace(".", ",")}`;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      className="mb-4 w-full flex-row rounded-3xl border-[1.5px] p-3 bg-general-bg"
      style={{ borderColor: colors.border }}
    >
      {/* Imagem do Produto */}
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          className="h-40 w-28 rounded-2xl bg-gray-100"
          resizeMode="cover"
        />
      ) : (
        <View className="h-40 w-28 rounded-2xl bg-gray-100 justify-center items-center">
          <AmadeLogo color={"#d1d5db"} width={60} height={60} />
        </View>
      )}

      <View className="ml-4 flex-1 py-1">
        {/* Título */}
        <Text
          className="font-poppins-medium text-xl"
          style={{ color: colors.primary }}
          numberOfLines={1}
        >
          {title}
        </Text>

        {/* Linha Divisória */}
        <View
          className="h-[1px] w-full my-2"
          style={{ backgroundColor: colors.line }}
        />

        {/* Código */}
        <View className="flex-row justify-between items-center mb-2">
          <Text
            className="font-poppins-regular text-[14px]"
            style={{ color: colors.primary }}
          >
            {code}
          </Text>

          {quantity !== undefined && quantity > 1 && (
            <Text
              className="font-poppins-medium text-[14px]"
              style={{ color: colors.primary }}
            >
              Qtd: {quantity}
            </Text>
          )}
        </View>

        {/* Tags Condicionais baseadas no Role */}
        <View className="flex-row flex-wrap">
          {(role === "artesao" || role === "admin") && <Tag label={status} />}

          {(role === "lojista" || role === "admin") && (
            <Tag label={paymentMethod} />
          )}
        </View>

        {/* Preço */}
        <Text
          className="font-poppins-medium text-[22px] mt-1"
          style={{ color: colors.primary }}
        >
          {formattedPrice}
        </Text>
        <View
          className="h-[1px] w-full mt-2"
          style={{ backgroundColor: colors.line }}
        />
      </View>
    </TouchableOpacity>
  );
};
