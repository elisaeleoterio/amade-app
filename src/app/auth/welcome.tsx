import { View } from "react-native";

import AmadeLogo from "@/assets/logoComplete.svg";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

export default function WelcomeScreen() {
  return (
    <ScreenTemplate
      navbar={{
        title: "Welcome",
        showBack: true,
      }}
    >
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

      <View className="gap-4 ">
        <Input placeholder="Entrar" appRole="lojista" />
        <Input placeholder="Criar Conta" />

        {/* <Button
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
        </Button> */}
      </View>
    </ScreenTemplate>
  );
}
