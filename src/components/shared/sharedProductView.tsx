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
import { MOCK_USER_ARTESAO_LOJISTA } from "@/mocks/userMock";
import { Role } from "@/types/role.type";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

interface SharedProductDetailsProps {
  id: string;
  origin: "inventory" | "shift";
  shiftId?: string;
  shiftOrigin?: string;
}

export const SharedProductDetails = ({
  id,
  origin,
  shiftId,
  shiftOrigin,
}: SharedProductDetailsProps) => {
  const router = useRouter();

  const isFromShift = origin === "shift";
  const currentRole: Role = isFromShift ? "lojista" : "artesao";

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
      setisDeleteProductModalOpen(false);
      router.back();
    } catch (error) {
      toast.error("Não foi possível excluir o produto.");
    } finally {
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
      role={currentRole}
      artisanName={
        // Ajustar depois com a implementação do back
        isFromShift
          ? `${MOCK_USER_ARTESAO_LOJISTA.name.first} ${MOCK_USER_ARTESAO_LOJISTA.name.second}`
          : undefined
      }
      onBackPress={
        isFromShift && shiftId
          ? () =>
              router.replace({
                pathname: "/(authenticated)/lojista/[id]",
                params: { id: shiftId, origin: shiftOrigin },
              })
          : undefined
      }
      onUpdateProduct={handleSaveProduct}
      refreshKey={refreshKey}
    >
      {!isFromShift && (
        <View className="w-full flex-row justify-between gap-4">
          {/* BOTÃO EXCLUIR */}
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
              <Text
                className={
                  isExcludeBlocked ? "text-gray-400" : "text-artesao-main"
                }
              >
                Excluir
              </Text>
            </Button>
          </View>

          {/* BOTÃO EDITAR */}
          <View className="flex-1">
            <Button
              appRole="artesao"
              variant={isEditBlocked ? "ghost" : "default"}
              size="md"
              onPress={() => {
                isEditBlocked
                  ? setOpenUnableToEdit(true)
                  : setIsEditModalVisible(true);
              }}
              disabled={isProcessing}
            >
              <Text className={isEditBlocked ? "text-gray-400" : "text-white"}>
                Editar
              </Text>
            </Button>
          </View>
        </View>
      )}

      {!isFromShift && (
        <>
          <UnableToEditModal
            visible={isOpenUnableToEdit}
            onClose={() => setOpenUnableToEdit(false)}
            productStatus={selectedProduct?.status}
          />
          <ProductModal
            visible={isEditModalVisible}
            onClose={() => setIsEditModalVisible(false)}
            onSave={handleSaveProduct}
            initialData={selectedProduct}
          />
          <DeleteProductModal
            visible={isDeleteProductModalOpen}
            onClose={() => setisDeleteProductModalOpen(false)}
            onConfirm={handleDeleteProduct}
          />
        </>
      )}
    </ProductDetailsTemplate>
  );
};
