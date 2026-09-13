import { LogoutModal } from "@/components/modals/logoutModal";
import { CustomTabBar } from "@/components/templates/CustomTabBar";
import { Tabs, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function LojistaLayout() {
  const router = useRouter();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleConfirmLogout = async () => {
    setLogoutModalVisible(false);
    // Lógica de limpar token
    router.replace("/welcome");
  };

  return (
    <View className="flex-1 bg-white">
      <Tabs
        tabBar={(props) => (
          <CustomTabBar
            {...props}
            role="lojista"
            onLogoutPress={() => setLogoutModalVisible(true)}
          />
        )}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="index" options={{ title: "Início" }} />
        <Tabs.Screen name="profile" options={{ title: "Meu Perfil" }} />
      </Tabs>

      <LogoutModal
        visible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={handleConfirmLogout}
        role={"lojista"}
      />
    </View>
  );
}
