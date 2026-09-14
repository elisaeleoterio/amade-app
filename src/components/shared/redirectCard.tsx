import type { Role } from "@/types/role.type";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../ui/text";

interface RedirectCardProps {
  title: string;
  description: string;
  icon: any;
  route: string;
  role: Role;
}

// Configuração de cores baseada no role do usuário
const roleConfig = {
  artesao: {
    primary: "#14532D", // Verde escuro (textos e ícones)
    border: "#C6DACB", // Verde claro (borda)
  },
  lojista: {
    primary: "#9F1239",
    border: "#F4C4D0",
  },
  admin: {
    primary: "#712B05",
    border: "#EAD6CC",
  },
};

export const RedirectCard = ({
  title,
  description,
  icon: Icon,
  route,
  role,
}: RedirectCardProps) => {
  const router = useRouter();
  const colors = roleConfig[role];

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => router.push(route as any)}
      className="mb-4 w-full flex-row items-center rounded-2xl border-[1.5px] p-5"
      style={{
        borderColor: colors.border,
      }}
    >
      {/* Ícone à esquerda */}
      <View className="mr-5 items-center justify-center">
        <Icon size={44} color={colors.primary} strokeWidth={1.5} />
      </View>

      {/* Textos à direita */}
      <View className="flex-1">
        <Text
          className="mb-1 font-poppins-regular text-[24px]"
          style={{ color: colors.primary }}
        >
          {title}
        </Text>

        <Text className="font-poppins-regular text-[15px] leading-snug text-artesao-dark">
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
