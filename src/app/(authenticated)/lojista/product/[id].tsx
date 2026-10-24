import { SharedProductDetails } from "@/components/shared/sharedProductView";
import { useLocalSearchParams } from "expo-router";

export default function LojistaProductRoute() {
  const { id, shiftId, shiftOrigin } = useLocalSearchParams<{
    id: string;
    shiftId?: string;
    shiftOrigin?: string;
  }>();
  return (
    <SharedProductDetails
      id={id}
      origin="shift"
      shiftId={shiftId}
      shiftOrigin={shiftOrigin}
    />
  );
}
