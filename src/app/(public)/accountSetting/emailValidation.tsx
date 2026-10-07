import AmadeLogo from "@/assets/logoComplete.svg";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import { mockVerifyEmailCode } from "@/mocks/userMock";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EmailValidation() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const [isProcessing, setIsProcessing] = useState(false);

  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newChar = text.length > 0 ? text.slice(-1) : "";

    const newCode = [...code];
    newCode[index] = newChar;
    setCode(newCode);

    if (newChar !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const { whereFrom } = useLocalSearchParams<{
    whereFrom?: "signup" | "resetPassword";
  }>();

  const handleVerifyCode = async () => {
    if (code.some((digit) => digit === "")) {
      toast.error("Preencha os 4 dígitos do código.");
      return;
    }

    try {
      setIsProcessing(true);
      await mockVerifyEmailCode(code);

      toast.success("Código verificado com sucesso!");

      if (whereFrom === "resetPassword") {
        router.push("/(public)/accountSetting/redefinePassword");
      } else {
        router.push("/(public)/accountCreated");
      }
    } catch (error: any) {
      toast.error(error.message || "Código inválido.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResendCode = () => {
    toast.info("Novo código enviado para o seu e-mail!");
  };

  return (
    <ScreenTemplate
      navbar={{ title: "Validação" }}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 180 }}
      scrollViewProps={{ automaticallyAdjustKeyboardInsets: true }}
      className="bg-general-bg"
    >
      <View className="items-center">
        <AmadeLogo color={roleConfig["admin"].dark} width={150} />
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
              ref={(ref: any) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              placeholder=" "
              keyboardType="number-pad"
              value={code[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              selectTextOnFocus={true}
              className="text-center w-14 h-14 text-2xl font-poppins-medium"
            />
          ))}
        </View>

        <View className="flex-row justify-center">
          <Text className="font-poppins-regular text-admin-lighter text-[14px]">
            Não recebeu o código?{" "}
          </Text>
          <TouchableOpacity onPress={handleResendCode} disabled={isProcessing}>
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
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-[20px] text-general-bg">Verificar</Text>
          )}
        </Button>
        <Button
          className="w-64 px-7 self-center"
          size="lg"
          variant="outline"
          onPress={() => router.push("/(public)/welcome")}
          disabled={isProcessing}
        >
          <Text>Cancelar</Text>
        </Button>
      </View>
    </ScreenTemplate>
  );
}
