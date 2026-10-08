import "@/global.css";
import { Platform } from "react-native";

export const roleConfig = {
  artesao: {
    extraDark: "#0C331C",
    dark: "#14532D", // Verde escuro
    main: "#166534", // Verde principal
    light: "#15803D", // Verde claro
    surface: "#E5EFE5", // Fundo esverdeado
    bg: "#FDFBF5",
  },
  lojista: {
    extraDark: "#361A22", // Midnight Violet
    dark: "#4C0519", // Vinho escuro
    wine: "#810F2F", // Vinho principal
    main: "#9F1239", // Rosa/Magenta forte
    surface: "#E9CCD2", // Ghost rosado
    bg: "#FDF7F8",
  },
  admin: {
    extraDark: "#38241A", // Dark Coffee
    dark: "#2A0F01", // Marrom bem escuro
    lighter: "#451A03", // Marrom levemente mais escuro
    main: "#712B05", // Marrom principal
    surface: "#E0D1C7", // Marrom bem claro (Tab e Ghost)
    bg: "#FCF9F7",
  },
} as const;

export const Fonts = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
