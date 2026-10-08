import { roleConfig } from "@/constants/theme";
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
        borderColor: colors.surface,
      }}
    >
      {/* Ícone à esquerda */}
      <View className="mr-5 items-center justify-center">
        <Icon size={44} color={colors.main} strokeWidth={1.5} />
      </View>

      {/* Textos à direita */}
      <View className="flex-1">
        <Text
          className="mb-1 font-poppins-medium text-xl"
          style={{ color: colors.main }}
        >
          {title}
        </Text>

        <Text
          className="font-poppins-regular text-[15px] leading-snug"
          style={{ color: colors.dark }}
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
