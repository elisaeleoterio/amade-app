import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Product } from "@/mocks/productMock";
import { Status } from "@/types/status.type"; // Importa apenas o Type
import * as ImagePicker from "expo-image-picker";
import { ChevronDown } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialData?: Product | null;
}

const STATUS_OPTIONS: Status[] = [
  "Cadastrado",
  "Disponível",
  "Vendido",
  "Quitado",
  "Indisponível",
];

export const ProductModal = ({
  visible,
  onClose,
  onSave,
  initialData,
}: ProductModalProps) => {
  const isEditing = !!initialData;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState<Status>("Cadastrado");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (visible) {
      if (isEditing && initialData) {
        if (
          initialData.status === "Vendido" ||
          initialData.status === "Quitado"
        ) {
          Alert.alert(
            "Ação não permitida",
            `Este produto está marcado como ${initialData.status} e não pode mais ser editado.`,
          );
          onClose();
          return;
        }

        setTitle(initialData.title);
        setPrice(initialData.price.toString());
        setStatus(initialData.status as Status);
        setDescription(initialData.description);
        setImageUrls(initialData.imageUrls || []);
      } else {
        setTitle("");
        setPrice("");
        setStatus("Cadastrado");
        setDescription("");
        setImageUrls([]);
      }
      setIsDropdownOpen(false);
    }
  }, [visible, initialData, isEditing]);

  const handleSave = () => {
    if (!title.trim() || !price.trim() || !description.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    const numericPrice = parseFloat(price.replace(",", "."));
    if (isNaN(numericPrice)) {
      Alert.alert("Atenção", "Insira um valor de preço válido.");
      return;
    }

    const productData: Product = {
      id: isEditing
        ? initialData.id
        : `COD-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}`,
      title,
      price: numericPrice,
      status,
      description,
      imageUrls,
      paymentMethod: initialData?.paymentMethod,
    };

    onSave(productData);
    onClose();
  };

  const handleAddImage = async () => {
    if (imageUrls.length >= 3) {
      Alert.alert("Limite", "Você só pode adicionar até 3 imagens.");
      return;
    }

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permissão negada",
        "Precisamos de acesso à sua galeria para adicionar fotos.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUrls((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    Alert.alert("Remover Imagem", "Deseja remover esta imagem do produto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () =>
          setImageUrls((prev) =>
            prev.filter((_, index) => index !== indexToRemove),
          ),
      },
    ]);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-end bg-black/50"
      >
        <View className="h-[85%] w-full rounded-t-[32px] bg-white px-6 pt-6 pb-8 shadow-xl">
          <Text className="mb-6 text-center font-poppins-semibold text-[20px] text-artesao-main">
            {isEditing ? "Editar Produto" : "Novo Produto"}
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 mb-16"
          >
            <View className="mb-4">
              <Text className="mb-1 font-poppins-medium text-[15px] text-artesao-main">
                Título
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Nome do Produto"
                placeholderTextColor="#9CA3AF"
                className="h-12 rounded-2xl bg-[#E8EFE8] px-4 font-poppins-regular text-[15px] text-artesao-main py-0"
                style={{
                  textAlignVertical: "center",
                  includeFontPadding: false,
                }}
              />
            </View>

            <View className="mb-4">
              <Text className="mb-1 font-poppins-medium text-[15px] text-artesao-main">
                Preço
              </Text>
              <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="R$"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                className="h-12 rounded-2xl bg-[#E8EFE8] px-4 font-poppins-regular text-[15px] text-artesao-main py-0"
                style={{
                  textAlignVertical: "center",
                  includeFontPadding: false,
                }}
              />
            </View>

            <View className="mb-4 z-50">
              <Text className="mb-1 font-poppins-medium text-[15px] text-artesao-main">
                Status
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-12 flex-row items-center justify-between rounded-2xl bg-[#E8EFE8] px-4"
              >
                <Text className="font-poppins-regular text-[15px] text-artesao-main">
                  {status}
                </Text>
                <ChevronDown size={20} color="#14532D" />
              </TouchableOpacity>

              {isDropdownOpen && (
                <View className="absolute top-[70px] z-50 w-full overflow-hidden rounded-xl bg-white shadow-lg elevation-5 border border-gray-100">
                  {STATUS_OPTIONS.map((option) => (
                    <TouchableOpacity
                      key={option}
                      className="border-b border-gray-100 p-3"
                      onPress={() => {
                        setStatus(option);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Text className="font-poppins-regular text-[14px] text-artesao-main">
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View className="mb-6">
              <Text className="mb-1 font-poppins-medium text-[15px] text-artesao-main">
                Descrição:
              </Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Tipo de madeira, forma de acabamento..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                className="min-h-[100px] rounded-2xl border-[1.5px] border-[#E8EFE8] bg-white p-4 font-poppins-regular text-[15px] text-artesao-main"
                style={{ textAlignVertical: "top" }}
              />
            </View>

            <View className="mb-4 items-center">
              <TouchableOpacity
                onPress={handleAddImage}
                activeOpacity={0.7}
                className="rounded-xl bg-artesao-main px-6 py-2.5"
              >
                <Text className="font-poppins-medium text-[15px] text-white">
                  Add Imagem
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mb-8 flex-row justify-between gap-3 px-2">
              {[0, 1, 2].map((index) => {
                const imageUrl = imageUrls[index];
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={imageUrl ? 0.7 : 1}
                    onPress={() => imageUrl && handleRemoveImage(index)}
                    className="aspect-[3/4] flex-1 overflow-hidden rounded-2xl bg-[#E8EFE8]"
                  >
                    {imageUrl ? (
                      <Image
                        source={{ uri: imageUrl }}
                        className="h-full w-full"
                        resizeMode="cover"
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <View className="mt-4 flex-row justify-between gap-4">
            <View className="flex-1">
              <Button
                appRole="artesao"
                variant="outline"
                size="md"
                onPress={onClose}
              >
                <Text>Cancelar</Text>
              </Button>
            </View>
            <View className="flex-1">
              <Button
                appRole="artesao"
                variant="default"
                size="md"
                onPress={handleSave}
              >
                <Text>Salvar</Text>
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
