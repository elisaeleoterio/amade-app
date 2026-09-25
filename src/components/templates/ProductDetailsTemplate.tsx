import { ScreenTemplate } from "@/components/templates/screen-template";
import { Text } from "@/components/ui/text";
import { fetchMockProducts, Product } from "@/mocks/productMock";
import type { Role } from "@/types/role.type";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { ImageViewerModal } from "../modals/imageViwerModal";
import { toast } from "../ui/sonner";
interface ProductDetailsTemplateProps {
  productId: string;
  role: Role;
  children?: React.ReactNode;
  refreshKey?: number;
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
  refreshKey,
  onUpdateProduct,
}: ProductDetailsTemplateProps & {
  onUpdateProduct?: (p: Product) => void;
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { origin } = useLocalSearchParams<{ origin?: string }>();
  const theme = roleTheme[role];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isViewerVisible, setIsViewerVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProductDetails = async () => {
        try {
          setLoading(true);

          const allProducts = await fetchMockProducts();
          const foundProduct = allProducts.find((p) => p.id === productId);

          if (isActive) {
            setProduct(foundProduct ?? null);
          }
        } catch (error) {
          toast.error("Erro ao carregar os detalhes do produto.");
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      loadProductDetails();

      return () => {
        isActive = false;
      };
    }, [productId, refreshKey]),
  );

  const handleOpenViewer = (url: string) => {
    setSelectedImage(url);
    setIsViewerVisible(true);
  };

  const handleRemoveImageFromViewer = async () => {
    if (!product || !selectedImage) return;

    if (product.imageUrls.length <= 1) {
      toast.warning("O produto precisa ter pelo menos 1 imagem.");
      return;
    }

    const newImageUrls = product.imageUrls.filter(
      (url) => url !== selectedImage,
    );
    const updatedProduct = { ...product, imageUrls: newImageUrls };

    setProduct(updatedProduct);

    if (onUpdateProduct) {
      onUpdateProduct(updatedProduct);
    }
  };
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

  if (loading) {
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

  // NOVA TELA: Se o loading acabou e não achou o produto (ex: foi excluído)
  if (!product) {
    return (
      <View
        className="flex-1 items-center justify-center px-6"
        style={{ backgroundColor: theme.bg }}
      >
        <Text
          className="font-poppins-semibold text-xl text-center mb-2"
          style={{ color: theme.main }}
        >
          Produto não encontrado
        </Text>
        <Text
          className="font-poppins-regular text-[15px] text-center mb-6"
          style={{ color: theme.main }}
        >
          Este produto pode ter sido removido do estoque.
        </Text>
        <TouchableOpacity
          onPress={handleGoBack}
          className="px-6 py-3 rounded-xl"
          style={{ backgroundColor: theme.main }}
        >
          <Text className="font-poppins-medium text-white text-[15px]">
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const inventoryRoutes = {
    artesao: "/(authenticated)/artesao/myInventory",
  } as const;

  const homeRoutes = {
    artesao: "/(authenticated)/artesao",
  } as const;

  const formattedPrice = `R$${product.price.toFixed(2).replace(".", ",")}`;

  return (
    <ScreenTemplate
      navbar={{
        appRole: role,
        title: product.title,
        showBack: true,
        onBackPress: handleGoBack,
      }}
      className="bg-general-bg"
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
              <TouchableOpacity
                key={index}
                activeOpacity={imageUrl ? 0.7 : 1}
                onPress={() => imageUrl && handleOpenViewer(imageUrl)}
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
              </TouchableOpacity>
            );
          })}
        </View>

        <ImageViewerModal
          visible={isViewerVisible}
          imageUrl={selectedImage}
          role={role}
          onClose={() => setIsViewerVisible(false)}
          onRemove={handleRemoveImageFromViewer}
        />

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
