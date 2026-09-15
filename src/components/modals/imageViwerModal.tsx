import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library/legacy";
import { Download, Trash2, X } from "lucide-react-native";
import { useState } from "react";
import {
    ActivityIndicator,
    Image,
    Modal,
    TouchableOpacity,
    View,
} from "react-native";
import { DeleteImageModal } from "../artesao/modals/deleteImageModal";
import { toast } from "../ui/sonner";

interface ImageViewerModalProps {
  visible: boolean;
  imageUrl: string | null;
  role: string;
  onClose: () => void;
  onRemove?: () => void;
}

export const ImageViewerModal = ({
  visible,
  imageUrl,
  role,
  onClose,
  onRemove,
}: ImageViewerModalProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRemoveImageModalOpen, setisRemoveImageModalOpen] = useState(false);

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      setIsDownloading(true);
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        toast.warning(
          "Acesso aos seus arquivos é necessário para salvar a imagem.",
        );
        return;
      }

      const fileUri =
        FileSystem.documentDirectory + `produto_${Date.now()}.jpg`;

      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

      await MediaLibrary.saveToLibraryAsync(uri);
      toast.success("Imagem salva na sua galeria!");
    } catch (error) {
      toast.error("Não foi possível baixar a imagem.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRemove = () => {
    if (onRemove) onRemove();
    onClose();
  };

  if (!imageUrl) {
    toast.error("Erro ao carregar imagem selecionada.");
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-[#FDFBF5] justify-center items-center">
        {/* Botão de Fechar */}
        <TouchableOpacity
          onPress={onClose}
          className="absolute top-12 right-6 z-50 p-2"
        >
          <X size={28} color="#2A0F01" />
        </TouchableOpacity>

        {/* Imagem em Tela Cheia */}
        <Image
          source={{ uri: imageUrl }}
          className="w-[95%] h-[70%]"
          resizeMode="contain"
        />

        {/* Controles Inferiores */}
        <View className="absolute bottom-12 w-full flex-row justify-center gap-8 px-8">
          <TouchableOpacity
            onPress={handleDownload}
            disabled={isDownloading}
            className="items-center justify-center p-4 rounded-full"
          >
            {isDownloading ? (
              <ActivityIndicator color="#2A0F01" />
            ) : (
              <Download size={28} color="#2A0F01" />
            )}
          </TouchableOpacity>

          {/* Renderiza o botão de excluir apenas se for artesão */}
          {role === "artesao" && onRemove && (
            <>
              <TouchableOpacity
                onPress={() => setisRemoveImageModalOpen(true)}
                className="items-center justify-center p-4"
              >
                <Trash2 size={28} color="#DC2626" />
              </TouchableOpacity>

              <DeleteImageModal
                visible={isRemoveImageModalOpen}
                onClose={() => setisRemoveImageModalOpen(false)}
                onConfirm={handleRemove}
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};
