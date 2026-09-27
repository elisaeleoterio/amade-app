import type { Role } from "@/types/role.type";
import { TriangleAlert, X } from "lucide-react-native";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  role?: Role;
}

const roleColors = {
  admin: "#712B05",
  lojista: "#9F1239",
  artesao: "#166534",
};

export const DeleteModal = ({
  visible,
  onClose,
  onConfirm,
  role = "admin",
}: DeleteModalProps) => {
  const activeColor = roleColors[role];

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
            <X size={24} color={activeColor} strokeWidth={1.5} />
          </TouchableOpacity>

          <View className="mb-4 mt-2">
            <TriangleAlert size={56} color={activeColor} strokeWidth={1.2} />
          </View>

          <Text
            className="text-center font-poppins-semibold text-[20px] mb-3 mx-10"
            style={{ color: activeColor }}
          >
            Tem certeza que deseja{" "}
            <Text className="text-toaster-error font-poppins-bold">
              excluir
            </Text>{" "}
            sua conta?
          </Text>

          <Text
            className="text-center font-poppins-regular text-[15px] mx-6 mb-8 leading-6 px-2"
            style={{ color: activeColor }}
          >
            Ao confirmar, sua conta será excluída e será irrecuperável.{" "}
            <Text className="font-poppins-bold">Todos</Text> os seus dados serão
            perdidos.
          </Text>

          <View className="w-full flex-row justify-between">
            <Button
              appRole={role}
              className="bg-toaster-success"
              onPress={onClose}
              variant="default"
              size="md"
            >
              <Text>Cancelar</Text>
            </Button>

            <Button
              appRole={role}
              className="bg-toaster-error"
              variant="default"
              size="md"
              onPress={onConfirm}
            >
              <Text>Excluir Conta</Text>
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
