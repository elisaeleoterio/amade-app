import AmadeLogo from "@/assets/logoComplete.svg";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { Brush, Eye, EyeOff, ShoppingBag } from "lucide-react-native";
import { useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleToggleRole = (role: "artesao" | "lojista") => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleRegister = () => {
    console.log("Tentando cadastrar com:", {
      name,
      email,
      password,
      selectedRoles,
    });
    router.push({
      pathname: "/(public)/accountSetting/emailValidation",
      params: { whereFrom: "signup" },
    });
  };

  return (
    <ScreenTemplate
      navbar={{
        title: "Criar Conta",
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

      <View className="self-center w-80 gap-4 mb-8">
        {/* Seleção de role */}
        <View>
          <Text
            variant="lead"
            className="font-poppins-regular text-admin-dark text-[20px] mb-2 ml-1"
          >
            Selecione seu papel
          </Text>

          <View className="flex-row gap-6">
            {/* Card: Artesão */}
            <Pressable
              onPress={() => handleToggleRole("artesao")}
              className="items-center"
            >
              <View
                className={`w-[75px] h-[75px] border-2 border-artesao-main rounded-[15px] items-center justify-center ${
                  selectedRoles.includes("artesao")
                    ? "bg-artesao-main"
                    : "bg-transparent"
                }`}
              >
                <Brush
                  size={32}
                  color={
                    selectedRoles.includes("artesao") ? "#FFFBEB" : "#166534"
                  }
                  strokeWidth={1.5}
                />
              </View>

              <Text className="font-poppins-regular text-artesao-main text-lg mt-3">
                Artesão
              </Text>
            </Pressable>

            {/* Card: Lojista */}
            <Pressable
              onPress={() => handleToggleRole("lojista")}
              className="items-center"
            >
              <View
                className={`w-[75px] h-[75px] border-2 border-lojista-main rounded-[15px] items-center justify-center ${
                  selectedRoles.includes("lojista")
                    ? "bg-lojista-main"
                    : "bg-transparent"
                }`}
              >
                <ShoppingBag
                  size={32}
                  color={
                    selectedRoles.includes("lojista") ? "#FFFBEB" : "#9F1239"
                  }
                  strokeWidth={1.5}
                />
              </View>
              <Text className="font-poppins-regular text-lojista-main text-lg mt-3">
                Lojista
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Campo de Nome */}
        <View className="mb-3">
          <Text
            variant="lead"
            className="font-poppins-regular text-admin-dark text-[17px] mb-2 ml-1"
          >
            Nome
          </Text>
          <Input
            placeholder="Digite seu nome"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Campo de Email */}
        <View className="mb-3">
          <Text
            variant="lead"
            className="font-poppins-regular text-[16px] text-admin-dark mb-2 ml-1"
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

        {/* Campo de Senha */}
        <View className="mb-3">
          <Text
            variant="lead"
            className="font-poppins-regular text-admin-dark text-[16px] mb-2 ml-1"
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
          onPress={handleRegister}
        >
          <Text className="text-[20px] text-white">Cadastrar</Text>
        </Button>

        {/* Link para voltar ao login */}
        <View className="items-center mt-4">
          <Text
            variant="large"
            className="font-poppins-regular text-admin-dark"
          >
            Já possui uma conta?
          </Text>
          <TouchableOpacity onPress={() => router.push("/(public)/login")}>
            <Text
              variant="large"
              className="font-poppins-semibold text-admin-dark mt-1"
            >
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenTemplate>
  );
}
