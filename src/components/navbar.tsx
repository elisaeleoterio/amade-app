import * as React from "react";
import { Pressable, View } from "react-native";

import { cva, type VariantProps } from "class-variance-authority";
import { router } from "expo-router";
import { ChevronLeft, UserRoundArrowLeft } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const navbarVariants = cva(
  "min-h-16 w-full flex-row items-center bg-[#FDFBF5] justify-between px-4",
  {
    variants: {
      variant: {
        default: "",
        home: "",
      },
      size: {
        default: "py-3",
        sm: "py-2",
        lg: "py-4",
      },
      shadow: {
        default: "",
        none: "shadow-none elevation-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shadow: "default",
    },
  },
);

export type AppRole = "admin" | "artesao" | "lojista";

const roleTextColors: Record<AppRole, string> = {
  admin: "text-admin-main",
  artesao: "text-artesao-main",
  lojista: "text-lojista-main",
};

const roleHexColors: Record<AppRole, string> = {
  admin: "#712B05",
  artesao: "#166534",
  lojista: "#9F1239",
};

export type NavbarProps = VariantProps<typeof navbarVariants> & {
  title?: string;
  titleClassName?: string;
  titleVariant?: React.ComponentProps<typeof Text>["variant"];
  showBack?: boolean;
  centerContent?: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  textStyle?: string;
  onLeftPress?: () => void;
  onBackPress?: () => void;
  appRole?: AppRole;
};

export const Navbar = ({
  variant = "default",
  size = "default",
  shadow = "default",
  title,
  titleClassName,
  titleVariant = "screenTitle",
  showBack,
  leftContent,
  rightContent,
  centerContent,
  textStyle,
  onLeftPress,
  onBackPress,
  appRole = "admin",
}: NavbarProps) => {
  const insets = useSafeAreaInsets();
  let canGoBack = false;
  try {
    canGoBack = router.canGoBack();
  } catch (error) {
    canGoBack = false;
  }

  const activeRoleColor = roleTextColors[appRole];
  const activeHexColor = roleHexColors[appRole];

  const iconColor = variant === "home" ? "#737373" : activeHexColor;

  const handleBack = () => {
    if (onLeftPress) return onLeftPress();
    if (onBackPress) return onBackPress();
    if (canGoBack) router.back();
  };

  return (
    // Adicionamos a sombra e a elevação aqui no container pai para que ela se projete abaixo da navbar inteira
    <View
      className={cn(
        "z-10 bg-[#FDFBF5]",
        shadow !== "none" && "shadow-sm shadow-black/10 elevation-4",
      )}
    >
      {shadow !== "none" && (
        <View
          className="absolute left-0 right-0 z-[20]"
          style={{
            top: -insets.top,
            height: insets.top,
            backgroundColor: "#FDFBF5",
          }}
        />
      )}

      <View className={cn(navbarVariants({ variant, size, shadow }))}>
        <View className="mx-4 min-w-[48px] items-start justify-center">
          {leftContent ? (
            leftContent
          ) : variant === "home" ? (
            <Pressable
              onPress={
                onLeftPress ||
                (() => router.push("./src/app/(authenticated)/roleSelect"))
              }
            >
              <UserRoundArrowLeft size={24} color={iconColor} />
            </Pressable>
          ) : (showBack ?? canGoBack) ? (
            <Pressable onPress={handleBack}>
              <ChevronLeft size={24} color={iconColor} />
            </Pressable>
          ) : null}
        </View>

        <View className="flex-1 items-center justify-center py-2">
          {centerContent ??
            (title && (
              <Text
                variant={titleVariant}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                className={cn(
                  activeRoleColor,
                  "font-poppins-medium text-xl",
                  titleClassName,
                )}
              >
                {title}
              </Text>
            ))}
        </View>

        <View className="mx-4 min-w-[48px] items-end justify-center">
          {rightContent}
        </View>
      </View>
    </View>
  );
};
