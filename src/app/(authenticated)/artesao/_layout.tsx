import { CustomTabBar } from "@/components/templates/CustomTabBar";
import { Tabs, useRouter } from "expo-router";
import { View } from "react-native";

export default function ArtesaoLayout() {
  const router = useRouter();

  const handleConfirmLogout = async () => {
    // Lógica de limpar token
    router.replace("/welcome");
  };

  return (
    <View className="flex-1 bg-general-bg">
      <Tabs
        tabBar={(props) => (
          <CustomTabBar
            {...props}
            role="artesao"
            onLogoutPress={() => router.replace("/(authenticated)/roleSelect")}
          />
        )}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="index" options={{ title: "Início" }} />
        <Tabs.Screen name="profile" options={{ title: "Meu Perfil" }} />
      </Tabs>
    </View>
  );
}
