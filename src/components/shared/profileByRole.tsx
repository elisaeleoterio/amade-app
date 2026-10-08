import { DeleteModal } from "@/components/modals/deleteAccountModal";
import { LogoutModal } from "@/components/modals/logoutModal";
import { ResetPasswordModal } from "@/components/modals/resetPasswordModal";
import { EditProfileModal } from "@/components/shared/editProfileModal";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import { fetchMockProfile, UserProfile } from "@/mocks/userMock";
import type { Role } from "@/types/role.type";
import { useRouter } from "expo-router";
import { Lock, LogOut, Trash2, UserCog } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";

interface ProfileByRoleProps {
  role: Role;
}

export const ProfileByRole = ({ role }: ProfileByRoleProps) => {
  const colors = roleConfig[role];
  const router = useRouter();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isResetPassowordModalOpen, setResetPassowordModalOpen] =
    useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMockProfile(role);
        setUser(data);
      } catch (error) {
        toast.error("Erro ao carregar os dados do perfil.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [role]);

  const handleUpdateLocalUser = (newAvatar?: string, newEmail?: string) => {
    // Precisa adicionar a lógica com servidor
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        avatarUrl: newAvatar !== undefined ? newAvatar : prev.avatarUrl,
        email: newEmail !== undefined ? newEmail : prev.email,
      };
    });
  };

  const handleLogout = () => {
    // Precisa adicionar lógica com servido de remoção de token
    router.replace("/(public)/welcome");
  };

  const handleDeleteAccount = () => {
    // Precisa adicionar a lógica com servidor
    toast.success("Conta excluída com sucesso.");
    router.replace("/(public)/welcome");
  };

  const handleResetPassword = () => {
    // Precisa adicionar a lógica com servidor
    router.push("/(public)/accountSetting/redefinePassword");
  };

  return (
    <ScreenTemplate
      navbar={{
        appRole: role,
        title: "Meu Perfil",
        showBack: true,
      }}
      className="bg-general-bg"
    >
      <View className="flex-1 px-5 pt-8">
        {isLoading || !user ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.main} />
          </View>
        ) : (
          <>
            {/* Header do Perfil (Avatar + Info) */}
            <View className="flex-row items-center mb-10">
              {user.avatarUrl ? (
                <Image
                  source={{ uri: user.avatarUrl }}
                  className="w-[72px] h-[72px] rounded-full mr-4"
                  style={{ backgroundColor: colors.surface }}
                />
              ) : (
                <View
                  className="w-[72px] h-[72px] rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: colors.main }}
                >
                  <Text className="font-poppins-regular text-white text-xl mt-1">
                    {user.name.first.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}

              <View className="flex-1">
                <Text
                  className="font-poppins-regular text-xl"
                  style={{ color: colors.dark }}
                >
                  {user.name.first} {user.name.second}
                </Text>
                <Text className="font-poppins-regular text-[13px] text-gray-500 mt-0.5 capitalize">
                  {user.roles.join(" | ")}
                </Text>
              </View>
            </View>

            {/* Botão: Editar Conta */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsEditModalOpen(true)}
              className="border rounded-[20px] py-4 flex-row items-center mb-4 bg-general-bg"
              style={{ borderColor: colors.surface }}
            >
              <View className="absolute left-5">
                <UserCog color={colors.main} size={24} strokeWidth={1.5} />
              </View>
              <Text
                className="flex-1 text-center font-poppins-medium text-[17px]"
                style={{ color: colors.main }}
              >
                Editar Conta
              </Text>
            </TouchableOpacity>

            {/* Botão: Alterar Senha */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setResetPassowordModalOpen(true)}
              className="border rounded-[20px] py-4 flex-row items-center mb-4 bg-general-bg"
              style={{ borderColor: colors.surface }}
            >
              <View className="absolute left-5">
                <Lock color={colors.main} size={24} strokeWidth={1.5} />
              </View>
              <Text
                className="flex-1 text-center font-poppins-medium text-[17px]"
                style={{ color: colors.main }}
              >
                Alterar Senha
              </Text>
            </TouchableOpacity>

            {/* Botão: Sair da Conta */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsLogoutModalOpen(true)}
              className="border rounded-[20px] py-4 flex-row items-center mb-4 bg-general-bg"
              style={{ borderColor: colors.surface }}
            >
              <View className="absolute left-5">
                <LogOut color={colors.main} size={24} strokeWidth={1.5} />
              </View>
              <Text
                className="flex-1 text-center font-poppins-medium text-[17px]"
                style={{ color: colors.main }}
              >
                Sair da Conta
              </Text>
            </TouchableOpacity>

            {/* Botão: Excluir Conta */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsDeleteModalOpen(true)}
              className="border rounded-[20px] py-4 flex-row items-center mb-4 bg-general-bg"
              style={{ borderColor: colors.surface }}
            >
              <View className="absolute left-5">
                <Trash2 color={colors.main} size={24} strokeWidth={1.5} />
              </View>
              <Text
                className="flex-1 text-center font-poppins-medium text-[17px]"
                style={{ color: colors.main }}
              >
                Excluir Conta
              </Text>
            </TouchableOpacity>

            {/* Injeção dos Modais na Tela */}
            <EditProfileModal
              role={role}
              visible={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              user={user}
              onSaveSuccess={handleUpdateLocalUser}
              // Recomendado: Passar o role para o modal também se ele precisar ser tematizado!
            />
            <LogoutModal
              visible={isLogoutModalOpen}
              onClose={() => setIsLogoutModalOpen(false)}
              onConfirm={handleLogout}
              role={role}
            />
            <DeleteModal
              visible={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={handleDeleteAccount}
              role={role}
            />

            <ResetPasswordModal
              visible={isResetPassowordModalOpen}
              onClose={() => setResetPassowordModalOpen(false)}
              onConfirm={handleResetPassword}
              role={role}
            />
          </>
        )}
      </View>
    </ScreenTemplate>
  );
};
