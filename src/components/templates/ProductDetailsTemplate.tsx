import { ScreenTemplate } from "@/components/templates/screen-template";
import { Text } from "@/components/ui/text";
import { fetchMockProducts, Product } from "@/mocks/productMock";
import type { Role } from "@/types/role.type";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";

interface ProductDetailsTemplateProps {
  productId: string;
  role: Role;
  children?: React.ReactNode; // Recebe os botões específicos de cada Role
}

const roleTheme = {
  artesao: {
    main: "#14532D",
    bg: "#FDFBF5",
    line: "#E8EFE8",
  },
  lojista: {
    main: "#9F1239",
    bg: "#FDF7F8",
    line: "#F3E4E5",
  },
  admin: {
    main: "#712B05",
    bg: "#FCF9F7",
    line: "#E0D1C7",
  },
};
export const ProductDetailsTemplate = ({
  productId,
  role,
  children,
}: ProductDetailsTemplateProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { origin } = useLocalSearchParams<{ origin?: string }>();
  const theme = roleTheme[role];

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchMockProducts();
        const foundProduct = allProducts.find((p) => p.id === productId);
        if (foundProduct) setProduct(foundProduct);
      } catch (error) {
        console.error("Erro ao carregar os detalhes", error);
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [productId]);

  if (loading || !product) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: theme.bg }}
      >
        <ActivityIndicator size="large" color={theme.main} />
        <Text
          className="mt-4 font-poppins-regular"
          style={{ color: theme.main }}
        >
          Carregando produto...
        </Text>
      </View>
    );
  }

  const inventoryRoutes = {
    artesao: "/(authenticated)/artesao/myInventory",
  } as const;

  const homeRoutes = {
    artesao: "/(authenticated)/artesao",
  } as const;

  const handleGoBack = () => {
    if (origin === "inventory") {
      const inventoryRoute =
        inventoryRoutes[role as keyof typeof inventoryRoutes];
      if (inventoryRoute) {
        router.push(inventoryRoute);
        return;
      }
    } else if (origin === "home") {
      const homeRoute = homeRoutes[role as keyof typeof homeRoutes];
      if (homeRoute) {
        router.push(homeRoute);
        return;
      }
    }

    router.back();
  };

  const formattedPrice = `R$${product.price.toFixed(2).replace(".", ",")}`;

  return (
    <ScreenTemplate
      navbar={{
        appRole: role,
        title: product.title,
        showBack: true,
        onBackPress: handleGoBack,
      }}
      className="bg-[#FDFBF5]"
    >
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Linha Divisória Superior */}
        <View
          className="h-[1px] w-full mb-5 mt-2"
          style={{ backgroundColor: theme.line }}
        />

        {/* Tag de Status / Pagamento */}
        <View
          className="self-start rounded-full px-4 py-1.5 mb-6"
          style={{ backgroundColor: theme.line }}
        >
          <Text
            className="font-poppins-medium text-[14px]"
            style={{ color: theme.main }}
          >
            {role === "lojista" ? product.paymentMethod : product.status}
          </Text>
        </View>

        {/* Galeria de Imagens */}
        <View className="flex-row justify-between mb-8 gap-3">
          {[0, 1, 2].map((index) => {
            const imageUrl = product.imageUrls[index];
            return (
              <View
                key={index}
                className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden"
                style={{ backgroundColor: theme.line }}
              >
                {imageUrl && (
                  <Image
                    source={{ uri: imageUrl }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                )}
              </View>
            );
          })}
        </View>

        {/* Linha Divisória */}
        <View
          className="h-[1px] w-full mb-5"
          style={{ backgroundColor: theme.line }}
        />

        {/* Informações Básicas */}
        <Text
          className="font-poppins-regular text-[20px] mb-2"
          style={{ color: theme.main }}
        >
          <Text className="font-poppins-semibold">Código Único: </Text>
          {product.id}
        </Text>
        <Text
          className="font-poppins-medium text-xl mb-2"
          style={{ color: theme.main }}
        >
          {formattedPrice}
        </Text>

        {/* Descrição Geral */}
        <Text
          className="font-poppins-medium text-[16px] mb-2"
          style={{ color: theme.main }}
        >
          Descrição Geral:
        </Text>
        <View
          className="w-full min-h-[140px] rounded-2xl border-[1.5px] p-4 mb-8"
          style={{ borderColor: theme.line, backgroundColor: theme.bg }}
        >
          <Text
            className="font-poppins-regular text-[15px] leading-relaxed"
            style={{ color: theme.main }}
          >
            {product.description}
          </Text>
        </View>

        {/* Linha Divisória Inferior */}
        <View
          className="h-[1px] w-full mb-6"
          style={{ backgroundColor: theme.line }}
        />

        {/* Área Flexível para Injetar Botões */}
        <View className="w-full">{children}</View>
      </ScrollView>
    </ScreenTemplate>
  );
};
