import { StatusInfoModal } from "@/components/modals/statusInfoModal";
import { ProductCard } from "@/components/shared/productCard";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import { fetchMockProducts, Product } from "@/mocks/productMock";
import { useFocusEffect, useRouter } from "expo-router";
import { Info, Search } from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MyInventory() {
  const router = useRouter();
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [activeFilters, setActiveFilters] = useState<string[]>(["Todos"]);

  const filterOptions = [
    "Todos",
    "Cadastrado",
    "Disponível",
    "Vendido",
    "Quitado",
    "Inativo",
  ];

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProducts = async () => {
        try {
          setLoading(true);
          const data = await fetchMockProducts();
          if (isActive) {
            setProducts(data);
          }
        } catch (error) {
          toast.error("Erro ao carregar");
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      loadProducts();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const toggleFilter = (filter: string) => {
    if (filter === "Todos") {
      setActiveFilters(["Todos"]);
      return;
    }

    let newFilters = activeFilters.filter((f) => f !== "Todos");

    if (newFilters.includes(filter)) {
      newFilters = newFilters.filter((f) => f !== filter);
    } else {
      newFilters.push(filter);
    }

    if (newFilters.length === 0) {
      setActiveFilters(["Todos"]);
    } else {
      setActiveFilters(newFilters);
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilters.includes("Todos") || activeFilters.includes(item.status);

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#FDFBF5]">
        <ActivityIndicator size="large" color="#14532D" />
        <Text className="mt-4 font-poppins-regular text-artesao-main">
          Buscando estoque...
        </Text>
      </View>
    );
  }

  return (
    <ScreenTemplate
      navbar={{
        appRole: "artesao",
        title: "Meu Estoque",
        onBackPress: () => router.back(),
      }}
      className="bg-[#FDFBF5]"
    >
      <View className="px-5">
        {/* Barra de Pesquisa */}
        <View className="mt-4 h-12 flex-row items-center rounded-2xl bg-[#E8EFE8] px-4">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Nome do Produto"
            placeholderTextColor="#9CA3AF"
            className="flex-1 font-poppins-regular text-[16px] text-artesao-main py-0"
            style={{
              textAlignVertical: "center",
              includeFontPadding: false,
            }}
          />
          <Search color="#14532D" size={22} strokeWidth={1.5} />
        </View>

        {/* Tags de filtro */}
        <View className="mt-6">
          <View className="mb-3 flex-row items-center justify-between mx-3">
            <Text className="mr-2 font-poppins-medium text-[14px] text-artesao-main">
              Filtro por status
            </Text>
            <Info
              color="#14532D"
              size={20}
              strokeWidth={1.5}
              onPress={() => setInfoModalOpen(true)}
            />
            <StatusInfoModal
              visible={isInfoModalOpen}
              onClose={() => setInfoModalOpen(false)}
            />
          </View>

          <View className="flex-row flex-wrap justify-center gap-2">
            {filterOptions.map((filter) => {
              const isActive = activeFilters.includes(filter);

              return (
                <TouchableOpacity
                  key={filter}
                  activeOpacity={0.7}
                  onPress={() => toggleFilter(filter)}
                  className={`rounded-full border border-artesao-main px-4 py-1.5 ${
                    isActive ? "bg-artesao-main" : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`font-poppins-medium text-[14px] ${
                      isActive ? "text-white" : "text-artesao-main"
                    }`}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View className="mt-6 pb-8 gap-4">
          {filteredProducts.length === 0 ? (
            <Text className="text-center font-poppins-regular text-gray-500 mt-10">
              Nenhum produto encontrado.
            </Text>
          ) : (
            filteredProducts.map((item) => (
              <ProductCard
                key={item.id}
                role="artesao"
                title={item.title}
                code={item.id}
                price={item.price}
                imageUrl={item.imageUrls[0]}
                status={item.status}
                paymentMethod={item.paymentMethod}
                onPress={() => {
                  router.push({
                    pathname: "/(authenticated)/artesao/[id]",
                    params: { id: item.id, origin: "inventory" },
                  });
                }}
              />
            ))
          )}
        </View>
      </View>
    </ScreenTemplate>
  );
}
