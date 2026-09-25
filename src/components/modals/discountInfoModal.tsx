import { Info, X } from "lucide-react-native";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { Text } from "../ui/text";

interface DiscountInfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export const DiscountInfoModal = ({
  visible,
  onClose,
}: DiscountInfoModalProps) => {
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
            Sobre os Descontos
          </Text>

          <Text className="text-center font-poppins-regular text-[15px] mx-4 mb-8 leading-6 px-2 text-artesao-dark">
            Após a venda de um produto, alguns descontos são aplicado ao valor
            da venda. São eles:
          </Text>

          <View className="w-full justify-between gap-4 mb-6">
            <Text className="text-[#4F6B59] font-poppins-semibold">
              Forma de Pagamento:{" "}
              <Text className="text-[#4F6B59] font-poppins-light">
                Algumas formas de pagamento possuem taxas que são de
                responsabilidade do artesão. Caso o produto seja pago em
                crédito, a taxa é de 3%.
              </Text>
            </Text>
            <Text className="text-[#4F6B59] font-poppins-semibold">
              Repasse para a Associação:{" "}
              <Text className="text-[#4F6B59] font-poppins-light">
                Para expor os produtos na Loja da AMADE, é necessários pagamento
                de uma taxa de 16% após a venda para custaer as despesas do
                estabelecimento.
              </Text>
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
