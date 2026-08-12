import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AmadeLogo from "@/assets/logoComplete.svg";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-general-bg justify-center items-center px-8">
      <View className="items-center mb-2">
        <AmadeLogo color="#712B05" width={250} />
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

      <View className="gap-4 text">
        <Button
          size="lg"
          appRole="lojista"
          variant="ghostOutline"
          onPress={() => console.log("Entrar na conta")}
        >
          <Text className="text-[22px]">Entrar na Conta</Text>
        </Button>

        <Button
          variant="outline"
          size="lg"
          onPress={() => console.log("Criar Conta")}
        >
          <Text className="text-[22px]">Criar Conta</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
