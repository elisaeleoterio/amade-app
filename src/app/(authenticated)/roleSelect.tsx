import AmadeLogo from "@/assets/logoComplete.svg";
import { LogoutModal } from "@/components/modals/logoutModal";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import { Role } from "@/types/role.type";
import { useRouter } from "expo-router";
import { UserRoundArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { RoleButton } from "../../components/shared/roleButton";

export default function RoleSelect() {
  const role: Role = "admin";
  const colors = roleConfig[role];
  const router = useRouter();
  const handleConfirmLogout = async () => {
    setLogoutModalVisible(false);

    try {
      // LÓGICA DE LOGOUT REAL
      console.log("Usuário deslogado com sucesso!");

      // 3. Redireciona para a tela de welcome.
      router.replace("/welcome");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Mock simulando a resposta do backend
  const userRoles: Role[] = ["artesao", "lojista", "admin"];

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  return (
    <ScreenTemplate
      isStatic
      navbar={{
        appRole: role,
        leftContent: (
          <TouchableOpacity onPress={() => setLogoutModalVisible(true)}>
            <UserRoundArrowLeft
              color={colors.main}
              size={32}
              strokeWidth={1.5}
            />
          </TouchableOpacity>
        ),
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      className="bg-general-bg"
    >
      <LogoutModal
        visible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={handleConfirmLogout}
      />

      <View className="mt-4 items-center">
        <AmadeLogo color={colors.main} width={150} />
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
