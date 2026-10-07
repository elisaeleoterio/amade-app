import { ImageViewerModal } from "@/components/modals/imageViwerModal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import { Product } from "@/mocks/productMock";
import { Status } from "@/types/status.type";
import * as ImagePicker from "expo-image-picker";
import { ChevronDown, Minus, Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
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
  onSave: (product: Product, quantity: number) => void;
  initialData?: Product | null;
}

const STATUS_OPTIONS: Status[] = ["Cadastrado", "Disponível", "Indisponível"];

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
  const [isOpenImageViewer, setIsOpenImageViewer] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [errorMessage, setErrorMessage] = useState("");

  const formatPrice = (rawValue: string) => {
    const numericValue = rawValue.replace(/\D/g, "");
    if (!numericValue) return "";

    const amount = (Number(numericValue) / 100).toFixed(2);

    const [intPart, decPart] = amount.split(".");
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${formattedInt},${decPart}`;
  };

  useEffect(() => {
    if (visible) {
      if (isEditing && initialData) {
        if (
          initialData.status === "Vendido" ||
          initialData.status === "Quitado"
        ) {
          onClose();
        }

        setTitle(initialData.title);
        setPrice(formatPrice(initialData.price.toFixed(2)));
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
      setQuantity("1");
      setErrorMessage("");
    }
  }, [visible, initialData, isEditing]);

  const handleSave = () => {
    if (!title.trim() || !price.trim() || !description.trim()) {
      setErrorMessage("Preencha todos os campos obrigatórios.");
      return;
    }

    if (title.length > 50) {
      setErrorMessage("O título do produto ultrapassa o máximo permitido.");
      return;
    }
    const cleanPrice = price.replace(/\./g, "").replace(",", ".");
    const numericPrice = parseFloat(cleanPrice);

    if (isNaN(numericPrice) || numericPrice <= 0) {
      setErrorMessage("Insira um valor de preço válido.");
      return;
    }

    const qty = isEditing ? 1 : parseInt(quantity, 10);

    if (!isEditing) {
      const isInteger = /^\d+$/.test(quantity.trim());
      if (!isInteger || qty < 1) {
        setErrorMessage("Insira uma quantidade inteira válida (mínimo de 1).");
        return;
      } else if (qty > 999) {
        setErrorMessage("Você só pode adicionar até 999 produtos por vez.");
        return;
      }
    }

    const tempId = `TEMP-${Math.floor(Math.random() * 1000)}`;
    const productData: Product = {
      id: initialData?.id || tempId,
      title,
      price: numericPrice,
      status,
      description,
      imageUrls,
      paymentMethod: initialData?.paymentMethod,
    };

    setErrorMessage("");
    setQuantity("1");
    onSave(productData, qty);
    onClose();
  };

  const handleAddImage = async () => {
    if (imageUrls.length >= 3) {
      toast.warning("Você só pode adicionar até 3 imagens.");
      return;
    }

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      toast.warning("Precisamos de acesso à sua galeria para adicionar fotos.");
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
    setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const incrementQuantity = () => {
    const current = parseInt(quantity, 10) || 0;
    setQuantity((current + 1).toString());
  };

  const decrementQuantity = () => {
    const current = parseInt(quantity, 10) || 0;
    if (current > 1) {
      setQuantity((current - 1).toString());
    }
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
        <View className="h-[85%] w-full rounded-t-[32px] bg-general-bg px-6 pt-6 pb-8 shadow-xl">
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
                maxLength={50}
                value={title}
                onChangeText={setTitle}
                placeholder="Nome do Produto"
                placeholderTextColor="#9CA3AF"
                className="h-12 rounded-2xl bg-artesao-surface px-4 font-poppins-regular text-[15px] text-artesao-main py-0"
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
              <View className="h-12 flex-row items-center rounded-2xl bg-artesao-surface px-4">
                <Text className="font-poppins-medium text-[15px] text-artesao-main mr-1 mt-[2px]">
                  R$
                </Text>
                <TextInput
                  value={price}
                  onChangeText={(text) => setPrice(formatPrice(text))}
                  placeholder="0,00"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  className="flex-1 font-poppins-regular text-[15px] text-artesao-main py-0"
                  style={{
                    textAlignVertical: "center",
                    includeFontPadding: false,
                  }}
                />
              </View>
            </View>

            <View className="flex-row w-full justify-between">
              <View className="mb-4 z-50">
                <Text className="mb-1 font-poppins-medium text-[15px] text-artesao-main">
                  Status
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="h-12 w-48 flex-row items-center justify-between rounded-2xl bg-artesao-surface px-4"
                >
                  <Text className="font-poppins-regular text-[15px] text-artesao-main">
                    {status}
                  </Text>
                  <ChevronDown size={20} color="#14532D" />
                </TouchableOpacity>

                {isDropdownOpen && (
                  <View className="absolute top-[70px] z-50 w-full overflow-hidden rounded-xl bg-general-bg shadow-lg elevation-5 border border-gray-100">
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

              {!isEditing && (
                <View className="mb-4 z-40">
                  <Text className="mb-1 font-poppins-medium text-[15px] text-artesao-main">
                    Quantidade
                  </Text>
                  <View className="h-12 w-32 flex-row items-center justify-between rounded-2xl bg-artesao-surface px-1">
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={decrementQuantity}
                      className="p-2"
                    >
                      <Minus size={20} color="#14532D" />
                    </TouchableOpacity>

                    <TextInput
                      className="flex-1 text-center font-poppins-regular text-[15px] text-artesao-main py-0"
                      value={quantity}
                      maxLength={3}
                      keyboardType="numeric"
                      onChangeText={(text) =>
                        setQuantity(text.replace(/\D/g, ""))
                      }
                      placeholder="1"
                      placeholderTextColor="#9CA3AF"
                      style={{
                        textAlignVertical: "center",
                        includeFontPadding: false,
                      }}
                    />

                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={incrementQuantity}
                      className="p-2"
                    >
                      <Plus size={20} color="#14532D" />
                    </TouchableOpacity>
                  </View>
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
                className="min-h-[100px] rounded-2xl border-[1.5px] border-artesao-surface bg-general-bg p-4 font-poppins-regular text-[15px] text-artesao-main"
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
                    onPress={() => setIsOpenImageViewer(true)}
                    className="aspect-[3/4] flex-1 overflow-hidden rounded-2xl bg-general-bg"
                  >
                    {imageUrl ? (
                      <Image
                        source={{ uri: imageUrl }}
                        className="h-full w-full"
                        resizeMode="cover"
                      />
                    ) : null}
                    <ImageViewerModal
                      visible={isOpenImageViewer}
                      imageUrl={imageUrl}
                      role="artesao"
                      onClose={() => setIsOpenImageViewer(false)}
                      onRemove={() => handleRemoveImage(index)}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {errorMessage ? (
            <Text className="mt-2 text-center font-poppins-medium text-[14px] text-red-500">
              {errorMessage}
            </Text>
          ) : null}

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
