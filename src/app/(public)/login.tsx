import AmadeLogo from "@/assets/logoComplete.svg";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import { mockLogin } from "@/mocks/userMock";
import { Role } from "@/types/role.type";
import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const role: Role = "admin";
  const colors = roleConfig[role];
  const router = useRouter();
  const [email, setEmail] = useState("maria.artes@email.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Preencha e-mail e senha para continuar.");
      return;
    }

    try {
      setIsProcessing(true);
      const user = await mockLogin(email, password);
      toast.success(`Bem-vinda de volta, ${user.name.first}!`);
      router.replace("/roleSelect");
    } catch (error: any) {
      toast.error(error.message || "Erro ao tentar entrar.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ScreenTemplate
      navbar={{
        title: "Entrar",
        appRole: role,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 100,
      }}
      scrollViewProps={{
        automaticallyAdjustKeyboardInsets: true,
      }}
      className="bg-general-bg"
    >
      <View className="items-center">
        <AmadeLogo color={colors.dark} width={150} />
      </View>
      <View className="mx-16">
        <Text
          variant="large"
          className="font-poppins-medium text-admin-dark text-center text-[20px] leading-loose"
        >
          Bem vindo(a) de volta!
        </Text>
        <Text
          variant="large"
          className="font-poppins-regular text-admin-dark text-center mb-12 leading-relaxed"
        >
          Insira suas credencias para entrar na sua conta.
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
          <View>
            <Text
              variant="lead"
              className="font-poppins-regular text-admin-dark text-[20px] mb-2 ml-1"
            >
              Senha
            </Text>
            <View className="relative justify-center">
              <Input
                placeholder="Digite sua senha"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                className="absolute right-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} color="#6b7280" />
                ) : (
                  <Eye size={18} color="#6b7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Button
          className="self-end -mt-8 -mr-8 mb-8"
          variant="secondary"
          onPress={() => router.push("/(public)/accountSetting/sendEmail")}
          disabled={isProcessing}
        >
          <Text className="text-[14px] font-poppins-medium">
            Esqueceu a senha?
          </Text>
        </Button>
      </View>

      <View className="gap-4 w-full mb-10">
        <Button
          size="lg"
          variant="default"
          className="w-64 self-center"
          onPress={handleLogin}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-[20px] text-general-bg">Entrar</Text>
          )}
        </Button>
        <View className="items-center mt-4">
          <Text
            variant="large"
            className="font-poppins-regular text-admin-dark"
          >
            Ainda não possui uma conta?
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(public)/signup")}
            disabled={isProcessing}
          >
            <Text
              variant="large"
              className="font-poppins-semibold text-admin-dark mt-1"
            >
              Criar Conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenTemplate>
  );
}
