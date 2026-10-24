import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import { Role } from "@/types/role.type";
import { Info, X } from "lucide-react-native";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";

interface ShiftInfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ShiftInfoModal = ({ visible, onClose }: ShiftInfoModalProps) => {
  const role: Role = "lojista";
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

          <Text className="text-center font-poppins-regular text-lg mb-1 mx-8 text-lojista-wine">
            O sistema utiliza um esquema de{" "}
            <Text className="font-poppins-semibold">turnos</Text> para cadastrar
            a venda dos produtos.
          </Text>

          <View className="w-full justify-between gap-4 mb-6 my-6 px-3">
            <Text className="text-lojista-main font-poppins-semibold text-center">
              O que é um turno?
            </Text>
            <Text className="text-lojista-main font-poppins-light text-center">
              Um turno simboliza um perídodo de tempo em que o lojista atuará na
              loja. Durante esse período são cadastradas vendas e cada venda
              possuí os produtos e as demais informações necessárias.
            </Text>
            <Text className="text-lojista-main font-poppins-light text-center">
              Esta tela é o ínicio de um turno, o qual você se manterá após
              Iniciar o Turno até que ele seja salvo ou cancelado.
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
