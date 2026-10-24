import { ProductCard } from "@/components/shared/productCard";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { toast } from "@/components/ui/sonner";
import { Text } from "@/components/ui/text";
import { roleConfig } from "@/constants/theme";
import { fetchMockProducts, Product } from "@/mocks/productMock";
import { fetchMockShifts, Shift } from "@/mocks/shiftsMock";
import { Role } from "@/types/role.type";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { Printer } from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const PAYMENT_FILTERS = ["Todos", "Crédito", "Dinheiro", "Débito", "PIX"];

export default function ShiftDetailsScreen() {
  const role: Role = "lojista";
  const colors = roleConfig[role];

  const { id, origin } = useLocalSearchParams<{
    id: string;
    origin?: string;
  }>();
  const router = useRouter();

  const [shift, setShift] = useState<Shift | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const [paymentFilter, setPaymentFilter] = useState<string[]>(["Todos"]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadShiftData = async () => {
        try {
          setLoading(true);
          const [allShifts, allProducts] = await Promise.all([
            fetchMockShifts(),
            fetchMockProducts(),
          ]);

          if (isActive) {
            const currentShift = allShifts.find((s) => s.id === id);

            if (currentShift) {
              setShift(currentShift);

              const shiftProducts = allProducts.filter((p) =>
                currentShift.productIds.includes(p.id),
              );
              setProducts(shiftProducts);
            }
          }
        } catch (error) {
          toast.error("Erro ao carregar dados do turno");
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      loadShiftData();

      return () => {
        isActive = false;
      };
    }, [id, refreshKey]),
  );

  const togglePaymentFilter = (filter: string) => {
    if (filter === "Todos") {
      setPaymentFilter(["Todos"]);
      return;
    }

    setPaymentFilter((prev) => {
      const currentFilters = prev.filter((f) => f !== "Todos");

      if (currentFilters.includes(filter)) {
        const newFilters = currentFilters.filter((f) => f !== filter);
        return newFilters.length === 0 ? ["Todos"] : newFilters;
      } else {
        return [...currentFilters, filter];
      }
    });
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-general-bg">
        <ActivityIndicator size="large" color={colors.main} />
        <Text className="mt-4 font-poppins-regular text-lojista-main">
          Carregando turno...
        </Text>
      </View>
    );
  }

  if (!shift) {
    return (
      <View className="flex-1 items-center justify-center bg-general-bg">
        <Text className="font-poppins-medium text-lg text-lojista-main">
          Turno não encontrado.
        </Text>
      </View>
    );
  }

  const exibitedProducts = products.filter((p) => {
    if (paymentFilter.includes("Todos")) return true;

    const method = p.paymentMethod?.toLowerCase() || "";
    return paymentFilter.some((filter) =>
      method.includes(filter.toLowerCase()),
    );
  });

  const headerDate = shift.date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <ScreenTemplate
      isStatic
      navbar={{
        appRole: role,
        title: `Turno ${headerDate}`,
        onBackPress: () =>
          router.replace(
            origin === "myShifts"
              ? "/(authenticated)/lojista/myShifts"
              : "/(authenticated)/lojista",
          ),
      }}
      className="bg-general-bg"
      contentClassName="flex-1"
    >
      <View className="flex-1 px-5 pt-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-poppins-regular text-xl text-lojista-dark">
            Produtos Vendidos
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log("Imprimir relatório")}
          >
            <Printer size={28} color={colors.main} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        <Text className="font-poppins-regular text-md text-lojista-main mb-3">
          Filtro por forma de pagamento
        </Text>

        {/* Scroll Horizontal de Filtros */}
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6 flex-row max-h-10"
            contentContainerStyle={{ gap: 8, paddingRight: 20 }}
          >
            {PAYMENT_FILTERS.map((filter) => {
              const isActive = paymentFilter.includes(filter);
              return (
                <TouchableOpacity
                  key={filter}
                  onPress={() => togglePaymentFilter(filter)}
                  activeOpacity={0.7}
                  className={`rounded-full border-2 border-lojista-main px-4 justify-center ${
                    isActive ? "bg-lojista-main" : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`font-poppins-semibold text-md self-center -bottom-0 ${
                      isActive ? "text-white" : "text-lojista-main"
                    }`}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Lista de Produtos */}
        <View className="flex-1 pb-6 z-0">
          <FlatList
            data={exibitedProducts}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40, gap: 16 }}
            ListEmptyComponent={
              <Text className="text-center font-poppins-regular text-gray-500 mt-10">
                Nenhum produto encontrado com este método de pagamento.
              </Text>
            }
            renderItem={({ item }) => (
              <ProductCard
                role="lojista"
                title={item.title}
                code={item.id}
                price={item.price}
                imageUrl={item.imageUrls[0]}
                status={item.status}
                paymentMethod={item.paymentMethod}
                onPress={() => {
                  router.push({
                    pathname: "/(authenticated)/lojista/product/[id]",
                    params: {
                      id: item.id,
                      shiftId: shift.id,
                      shiftOrigin: origin,
                    },
                  });
                }}
              />
            )}
          />
        </View>
      </View>
    </ScreenTemplate>
  );
}
