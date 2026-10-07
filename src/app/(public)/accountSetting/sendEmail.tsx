import AmadeLogo from "@/assets/logoComplete.svg";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import { mockSendPasswordResetEmail } from "@/mocks/userMock";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function SendEmail() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendEmail = async () => {
    try {
      setIsProcessing(true);
      await mockSendPasswordResetEmail(email);
      toast.success("Código enviado para o seu e-mail!");
      router.push({
        pathname: "/(public)/accountSetting/emailValidation",
        params: { whereFrom: "resetPassword" },
      });
    } catch (error: any) {
      toast.error(error.message || "Erro ao enviar e-mail.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ScreenTemplate
      variant="centered"
      isStatic
      navbar={{ title: "Redefinir Senha", appRole: "admin" }}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
      scrollViewProps={{ automaticallyAdjustKeyboardInsets: true }}
      className="bg-general-bg"
    >
      <View className="items-center">
        <AmadeLogo color={roleConfig["admin"].dark} width={150} />
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
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-[20px] text-general-bg">Enviar</Text>
          )}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-72 self-center"
          onPress={() => router.push("/(public)/welcome")}
          disabled={isProcessing}
        >
          <Text>Cancelar</Text>
        </Button>
      </View>
    </ScreenTemplate>
  );
}
