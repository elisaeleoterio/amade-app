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
}

const roleConfig = {
  artesao: {
    primary: "#14532D",
    border: "#C6DACB",
    tagBg: "#E5EFE5",
    line: "#E5EFE5",
  },
  lojista: {
    primary: "#4C0519",
    border: "#F4C4D0",
    tagBg: "#F3E4E5",
    line: "#F3E4E5",
  },
  admin: {
    primary: "#2A0F01",
    border: "#EAD6CC",
    tagBg: "#E0D1C7",
    line: "#E0D1C7",
  },
};

export const ProductCard = ({
  title,
  code,
  price,
  imageUrl,
  role,
  status,
  paymentMethod,
  onPress,
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

  // Formatação do preço (ex: 700.00 -> 700,00)
  const formattedPrice = `R$${price.toFixed(2).replace(".", ",")}`;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      className="mb-4 w-full flex-row rounded-3xl border-[1.5px] p-3 bg-general-bg"
      style={{ borderColor: colors.border }}
    >
      {/* Imagem do Produto */}
      <Image
        source={{ uri: imageUrl }}
        className="h-40 w-28 rounded-2xl bg-gray-100"
        resizeMode="cover"
      />

      {/* Conteúdo à Direita */}
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
        <Text
          className="font-poppins-regular text-[14px] mb-2"
          style={{ color: colors.primary }}
        >
          {code}
        </Text>

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

        {/* Linha Divisória Inferior (conforme o design) */}
        <View
          className="h-[1px] w-full mt-2"
          style={{ backgroundColor: colors.line }}
        />
      </View>
    </TouchableOpacity>
  );
};
