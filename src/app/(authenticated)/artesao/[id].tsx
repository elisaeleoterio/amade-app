import { DeleteProductModal } from "@/components/artesao/modals/deleteProductModal";
import { ProductModal } from "@/components/artesao/modals/ProductModal";
import { UnableToEditModal } from "@/components/artesao/modals/unableToEditModal";
import { ProductDetailsTemplate } from "@/components/templates/ProductDetailsTemplate";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import {
  deleteMockProduct,
  fetchMockProducts,
  Product,
  updateMockProduct,
} from "@/mocks/productMock";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function ArtesaoProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isOpenUnableToEdit, setOpenUnableToEdit] = useState(false);
  const [isDeleteProductModalOpen, setisDeleteProductModalOpen] =
    useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadProductData = async () => {
        try {
          const allProducts = await fetchMockProducts();
          const product = allProducts.find((p) => p.id === id);
          if (product) {
            setSelectedProduct(product);
          }
        } catch (error) {
          toast.error("Erro ao carregar dados do produto");
        }
      };
      loadProductData();
    }, [id, refreshKey]),
  );

  const handleOpenEditModal = () => {
    if (!selectedProduct) return;
    setIsEditModalVisible(true);
  };

  const handleSaveProduct = async (savedProduct: Product) => {
    try {
      setIsProcessing(true);
      await updateMockProduct(savedProduct);
      setIsEditModalVisible(false);
      setRefreshKey((prev) => prev + 1);
      toast.success("Produto atualizado com sucesso!");
    } catch (error) {
      toast.error("Não foi possível salvar as alterações.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      setIsProcessing(true);
      await deleteMockProduct(id);
      toast.success("Produto removido.");
      setIsProcessing(false);
      router.back();
    } catch (error) {
      toast.error("Não foi possível excluir o produto.");
      setIsProcessing(false);
    }
  };

  const isEditBlocked =
    selectedProduct?.status === "Vendido" ||
    selectedProduct?.status === "Quitado";
  const isExcludeBlocked =
    isEditBlocked || selectedProduct?.status === "Disponível";

  return (
    <ProductDetailsTemplate
      productId={id}
      role="artesao"
      onUpdateProduct={handleSaveProduct}
      refreshKey={refreshKey}
    >
      <View className="w-full flex-row justify-between gap-4">
        <View className="flex-1">
          <Button
            appRole="artesao"
            variant={isExcludeBlocked ? "ghost" : "outline"}
            size="md"
            onPress={() => {
              isExcludeBlocked
                ? setOpenUnableToEdit(true)
                : setisDeleteProductModalOpen(true);
            }}
            disabled={isProcessing}
          >
            <Text>Excluir</Text>
          </Button>

          <DeleteProductModal
            visible={isDeleteProductModalOpen}
            onClose={() => setisDeleteProductModalOpen(false)}
            onConfirm={handleDeleteProduct}
          />
        </View>

        <View className="flex-1">
          <Button
            appRole="artesao"
            variant={isEditBlocked ? "ghost" : "default"}
            size="md"
            onPress={() => setOpenUnableToEdit(true)}
            disabled={isProcessing}
          >
            <Text>Editar</Text>
          </Button>

          <UnableToEditModal
            visible={isOpenUnableToEdit}
            onClose={() => setOpenUnableToEdit(false)}
            productStatus={selectedProduct?.status}
          />
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
