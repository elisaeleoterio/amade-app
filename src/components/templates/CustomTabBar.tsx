import { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import { Home, LogOut, User } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

export type Role = "artesao" | "lojista" | "admin";

interface CustomTabBarProps extends BottomTabBarProps {
  onLogoutPress: () => void;
  role: Role;
}

const roleConfig = {
  artesao: {
    primaryColor: "#14532D",
    tabBackgroundColor: "#E5EFE5",
  },
  lojista: {
    primaryColor: "#9F1239",
    tabBackgroundColor: "#F3E4E5",
  },
  admin: {
    primaryColor: "#712B05",
    tabBackgroundColor: "#E0D1C7",
  },
};

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
  const config = roleConfig[role];

  return (
    <View
      className="absolute bottom-8 left-6 right-6 h-20 flex-row items-center justify-between rounded-full px-10"
      style={{ backgroundColor: config.tabBackgroundColor }}
    >
      {/* 1. Botão de Logout fixo à esquerda */}
      <TouchableOpacity
        onPress={onLogoutPress}
        activeOpacity={0.7}
        className="p-2"
      >
        <LogOut size={24} color={config.primaryColor} strokeWidth={2} />
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
            <Icon size={24} color={config.primaryColor} strokeWidth={2} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
