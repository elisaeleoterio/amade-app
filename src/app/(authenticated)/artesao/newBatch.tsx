import { ProductModal } from "@/components/artesao/modals/ProductModal";
import { RemoveProductBatchtModal } from "@/components/artesao/modals/removeProductsBtach";
import { ProductCard } from "@/components/shared/productCard";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import { createMockProduct, Product } from "@/mocks/productMock";
import { useRouter } from "expo-router";
import { CirclePlus } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function NewBatchScreen() {
  const router = useRouter();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRemoveProductsOpen, setIsRemoveProductsOpen] = useState(false);
  const [batchProducts, setBatchProducts] = useState<Product[]>([]);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleAddProductToBatch = (newProduct: Product) => {
    setBatchProducts((prev) => [newProduct, ...prev]);
    setIsCreateModalVisible(false);
    toast.success("Produto adicionado ao lote.");
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const clearSelected = () => {
    setSelectedIds(new Set());
  };

  const handleRemoveSelected = () => {
    if (selectedIds.size === 0) return;
    setBatchProducts((prev) => prev.filter((p) => !selectedIds.has(p.id)));
    setSelectedIds(new Set());
  };

  const handleSaveBatch = async () => {
    if (batchProducts.length === 0) return;

    try {
      setIsProcessing(true);

      for (const product of batchProducts) {
        await createMockProduct(product);
      }

      toast.success("Lote salvo com sucesso!", {
        description: `${batchProducts.length} produtos foram adicionados ao estoque.`,
      });

      setBatchProducts([]);
      setSelectedIds(new Set());
      router.replace("/(authenticated)/artesao/myInventory");
    } catch (error) {
      toast.error("Erro ao salvar lote", {
        description: "Não foi possível finalizar o cadastro dos produtos.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ScreenTemplate
      navbar={{
        appRole: "artesao",
        title: "Novo Lote",
        showBack: true,
      }}
      className="bg-general-bg"
    >
      <View className="flex-1 px-5 pt-2">
        {/* Botão de Adicionar ao Lote */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsCreateModalVisible(true)}
          className="flex-row items-center justify-between py-4 border-b border-[#E8EFE8]"
        >
          <Text className="font-poppins-regular text-[17px] text-artesao-main">
            Adicionar Novo Produto
          </Text>
          <CirclePlus size={24} color="#14532D" strokeWidth={1.5} />
        </TouchableOpacity>

        {/* Listagem ou Empty State */}
        {batchProducts.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-center font-poppins-medium text-xl text-artesao-main px-8 leading-snug">
              Seu lote está vazio por enquanto! Adicione produtos para cadastrar
              no sistema.
            </Text>
          </View>
        ) : (
          <ScrollView
            className="flex-1 mt-6"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {batchProducts.map((item) => {
              const isSelected = selectedIds.has(item.id);

              return (
                <View key={item.id} className="relative mb-4">
                  <ProductCard
                    role="artesao"
                    title={item.title}
                    code={item.id}
                    price={item.price}
                    imageUrl={item.imageUrls[0]}
                    status={item.status}
                    paymentMethod={item.paymentMethod}
                    onPress={() => toggleSelection(item.id)}
                  />

                  {isSelected && (
                    <View
                      pointerEvents="none"
                      className="absolute inset-0 z-10 rounded-3xl border-[2px] border-artesao-main bg-artesao-main/5 p-4 items-end"
                    ></View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        )}

        {/* Rodapé Fixo com Botões Condicionais */}
        {batchProducts.length > 0 &&
          (selectedIds.size > 0 ? (
            <View className="flex-row justify-between gap-4 py-4 bg-general-bg border-t border-[#E8EFE8]">
              <View className="flex-1">
                <Button
                  appRole="artesao"
                  variant="default"
                  size="md"
                  className="bg-toaster-success"

                  onPress={clearSelected}
                >
                  <Text className="">Desmarcar</Text>
                </Button>
              </View>
              <View className="flex-1">
                <Button
                  appRole="artesao"
                  variant="default"
                  size="md"
                  className="bg-toaster-error"

                  onPress={() => setIsRemoveProductsOpen(true)}
                >
                  <Text>{isProcessing ? "Removendo..." : "Remover"}</Text>
                </Button>

                <RemoveProductBatchtModal
                  visible={isRemoveProductsOpen}
                  onClose={() => setIsRemoveProductsOpen(false)}
                  onConfirm={handleRemoveSelected}
                />
              </View>
            </View>
          ) : (
            <View className="flex-row justify-between gap-4 py-4 bg-general-bg border-t border-[#E8EFE8]">
              <View className="flex-1">
                <Button
                  appRole="artesao"
                  variant="outline"
                  size="md"
                  onPress={() => router.back()}
                  disabled={isProcessing}
                >
                  <Text>Cancelar</Text>
                </Button>
              </View>
              <View className="flex-1">
                <Button
                  appRole="artesao"
                  variant="default"
                  size="md"
                  onPress={handleSaveBatch}
                  disabled={isProcessing}
                >
                  <Text>{isProcessing ? "Salvando..." : "Salvar Lote"}</Text>
                </Button>
              </View>
            </View>
          ))}
      </View>

      <ProductModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onSave={handleAddProductToBatch}
        initialData={null}
      />
    </ScreenTemplate>
  );
}
