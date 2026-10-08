import { roleConfig } from "@/constants/theme";
import { Role } from "@/types/role.type";
import { Info, X } from "lucide-react-native";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { Text } from "../ui/text";

interface StatusInfoModalProps {
  visible: boolean;
  onClose: () => void;
  role?: Role;
}

export const StatusInfoModal = ({
  visible,
  onClose,
  role = "artesao",
}: StatusInfoModalProps) => {
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

          <Text
            className="text-center font-poppins-semibold text-[20px] mb-3 mx-10"
            style={{ color: colors.dark }}
          >
            Sobre os Status
          </Text>

          <Text
            className="text-center font-poppins-regular text-[15px] mx-4 mb-8 leading-6 px-2"
            style={{ color: colors.dark }}
          >
            Os produtos cadastrados no sistema possuem diferentes status para
            indicar sua situação atual.
          </Text>

          <View className="w-full justify-between gap-4 mb-6">
            <Text
              className="font-poppins-semibold"
              style={{ color: colors.extraDark }}
            >
              Cadastrado:{" "}
              <Text
                className="font-poppins-light"
                style={{ color: colors.extraDark }}
              >
                Produtos inseridos no sistema, porém ainda não disponíveis
                fisicamente na loja.
              </Text>
            </Text>
            <Text
              className="font-poppins-semibold"
              style={{ color: colors.extraDark }}
            >
              Disponível:{" "}
              <Text
                className="font-poppins-light"
                style={{ color: colors.extraDark }}
              >
                Produtos cadastrados no sistema e entregues na loja, disponíveis
                para compra.
              </Text>
            </Text>
            <Text
              className="font-poppins-semibold"
              style={{ color: colors.extraDark }}
            >
              Vendido:{" "}
              <Text
                className="font-poppins-light"
                style={{ color: colors.extraDark }}
              >
                Produtos comprados na loja, porém ainda não processados pela
                Associação.
              </Text>
            </Text>
            <Text
              className="font-poppins-semibold"
              style={{ color: colors.extraDark }}
            >
              Quitado:{" "}
              <Text
                className="font-poppins-light"
                style={{ color: colors.extraDark }}
              >
                Produtos vendidos e processados pela Associação, com o repasse
                do valor enviado para o artesão.
              </Text>
            </Text>
            <Text
              className="font-poppins-semibold"
              style={{ color: colors.extraDark }}
            >
              Indisponível:{" "}
              <Text
                className="font-poppins-light"
                style={{ color: colors.extraDark }}
              >
                Produtos que por algum motivo não estão mais disponíveis para
                venda na loja.
              </Text>
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
