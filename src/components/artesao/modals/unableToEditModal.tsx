import { Text } from "@/components/ui/text";
import type { Status } from "@/types/status.type";
import { Info, X } from "lucide-react-native";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";

interface UnableToEditModalProps {
  visible: boolean;
  onClose: () => void;
  productStatus: Status | undefined;
}

export const UnableToEditModal = ({
  visible,
  onClose,
  productStatus,
}: UnableToEditModalProps) => {
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
            <X size={24} color={"#166534"} strokeWidth={1.5} />
          </TouchableOpacity>

          <View className="mb-4 mt-2">
            <Info size={30} color={"#166534"} strokeWidth={1.2} />
          </View>

          <Text className="text-center font-poppins-semibold text-[20px] mb-3 mx-10 text-artesao-dark">
            Ação não permitida
          </Text>

          {productStatus === "Disponível" ? (
            <Text className="text-center font-poppins-regular text-[15px] mx-4 mb-8 leading-6 px-2 text-artesao-dark">
              Este produto está marcado como{" "}
              <Text className="font-poppins-semibold">{productStatus}</Text> ,
              por isso não pode ser excluído. Para excluir esse produto, é
              necessário removê-lo da loja, marcando-o como{" "}
              <Text className="font-poppins-semibold">Indisponível</Text>.
            </Text>
          ) : (
            <Text className="text-center font-poppins-regular text-[15px] mx-4 mb-8 leading-6 px-2 text-artesao-dark">
              Este produto está marcado como{" "}
              <Text className="font-poppins-semibold">{productStatus}</Text> e,
              portanto, não pode mais ser editado nem excluido.
            </Text>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};
