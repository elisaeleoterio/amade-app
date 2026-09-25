import { DeleteModal } from "@/components/modals/deleteAccountModal";
import { LogoutModal } from "@/components/modals/logoutModal";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import { fetchMockProfile, UserProfile } from "@/mocks/userMock";
import type { Role } from "@/types/role.type";
import { useRouter } from "expo-router";
import { Lock, LogOut, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";

interface ProfileByRoleProps {
  role: Role;
}

const roleConfig = {
  admin: {
    dark: "#2A0F01", // Marrom bem escuro
    lighter: "#451A03", // Marrom levemente mais escuro
    main: "#712B05", // Marrom principal
    surface: "#E0D1C7", // Marrom bem claro (Tab e Ghost)
  },
  // Cores do Lojista
  lojista: {
    dark: "#4C0519", // Vinho escuro
    wine: "#810F2F", // Vinho principal
    main: "#9F1239", // Rosa/Magenta forte
    surface: "#E9CCD2", // Ghost rosado
  },
  // Cores do Artesão
  artesao: {
    extraDark: "#0C331C",
    dark: "#14532D", // Verde escuro
    main: "#166534", // Verde principal
    light: "#15803D", // Verde claro
    surface: "#E5EFE5", // Fundo esverdeado
  },
};

export const ProfileByRole = ({ role }: ProfileByRoleProps) => {
  const theme = roleConfig[role];
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMockProfile("artesao");
        setUser(data);
      } catch (error) {
        toast.error("Erro ao carregar os dados do perfil.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = () => {
    router.replace("/(public)/welcome");
  };

  const handleDeleteAccount = () => {
    toast.success("Conta excluída com sucesso.");
    router.replace("/(public)/welcome");
  };

  return (
    <ScreenTemplate
      navbar={{
        appRole: "artesao",
        title: "Meu Perfil",
        showBack: true,
      }}
      className="bg-general-bg"
    >
      <View className="flex-1 px-5 pt-8">
        {isLoading || !user ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#14532D" />
          </View>
        ) : (
          <>
            <View className="flex-row items-center mb-10">
              {user.avatarUrl ? (
                <Image
                  source={{ uri: user.avatarUrl }}
                  className="w-[72px] h-[72px] rounded-full mr-4"
                  style={{ backgroundColor: theme.surface }}
                />
              ) : (
                <View className="w-[72px] h-[72px] rounded-full bg-artesao-main items-center justify-center mr-4">
                  <Text
                    className="font-poppins-medium text-white mt-1"
                    style={{ fontSize: 40 }}
                  >
                    {user.name.first.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}

              <View className="flex-1">
                <Text className="font-poppins-medium text-[20px] text-gray-800">
                  {user.name.first} {user.name.second}
                </Text>
                <Text className="font-poppins-regular text-[13px] text-gray-500 mt-0.5 capitalize">
                  {user.roles.join(" | ")}
                </Text>
              </View>
            </View>

            {/* Botão: Editar Perfil */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                router.push("/(authenticated)/artesao/editProfile")
              }
              className="border border-[#C6DACB] rounded-[20px] py-4 flex-row items-center mb-4 bg-general-bg"
            >
              <View className="absolute left-5">
                <Lock color="#14532D" size={24} strokeWidth={1.5} />
              </View>
              <Text className="flex-1 text-center font-poppins-medium text-[17px] text-artesao-main">
                Editar Perfil
              </Text>
            </TouchableOpacity>

            {/* Botão: Sair da Conta */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsLogoutModalOpen(true)}
              className="border border-[#C6DACB] rounded-[20px] py-4 flex-row items-center mb-4 bg-general-bg"
            >
              <View className="absolute left-5">
                <LogOut color="#14532D" size={24} strokeWidth={1.5} />
              </View>
              <Text className="flex-1 text-center font-poppins-medium text-[17px] text-artesao-main">
                Sair da Conta
              </Text>
            </TouchableOpacity>

            <LogoutModal
              visible={isLogoutModalOpen}
              onClose={() => setIsLogoutModalOpen(false)}
              onConfirm={handleLogout}
              role="artesao"
            />

            {/* Botão: Excluir Conta */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsDeleteModalOpen(true)}
              className="border border-[#C6DACB] rounded-[20px] py-4 flex-row items-center mb-4 bg-general-bg"
            >
              <View className="absolute left-5">
                <Trash2 color="#14532D" size={24} strokeWidth={1.5} />
              </View>
              <Text className="flex-1 text-center font-poppins-medium text-[17px] text-artesao-main">
                Excluir Conta
              </Text>
            </TouchableOpacity>

            <DeleteModal
              visible={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirm={handleDeleteAccount}
              role="artesao"
            />
          </>
        )}
      </View>
    </ScreenTemplate>
  );
};
