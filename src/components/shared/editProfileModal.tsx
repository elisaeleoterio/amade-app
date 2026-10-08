import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import {
  UserProfile,
  updateMockEmail,
  updateMockProfileImage,
} from "@/mocks/userMock";
import { Role } from "@/types/role.type";
import * as ImagePicker from "expo-image-picker";
import { Camera, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  user: UserProfile | null;
  role: Role;
  onSaveSuccess: (newAvatar?: string, newEmail?: string) => void;
}

export const EditProfileModal = ({
  visible,
  onClose,
  user,
  onSaveSuccess,
  role,
}: EditProfileModalProps) => {
  const colors = roleConfig[role];
  const [avatarUri, setAvatarUri] = useState<string | undefined>(
    user?.avatarUrl,
  );
  const [email, setEmail] = useState<string>(user?.email || "");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (visible && user) {
      setAvatarUri(user.avatarUrl);
      setEmail(user.email);
    }
  }, [visible, user]);

  const handlePickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        toast.error("Permissão negada", {
          description: "É necessário acesso à galeria.",
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
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      toast.error("Erro ao selecionar a foto.");
    }
  };

  const handleSave = async () => {
    if (!email.trim()) {
      toast.error("O e-mail não pode ficar vazio.");
      return;
    }

    try {
      setIsProcessing(true);
      if (avatarUri && avatarUri !== user?.avatarUrl) {
        await updateMockProfileImage(avatarUri);
      }
      if (email !== user?.email) {
        await updateMockEmail(email);
      }

      toast.success("Perfil atualizado com sucesso!");
      onSaveSuccess(avatarUri, email);
      onClose();
    } catch (error) {
      toast.error("Erro ao salvar as alterações.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <View className="w-full bg-general-bg rounded-[32px] p-6 shadow-xl relative">
          <TouchableOpacity
            onPress={onClose}
            className="absolute right-5 top-5 p-2 z-10"
          >
            <X size={24} color={colors.dark} strokeWidth={1.5} />
          </TouchableOpacity>

          <Text
            className="text-center font-poppins-semibold text-[20px] mb-6"
            style={{ color: colors.main }}
          >
            Editar Conta
          </Text>

          {/* Troca de Foto */}
          <View className="items-center mb-6">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePickImage}
              className="relative"
            >
              {avatarUri ? (
                <Image
                  source={{ uri: avatarUri }}
                  className="w-24 h-24 rounded-full"
                  style={{ backgroundColor: colors.surface }}
                />
              ) : (
                <View
                  className="w-24 h-24 rounded-full items-center justify-center"
                  style={{ backgroundColor: colors.main }}
                >
                  <Text className="font-poppins-medium text-white text-[32px] mt-1">
                    {user?.name.first.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <View
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full items-center justify-center border-2 border-white"
                style={{ backgroundColor: colors.main }}
              >
                <Camera size={14} color="#FFF" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Edição de E-mail */}
          <View className="mb-8">
            <Text className="font-poppins-medium text-gray-700 mb-2 ml-1">
              E-mail
            </Text>
            <Input
              appRole={role}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Digite o novo e-mail"
            />
          </View>

          <View className="flex-row justify-between gap-3">
            <Button
              appRole={role}
              className="flex-1"
              variant="outline"
              onPress={onClose}
              disabled={isProcessing}
            >
              <Text>Cancelar</Text>
            </Button>
            <Button
              appRole={role}
              className="flex-1"
              variant="default"
              onPress={handleSave}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white">Salvar</Text>
              )}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
