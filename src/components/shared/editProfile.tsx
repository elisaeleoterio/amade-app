import { ScreenTemplate } from "@/components/templates/screen-template";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import {
  fetchMockProfile,
  updateMockProfileImage,
  UserProfile,
} from "@/mocks/userMock";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Camera, Lock, Mail } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";

export default function EditProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMockProfile("artesao");
        setUser(data);
      } catch (error) {
        toast.error("Erro ao carregar os dados.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChangeAvatar = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        toast.error("Permissão negada", {
          description: "Precisamos de acesso à galeria para alterar a foto.",
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        const newAvatarUri = result.assets[0].uri;

        await updateMockProfileImage(newAvatarUri);
        setUser((prev) => (prev ? { ...prev, avatarUrl: newAvatarUri } : null));
        toast.success("Foto de perfil atualizada!");
      }
    } catch (error) {
      toast.error("Erro ao atualizar a foto.");
    }
  };

  return (
    <ScreenTemplate
      navbar={{
        appRole: "artesao",
        title: "Editar Perfil",
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
            {/* Seção da Foto de Perfil */}
            <View className="items-center mb-10">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleChangeAvatar}
                className="relative"
              >
                {user.avatarUrl ? (
                  <Image
                    source={{ uri: user.avatarUrl }}
                    className="w-28 h-28 rounded-full bg-[#E8EFE8]"
                  />
                ) : (
                  <View className="w-28 h-28 rounded-full bg-artesao-main items-center justify-center">
                    <Text className="font-poppins-medium text-white text-[40px] mt-2">
                      {user.name.first.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}

                {/* Ícone de Câmera sobreposto */}
                <View className="absolute bottom-0 right-0 bg-artesao-main w-10 h-10 rounded-full items-center justify-center border-4 border-[#FDFBF5]">
                  <Camera size={18} color="#FFF" />
                </View>
              </TouchableOpacity>

              <Text className="font-poppins-medium text-[20px] text-gray-800 mt-4">
                {user.name.first} {user.name.second}
              </Text>
            </View>

            {/* Botão de Alterar E-mail (Leva pro seu fluxo existente) */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                router.push("/(public)/accountSetting/sendEmail");
              }}
              className="border border-[#C6DACB] rounded-[20px] py-4 flex-row items-center mb-4 bg-white"
            >
              <View className="absolute left-5">
                <Mail color="#14532D" size={24} strokeWidth={1.5} />
              </View>
              <View className="flex-1 ml-14">
                <Text className="font-poppins-medium text-[16px] text-gray-800">
                  E-mail atual
                </Text>
                <Text className="font-poppins-regular text-[13px] text-gray-500">
                  {user.email}
                </Text>
              </View>
              <Text className="font-poppins-medium text-[14px] text-artesao-main mr-5">
                Alterar
              </Text>
            </TouchableOpacity>

            {/* Botão de Alterar Senha (Leva pro seu fluxo existente) */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                router.push("/(public)/accountSetting/redefinePassword");
              }}
              className="border border-[#C6DACB] rounded-[20px] py-4 flex-row items-center mb-8 bg-white"
            >
              <View className="absolute left-5">
                <Lock color="#14532D" size={24} strokeWidth={1.5} />
              </View>
              <Text className="flex-1 text-center font-poppins-medium text-[17px] text-artesao-main mr-6">
                Alterar Senha
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScreenTemplate>
  );
}
