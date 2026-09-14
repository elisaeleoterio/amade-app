import { ProductDetailsTemplate } from "@/components/templates/ProductDetailsTemplate";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function ArtesaoProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ProductDetailsTemplate productId={id} role="artesao">
      <View className="flex-row justify-between w-full gap-4">
        <View className="flex-1">
          <Button
            appRole="artesao"
            variant="outline"
            size="md"
            onPress={() => console.log("Excluir", id)}
          >
            <Text className="text-artesao-main">Excluir</Text>
          </Button>
        </View>

        <View className="flex-1">
          <Button
            appRole="artesao"
            variant="default"
            size="md"
            onPress={() => console.log("Editar", id)}
          >
            <Text className="text-white">Editar</Text>
          </Button>
        </View>
      </View>
    </ProductDetailsTemplate>
  );
}
