import AmadeLogo from "@/assets/logoComplete.svg";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function EmailValidation() {
  const [code, setCode] = useState(["", "", "", ""]);

  const { whereFrom } = useLocalSearchParams<{
    whereFrom?: "signup" | "resetPassword";
  }>();

  const handleVerifyCode = () => {
    console.log("Verificando código:", code, "Origem:", whereFrom);

    if (whereFrom === "resetPassword") {
      router.push("/(public)/accountSetting/redefinePassword");
    } else {
      router.push("/(public)/accountCreated");
    }
  };

  const handleResendCode = () => {
    console.log("Reenviando código de verificação...", whereFrom);
  };
  const router = useRouter();

  return (
    <ScreenTemplate
      navbar={{
        title: "Validação",
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 180,
      }}
      scrollViewProps={{
        automaticallyAdjustKeyboardInsets: true,
      }}
      className="bg-general-bg"
    >
      <View className="items-center">
        <AmadeLogo color="#712B05" width={150} />
      </View>

      <View className="mx-12 mb-3">
        <Text
          variant="large"
          className="font-poppins-medium text-admin-dark text-center text-[22px] leading-loose mb-2"
        >
          Validação de email
        </Text>
        <Text
          variant="large"
          className="font-poppins-regular text-admin-dark text-center text-[15px] leading-relaxed"
        >
          Um código de confirmação foi enviado para o seu e-mail. Insira-o
          abaixo para validar sua conta.
        </Text>
      </View>

      <View className="self-center w-80 gap-6 mb-8">
        <View className="flex-row justify-between w-full px-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Input
              key={index}
              placeholder=" "
              keyboardType="number-pad"
              maxLength={1}
              value={code[index]}
              onChangeText={(text) => {
                const newCode = [...code];
                newCode[index] = text;
                setCode(newCode);
              }}
              className="text-center w-14 h-14 text-2xl font-poppins-medium"
            />
          ))}
        </View>

        {/* Reenviar Código */}
        <View className="flex-row justify-center">
          <Text className="font-poppins-regular text-admin-lighter text-[14px]">
            Não recebeu o código?{" "}
          </Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text className="font-poppins-semibold text-admin-main text-[14px]">
              Reenviar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="gap-4 w-full mt-2 mb-10">
        <Button
          className="w-64 px-7 self-center"
          size="lg"
          variant="default"
          onPress={handleVerifyCode}
        >
          <Text className="text-[20px] text-white">Verificar</Text>
        </Button>

        <Button
          className="w-64 px-7 self-center"
          size="lg"
          variant="outline"
          onPress={() => router.push("/(public)/welcome")}
        >
          <Text>Cancelar</Text>
        </Button>
      </View>
    </ScreenTemplate>
  );
}
