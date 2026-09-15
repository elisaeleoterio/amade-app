import { ProductModal } from "@/components/artesao/modals/ProductModal";
import { ProductDetailsTemplate } from "@/components/templates/ProductDetailsTemplate";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
    deleteMockProduct,
    fetchMockProducts,
    Product,
    updateMockProduct,
} from "@/mocks/productMock";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function ArtesaoProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOpenEditModal = async () => {
    try {
      setIsProcessing(true);
      const allProducts = await fetchMockProducts();
      const productToEdit = allProducts.find((p) => p.id === id);

      if (productToEdit) {
        setSelectedProduct(productToEdit);
        setIsEditModalVisible(true);
      }
    } catch (error) {
      console.error("Erro ao buscar produto", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Função para salvar a EDIÇÃO
  const handleSaveProduct = async (savedProduct: Product) => {
    try {
      setIsProcessing(true);
      await updateMockProduct(savedProduct);
      setIsEditModalVisible(false);

      Alert.alert("Sucesso", "Produto atualizado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Função para EXCLUIR
  const handleDeleteProduct = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja remover este produto do estoque?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setIsProcessing(true);
              await deleteMockProduct(id);
              Alert.alert("Sucesso", "Produto removido.");
              router.back();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir o produto.");
              setIsProcessing(false);
            }
          },
        },
      ],
    );
  };

  return (
    <ProductDetailsTemplate productId={id} role="artesao">
      <View className="w-full flex-row justify-between gap-4">
        <View className="flex-1">
          <Button
            appRole="artesao"
            variant="outline"
            size="md"
            onPress={handleDeleteProduct}
            disabled={isProcessing}
          >
            <Text className="text-artesao-main">
              {isProcessing ? "Aguarde..." : "Excluir"}
            </Text>
          </Button>
        </View>

        <View className="flex-1">
          <Button
            appRole="artesao"
            variant="default"
            size="md"
            onPress={handleOpenEditModal}
            disabled={isProcessing}
          >
            <Text className="text-white">Editar</Text>
          </Button>
        </View>
      </View>

      <ProductModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleSaveProduct}
        initialData={selectedProduct}
      />
    </ProductDetailsTemplate>
  );
}
