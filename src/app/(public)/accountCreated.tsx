import { ScreenTemplate } from "@/components/templates/screen-template";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { FaceSlightlySmiling } from "lucide-react-native";
import { View } from "react-native";

export default function AccountCreated() {
  const router = useRouter();
  return (
    <ScreenTemplate
      variant="centered"
      isStatic
      navbar={{
        title: "Conta Criada",
        showBack: false,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 0,
      }}
      scrollViewProps={{
        automaticallyAdjustKeyboardInsets: true,
      }}
      className="bg-general-bg"
    >
      <View className="items-center mb-10">
        <FaceSlightlySmiling color={"#712B05"} size={108} strokeWidth={0.8} />
      </View>

      <View className="mx-12 mb-3">
        <Text
          variant="large"
          className="font-poppins-medium text-admin-dark text-center text-[22px] leading-loose mb-2"
        >
          Tudo certo por aqui!
        </Text>
        <Text
          variant="large"
          className="font-poppins-regular text-admin-dark text-center text-[15px] leading-relaxed"
        >
          Sua conta foi criada e enviada para a aprovação da Diretoria. Assim
          que o seu perfil for liberado pela gestão da loja, você poderá acessar
          o sistema normalmente com seu e-mail e senha.
        </Text>
      </View>

      <View className="gap-6 w-full mt-16 mb-10">
        <Button
          className="w-64 px-7 self-center"
          size="lg"
          variant="default"
          onPress={() => router.push("/(public)/welcome")}
        >
          <Text className="text-[20px] text-white">Voltar à Tela Inicial</Text>
        </Button>

        <Button
          className="w-64 px-7 self-center"
          size="lg"
          variant="outline"
          onPress={() => router.push("/(public)/welcome")}
        >
          <Text className="text-center">Conversar com a Diretoria</Text>
        </Button>
      </View>
    </ScreenTemplate>
  );
}
