import AmadeLogo from "@/assets/logoComplete.svg";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function SendEmail() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  // Ajustar para a lógica de envio
  const handleSendEmail = () => {
    console.log("alterar conta:", email);
    router.push({
      pathname: "/(public)/accountSetting/emailValidation",
      params: { whereFrom: "resetPassword" },
    });
  };

  return (
    <ScreenTemplate
      variant="centered"
      isStatic
      navbar={{
        title: "Redefinir Senha",
        appRole: "admin",
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 120,
      }}
      scrollViewProps={{
        automaticallyAdjustKeyboardInsets: true,
      }}
    >
      <View className="items-center">
        <AmadeLogo color="#712B05" width={150} />
      </View>
      <View className="mx-16">
        <Text
          variant="large"
          className="font-poppins-medium text-admin-dark text-center text-[20px]"
        >
          Qual endereço de email da sua conta?{" "}
        </Text>
      </View>

      <View className="w-80 self-center">
        <View className="gap-4 w-full mb-8">
          <View>
            <Text
              variant="lead"
              className="font-poppins-regular text-[20px] text-admin-dark mb-2 ml-1"
            >
              Email
            </Text>
            <Input
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
      </View>

      <View className="gap-4 w-full mb-10">
        <Button
          size="lg"
          variant="default"
          className="w-72 self-center"
          onPress={handleSendEmail}
        >
          <Text className="text-[20px] text-white">Enviar</Text>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-72 self-center"
          onPress={() => router.push("/(public)/welcome")}
        >
          <Text>Cancelar</Text>
        </Button>
      </View>
    </ScreenTemplate>
  );
}
