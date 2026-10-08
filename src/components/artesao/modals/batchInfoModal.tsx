import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import { Role } from "@/types/role.type";
import { Info, X } from "lucide-react-native";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";

interface BatchInfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export const BatchInfoModal = ({ visible, onClose }: BatchInfoModalProps) => {
  const role: Role = "artesao";
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
            <Info size={30} color={colors.main} strokeWidth={1.2} />
          </View>

          <Text className="text-center font-poppins-semibold text-[20px] mb-3 mx-8 text-artesao-dark">
            O sistema utiliza um esquema de{" "}
            <Text className="font-poppins-semibold">lotes</Text> para cadastrar
            produtos.
          </Text>

          <View className="w-full justify-between gap-4 mb-6 my-10 px-3">
            <Text className="text-[#4F6B59] font-poppins-semibold text-center">
              O que é um lote?
            </Text>
            <Text className="text-[#4F6B59] font-poppins-light text-center">
              Um lote é apenas uma forma de cadastrar vários produtos de uma
              única vez de forma rápida e prática, sem precisar retornar à tela
              de estoque a cada produto adicionado.
            </Text>
            <Text className="text-[#4F6B59] font-poppins-light text-center">
              Nesta tela você pode revisar os produtos que adicionou e editá-los
              rapidamente.
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
