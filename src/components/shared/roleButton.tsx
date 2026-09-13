import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Brush, Folder, ShoppingBasket } from "lucide-react-native";
import { Text, TouchableOpacity } from "react-native";

export type Role = "artesao" | "lojista" | "admin";

interface RoleButtonProps {
  role: Role;
}

const roleConfig = {
  artesao: {
    label: "Artesão",
    icon: Brush,
    colors: ["#15803D", "#14532D"] as const,
    textColor: "#166534",
    route: "/(authenticated)/artesao/",
  },
  lojista: {
    label: "Lojista",
    icon: ShoppingBasket,
    colors: ["#9F1239", "#810F2F"] as const,
    textColor: "#9F1239",
    route: "/(authenticated)/lojista/",
  },
  admin: {
    label: "Admin",
    icon: Folder,
    colors: ["#712B05", "#451A03"] as const,
    textColor: "#712B05",
    route: "/(authenticated)/admin/",
  },
};

export const RoleButton = ({ role }: RoleButtonProps) => {
  const router = useRouter();
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <TouchableOpacity
      className="items-center"
      activeOpacity={0.8}
      onPress={() => router.push(config.route as any)}
    >
      <LinearGradient
        colors={config.colors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          width: 90,
          height: 90,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
        }}
      >
        <Icon size={40} color="#FFFFFF" strokeWidth={1} />
      </LinearGradient>

      <Text
        className="text-center font-poppins-extralight text-[22px] mt-4"
        style={{ color: config.textColor }}
      >
        {config.label}
      </Text>
    </TouchableOpacity>
  );
};
