import { SharedProductDetails } from "@/components/shared/sharedProductView";
import { useLocalSearchParams } from "expo-router";

export default function ArtesaoProductRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <SharedProductDetails id={id} origin="inventory" />;
}
