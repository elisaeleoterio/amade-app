import AmadeLogo from "@/assets/logoComplete.svg";
import { Button } from "@/components/ui/button";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-admin-surface justify-center items-center px-8 pt-10">
      {/* Header com Logo e Título */}
      <View className="items-center mb-8">
        <AmadeLogo color="#451A03" />
        <Text className="font-poppins-light text-admin-main text-6xl tracking-widest mt-2">
          AMADE
        </Text>
      </View>

      {/* Texto de Boas-vindas */}
      <Text className="font-poppins-regular text-admin-dark text-center text-lg mb-12 leading-relaxed">
        <Text className="font-poppins-bold">Bem-vindo</Text> ao sistema de
        gestão de estoque e vendas da loja da Associação de Artesãos em Madeira.
      </Text>

      <View className="w-full gap-4">
        <Button
          variant="default"
          onPress={() => console.log("Navegar para Login")}
        >
          <Text>Criar Conta</Text>
        </Button>
        <Button
          variant="outline"
          onPress={() => console.log("Navegar para Cadastro")}
        >
          <Text>Entrar</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
