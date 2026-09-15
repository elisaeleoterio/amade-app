import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { TriangleAlert, X } from "lucide-react-native";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";

interface DeleteImageModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteImageModal = ({
  visible,
  onClose,
  onConfirm,
}: DeleteImageModalProps) => {
  const activeColor = "#166534";

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
        <Pressable className="w-full max-w-sm rounded-[32px] bg-[#FDFBF5] p-6 items-center shadow-lg relative">
          <TouchableOpacity
            onPress={onClose}
            className="absolute right-5 top-5 p-2"
            activeOpacity={0.7}
          >
            <X size={24} color={activeColor} strokeWidth={1.5} />
          </TouchableOpacity>

          <View className="mb-4 mt-2">
            <TriangleAlert size={56} color={activeColor} strokeWidth={1.2} />
          </View>

          <Text
            className="text-center font-poppins-semibold text-[20px] mb-3 mx-10"
            style={{ color: activeColor }}
          >
            Tem certeza que deseja excluir essa imagem?
          </Text>

          <Text
            className="text-center font-poppins-regular text-[15px] mx-6 mb-8 leading-6 px-2"
            style={{ color: activeColor }}
          >
            Ao excluir essa imagem, não será possível recuperá-la
            posteriormente.
          </Text>

          <View className="w-full flex-row justify-between">
            <Button
              appRole="artesao"
              className="bg-toaster-success w-40"
              onPress={onClose}
              variant="default"
              size="md"
            >
              <Text>Cancelar</Text>
            </Button>

            <Button
              appRole="artesao"
              className="bg-toaster-error w-40"
              variant="default"
              size="md"
              onPress={onConfirm}
            >
              <Text>Excluir</Text>
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
