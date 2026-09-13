import { Info, X } from "lucide-react-native";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal = ({
  visible,
  onClose,
  onConfirm,
}: LogoutModalProps) => {
  // Cores extraídas do design
  const primaryBrown = "#5C280C";

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
        <Pressable className="w-full max-w-sm rounded-[32px] bg-white p-6 items-center shadow-lg relative">
          <TouchableOpacity
            onPress={onClose}
            className="absolute right-5 top-5 p-2"
            activeOpacity={0.7}
          >
            <X size={24} color={"#712B05"} strokeWidth={1.5} />
          </TouchableOpacity>

          <View className="mb-4 mt-2">
            <Info size={56} color={"#712B05"} strokeWidth={1.2} />
          </View>

          {/* Textos */}
          <Text className="text-center font-poppins-semibold text-[20px] mb-3 mx-10 text-admin-main">
            Tem certeza que deseja sair da sua conta?
          </Text>

          <Text className="text-center font-poppins-regular text-[15px] mx-6 mb-8 leading-6 px-2 text-admin-main">
            Ao confirmar, você será deslogado e precisará informar seus dados de
            login novamente.
          </Text>

          {/* Container dos Botões */}
          <View className="w-full flex-row justify-between">
            {/* Botão Cancelar */}
            <Button onPress={onClose} variant="outline" size="md">
              <Text>Cancelar</Text>
            </Button>

            {/* Botão Sair da Conta */}
            <Button variant="default" size="md" onPress={onConfirm}>
              <Text>Sair da Conta</Text>
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
