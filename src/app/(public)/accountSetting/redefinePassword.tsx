import AmadeLogo from "@/assets/logoComplete.svg";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function redefinePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordRedefinition = () => {
    console.log("Tentando alterar senha com:", {
      password,
    });
    router.push("/(public)/login");
  };

  return (
    <ScreenTemplate
      navbar={{
        title: "Redefinir Senha",
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 150,
      }}
      scrollViewProps={{
        automaticallyAdjustKeyboardInsets: true,
      }}
    >
      <View className="items-center mb-2">
        <AmadeLogo color="#712B05" width={150} />
      </View>

      <Text
        variant="large"
        className="font-poppins-medium text-admin-dark text-center text-[22px] leading-loose mb-2"
      >
        Configure sua nova senha.
      </Text>

      <View className="self-center w-80 gap-4 mb-8">
        {/* Campo de Senha */}
        <View className="mb-3">
          <Text
            variant="lead"
            className="font-poppins-regular text-admin-dark text-[16px] mb-2 ml-1"
          >
            Nova Senha
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

        {/* Campo de Confirmar Senha */}
        <View className="mb-3">
          <Text
            variant="lead"
            className="font-poppins-regular text-admin-dark text-[16px] mb-2 ml-1"
          >
            Confirmar Senha
          </Text>

          <View className="relative justify-center">
            <Input
              placeholder="Confirme sua senha"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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

      <View className="gap-4 w-full mt-4 mb-10">
        <Button
          className="w-64 px-7 self-center"
          size="lg"
          variant="default"
          onPress={handlePasswordRedefinition}
        >
          <Text className="text-[20px] text-white">Confirmar</Text>
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
