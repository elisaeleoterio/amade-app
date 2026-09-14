import AmadeLogo from "@/assets/logoComplete.svg";
import { ProductCard } from "@/components/shared/productCard";
import { RedirectCard } from "@/components/shared/redirectCard";
import { ScreenTemplate } from "@/components/templates/screen-template";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { fetchMockProducts, Product } from "@/mocks/productMock";
import { MOCK_USER_ARTESAO_LOJISTA, UserProfile } from "@/mocks/userMock";
import { useRouter } from "expo-router";
import { CirclePlus, ShoppingCart } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function WelcomeScreen() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchMockProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setUser(MOCK_USER_ARTESAO_LOJISTA);
  }, []);

  if (!user) return null;
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#14532D" />
        <Text className="mt-4 font-poppins-regular">Buscando estoque...</Text>
      </View>
    );
  }

  const router = useRouter();
  return (
    <ScreenTemplate
      navbar={{
        showBack: false,
        appRole: "artesao",
        rightContent: (
          <View className="">
            <AmadeLogo color="#166534" width={50} height={45} />
          </View>
        ),
        leftContent: (
          <Text className="font-poppins-medium text-artesao-main text-lg">
            Olá, {user.name.first}!
          </Text>
        ),
      }}
      className="bg-[#FDFBF5]"
    >
      {/* Meu Estoque */}
      <View className="flex-1 bg-[#E5EFE5]/40 p-5 rounded-3xl mb-4">
        <Text className="font-poppins-medium text-artesao-main text-left text-xl mb-3">
          Meu Estoque
        </Text>
        {products.slice(0, 3).map((item) => (
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
                params: { id: item.id, origin: "home" },
              });
            }}
          />
        ))}
        <Button
          appRole="artesao"
          variant="secondary"
          onPress={() => router.push("/(authenticated)/artesao/myInventory")}
        >
          <Text className="font-poppins-semibold text-artesao-main">
            Ver Mais
          </Text>
        </Button>
      </View>
      {/* Cards de Redirecionamento */}
      <View className="">
        <RedirectCard
          title="Cadastrar Produtos"
          description="Adicionar novos produtos ao meu estoque."
          icon={CirclePlus}
          route="/(authenticated)/artesao/newBatch"
          role="artesao"
        />
        <RedirectCard
          title="Ver Vendas"
          description="Analisar vendas dos meus produtos."
          icon={ShoppingCart}
          route="/(authenticated)/artesao/mySales"
          role="artesao"
        />
      </View>
    </ScreenTemplate>
  );
}
