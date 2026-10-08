import AmadeLogo from "@/assets/logoComplete.svg";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import { Role } from "@/types/role.type";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function WelcomeScreen() {
  const role: Role = "admin";
  const colors = roleConfig[role];
  const router = useRouter();
  return (
    <ScreenTemplate
      variant="centered"
      navbar={{
        showBack: false,
      }}
      className="bg-general-bg"
    >
      <View className="items-center mb-2">
        <AmadeLogo color={colors.main} width={250} />
      </View>

      <View className="mx-4">
        <Text className="font-poppins-regular text-admin-dark text-center text-[20px] mb-12 leading-loose">
          <Text className="font-poppins-bold text-admin-dark text-center text-[20px] mb-12 leading-relaxed">
            Bem-vindo
          </Text>{" "}
          ao sistema de gestão de estoque e vendas da loja da Associação de
          Artesãos em Madeira.
        </Text>
      </View>

      <View className="gap-4 ">
        <Button
          size="lg"
          variant="default"
          onPress={() => router.push("/(public)/login")}
        >
          <Text className="text-[22px]">Entrar na Conta</Text>
        </Button>

        <Button
          variant="outline"
          size="lg"
          onPress={() => router.push("/(public)/signup")}
        >
          <Text className="text-[22px]">Criar Conta</Text>
        </Button>
      </View>
    </ScreenTemplate>
  );
}
