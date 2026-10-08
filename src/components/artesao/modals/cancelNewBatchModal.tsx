import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import { Role } from "@/types/role.type";
import { TriangleAlert, X } from "lucide-react-native";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";

interface CancelNewBatchtModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const CancelNewBatchtModal = ({
  visible,
  onClose,
  onConfirm,
}: CancelNewBatchtModalProps) => {
  const role: Role = "admin";
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
            <TriangleAlert size={56} color={colors.main} strokeWidth={1.2} />
          </View>

          <Text className="text-center font-poppins-semibold text-[20px] mb-3 mx-10 text-artesao-main">
            Tem certeza que deseja cancelar a criação do lote?
          </Text>

          <View className="w-full justify-between px-5">
            <Button
              appRole={role}
              className="bg-toaster-error"
              variant="default"
              size="md"
              onPress={onConfirm}
            >
              <Text>Confirmar Cancelamento</Text>
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
