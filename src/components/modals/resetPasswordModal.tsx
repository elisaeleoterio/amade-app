import { roleConfig } from "@/constants/theme";
import type { Role } from "@/types/role.type";
import { Info, X } from "lucide-react-native";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface ResetPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  role?: Role;
}

export const ResetPasswordModal = ({
  visible,
  onClose,
  onConfirm,
  role = "admin",
}: ResetPasswordModalProps) => {
  const colors = roleConfig[role];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/50 px-4"
        onPress={onClose}
      >
        <Pressable className="w-full max-w-sm rounded-[32px] bg-general-bg p-6 items-center shadow-lg relative">
          <TouchableOpacity
            onPress={onClose}
            className="absolute right-5 top-5 p-2"
            activeOpacity={0.7}
          >
            <X size={24} color={colors.main} strokeWidth={1.5} />
          </TouchableOpacity>

          <View className="mb-4 mt-2">
            <Info size={56} color={colors.main} strokeWidth={1.2} />
          </View>

          <Text
            className="text-center font-poppins-semibold text-[20px] mb-3 mx-10"
            style={{ color: colors.main }}
          >
            Tem certeza que deseja redefinir a sua senha?
          </Text>

          <Text
            className="text-center font-poppins-regular text-[15px] mx-6 mb-8 leading-6 px-2"
            style={{ color: colors.main }}
          >
            Ao confirmar, você será redirecionado para a página de redefinição
            de senha e será deslogado posteriormente.
          </Text>

          <View className="w-full flex-row justify-between">
            <Button
              appRole={role}
              onPress={onClose}
              variant="outline"
              size="md"
            >
              <Text>Cancelar</Text>
            </Button>

            <Button
              appRole={role}
              variant="default"
              size="md"
              onPress={onConfirm}
            >
              <Text>Redefinir Senha</Text>
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
