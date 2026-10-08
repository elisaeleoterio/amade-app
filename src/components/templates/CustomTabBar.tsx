import { roleConfig } from "@/constants/theme";
import { Role } from "@/types/role.type";
import { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import { Home, LogOut, User } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

interface CustomTabBarProps extends BottomTabBarProps {
  onLogoutPress: () => void;
  role: Role;
}

const iconMap: Record<string, any> = {
  index: Home,
  profile: User,
};

export function CustomTabBar({
  state,
  descriptors,
  navigation,
  onLogoutPress,
  role,
}: CustomTabBarProps) {
  const colors = roleConfig[role];

  return (
    <View
      className="absolute bottom-8 left-6 right-6 h-20 flex-row items-center justify-between rounded-full px-10"
      style={{ backgroundColor: colors.surface }}
    >
      {/* 1. Botão de Logout fixo à esquerda */}
      <TouchableOpacity
        onPress={onLogoutPress}
        activeOpacity={0.7}
        className="p-2"
      >
        <LogOut size={24} color={colors.main} strokeWidth={2} />
      </TouchableOpacity>

      {/* 2. Mapeamento das telas reais (Home, Profile, etc) */}
      {state.routes.map((route, index) => {
        if (!iconMap[route.name]) {
          return null;
        }
        const isFocused = state.index === index;
        const strokeWidth = isFocused ? 2.5 : 1.5;

        const Icon = iconMap[route.name] || Home;

        const handlePress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={handlePress}
            activeOpacity={0.7}
            className="p-2"
          >
            <Icon size={24} color={colors.main} strokeWidth={2} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
