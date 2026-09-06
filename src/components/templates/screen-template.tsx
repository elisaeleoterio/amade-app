import * as React from "react";
import {
    KeyboardAvoidingView,
    KeyboardAvoidingViewProps,
    ScrollView,
    ScrollViewProps,
    View,
    ViewStyle,
} from "react-native";

import { cva, type VariantProps } from "class-variance-authority";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Navbar, NavbarProps } from "@/components/navbar";
import { cn } from "@/lib/utils";

const screenVariants = cva("flex-1", {
  variants: {
    variant: {
      default: "",
      centered: "items-center justify-center",
      scroll: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ScreenTemplateProps extends VariantProps<
  typeof screenVariants
> {
  children: React.ReactNode;
  navbar?: NavbarProps | false | React.ReactNode;
  className?: string;
  contentClassName?: string;
  hideTopSafeArea?: boolean;
  hideBottomSafeArea?: boolean;
  hideSideInsets?: boolean;
  isStatic?: boolean;
  keyboardAvoidingViewEnabled?: boolean;
  keyboardAvoidingViewProps?: Omit<
    KeyboardAvoidingViewProps,
    "style" | "behavior"
  >;
  scrollViewProps?: Omit<
    ScrollViewProps,
    "keyboardShouldPersistTaps" | "contentContainerStyle" | "className"
  >;
  contentContainerStyle?: ScrollViewProps["contentContainerStyle"];
  tabBarHeight?: number;
}

export const ScreenTemplate = ({
  children,
  navbar,
  variant,
  className,
  contentClassName,
  hideTopSafeArea = false,
  hideBottomSafeArea,
  hideSideInsets = false,
  isStatic = false,
  keyboardAvoidingViewEnabled = true,
  keyboardAvoidingViewProps,
  scrollViewProps,
  contentContainerStyle,
  tabBarHeight = 12,
}: ScreenTemplateProps) => {
  const insets = useSafeAreaInsets();
  const shouldHideBottomSafeArea = hideBottomSafeArea;

  const safeAreaStyle: ViewStyle = {
    paddingTop: hideTopSafeArea ? 0 : insets.top,
    paddingBottom: shouldHideBottomSafeArea ? 0 : insets.bottom,
    paddingLeft: hideSideInsets ? 0 : insets.left,
    paddingRight: hideSideInsets ? 0 : insets.right,
  };

  const defaultContentPaddingBottom =
    (shouldHideBottomSafeArea ? 0 : insets.bottom) +
    (insets.bottom + tabBarHeight + 40);

  const resolvedContentContainerStyle = contentContainerStyle ?? {
    flexGrow: 1,
    paddingBottom: defaultContentPaddingBottom,
  };

  const isNavbarProps = (v: unknown): v is NavbarProps =>
    v !== false &&
    v !== null &&
    typeof v === "object" &&
    !React.isValidElement(v);

  const header =
    navbar === false ? null : isNavbarProps(navbar) ? (
      <Navbar {...(navbar as NavbarProps)} />
    ) : React.isValidElement(navbar) ? (
      navbar
    ) : (
      <Navbar />
    );

  const contentClasses = cn(
    "flex-1 px-6",
    screenVariants({ variant }),
    contentClassName,
  );

  const content = isStatic ? (
    <View className={contentClasses}>{children}</View>
  ) : (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={resolvedContentContainerStyle}
      className={contentClasses}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  );

  return (
    <View className={cn("flex-1", className)} style={[safeAreaStyle]}>
      {header}

      {keyboardAvoidingViewEnabled ? (
        <KeyboardAvoidingView
          className="flex-1"
          behavior={"height"}
          {...keyboardAvoidingViewProps}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </View>
  );
};
