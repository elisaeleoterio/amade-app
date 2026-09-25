import { DeleteModal } from "@/components/modals/deleteAccountModal";
import { LogoutModal } from "@/components/modals/logoutModal";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import { fetchMockProfile, UserProfile } from "@/mocks/userMock"; // <-- Importe seus mocks aqui
import { useRouter } from "expo-router";
import { Lock, LogOut, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Busca os dados do usuário ao montar a tela
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
    Alert.alert(
      "Excluir Conta",
      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            toast.success("Conta excluída com sucesso.");
            router.replace("/(public)/welcome");
          },
        },
      ],
    );
  };

  return (
    <ScreenTemplate
      navbar={{
        appRole: "artesao",
        title: "Meu Perfil",
        showBack: true,
      }}
      className="bg-[#FDFBF5]"
    >
      <View className="flex-1 px-5 pt-8">
        {/* Mostra um loading enquanto busca os dados falsos */}
        {isLoading || !user ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#14532D" />
          </View>
        ) : (
          <>
            {/* Header do Perfil (Avatar + Info) */}
            <View className="flex-row items-center mb-10">
              {/* Lógica para mostrar a Imagem ou a Inicial */}
              {user.avatarUrl ? (
                <Image
                  source={{ uri: user.avatarUrl }}
                  className="w-[72px] h-[72px] rounded-full mr-4 bg-[#E8EFE8]"
                />
              ) : (
                <View className="w-[72px] h-[72px] rounded-full bg-artesao-main items-center justify-center mr-4">
                  <Text className="font-poppins-medium text-white text-[32px] mt-1">
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
}
