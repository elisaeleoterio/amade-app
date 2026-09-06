import * as React from "react";
import { Pressable, View } from "react-native";

import { cva, type VariantProps } from "class-variance-authority";
import { router, useNavigation } from "expo-router";
import { ChevronLeft, UserRoundArrowLeft } from "lucide-react-native";

import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import { Text } from "./ui/text";

const navbarVariants = cva(
  "min-h-16 w-full flex-row items-center justify-between px-4",
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
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shadow: "default",
    },
  },
);

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
}: NavbarProps) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const iconColor = variant === "home" ? "text-neutral-500" : "text-primary";

  const handleBack = () => {
    if (onLeftPress) return onLeftPress();
    if (onBackPress) return onBackPress();
    if (canGoBack) navigation.goBack();
  };

  return (
    <View className="z-10">
      {shadow !== "none" && (
        <View className="absolute -top-[20px] left-0 right-0 z-[20] h-[20px] bg-background" />
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
              <Icon as={UserRoundArrowLeft} size={24} className={iconColor} />
            </Pressable>
          ) : (showBack ?? canGoBack) ? (
            <Pressable onPress={handleBack}>
              <Icon as={ChevronLeft} size={24} className={iconColor} />
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
                className={cn("text-primary", titleClassName)}
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
