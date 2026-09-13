import AmadeLogo from "@/assets/logoComplete.svg";
import { LogoutModal } from "@/components/modals/logoutModal";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { UserRoundArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { RoleButton, type Role } from "../../components/shared/roleButton";

export default function RoleSelect() {
  const router = useRouter();
  const handleConfirmLogout = async () => {
    setLogoutModalVisible(false);

    try {
      // LÓGICA DE LOGOUT REAL
      // Exemplo:
      // await AsyncStorage.removeItem('@user_token');
      // signOut(); // Se estiver usando algum Context API de Autenticação

      console.log("Usuário deslogado com sucesso!");

      // 3. Redireciona para a tela de welcome.
      // Usamos o .replace() para o usuário não conseguir voltar pra essa tela
      // clicando no botão de voltar do Android.
      router.replace("/welcome");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Mock simulando a resposta do backend/contexto
  const userRoles: Role[] = ["artesao", "lojista", "admin"];
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  return (
    <ScreenTemplate
      isStatic
      navbar={{
        appRole: "admin",
        leftContent: (
          <TouchableOpacity onPress={() => setLogoutModalVisible(true)}>
            <UserRoundArrowLeft color="#712B05" size={32} strokeWidth={1.5} />
          </TouchableOpacity>
        ),
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <LogoutModal
        visible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)} // Função do botão "Cancelar" e do "X"
        onConfirm={handleConfirmLogout} // Função do botão "Sair da Conta"
      />

      <View className="mt-4 items-center">
        <AmadeLogo color="#712B05" width={150} />
      </View>

      <View className="mx-8 mt-2">
        <Text
          variant="large"
          className="text-center font-poppins-bold text-[22px] leading-loose text-admin-dark"
        >
          Bem vindo(a)!
        </Text>
        <Text
          variant="large"
          className="mb-8 mx-10 text-center font-poppins-regular text-[20px] leading-relaxed text-admin-dark"
        >
          Selecione os recursos que deseja utilizar agora.
        </Text>
      </View>

      <View className="w-full flex-row flex-wrap items-center justify-center gap-6 px-4 mt-5">
        {userRoles.includes("artesao") && <RoleButton role="artesao" />}
        {userRoles.includes("lojista") && <RoleButton role="lojista" />}
        {userRoles.includes("admin") && <RoleButton role="admin" />}
      </View>
    </ScreenTemplate>
  );
}
