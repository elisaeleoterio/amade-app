import {
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
  XCircle,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { Text } from "./text";

export type ToastType = "default" | "success" | "error" | "info" | "warning";

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

let listeners: ((toasts: ToastProps[]) => void)[] = [];
let toasts: ToastProps[] = [];

export const toast = (
  title: string,
  options?: Omit<ToastProps, "id" | "title" | "type">,
) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast: ToastProps = {
    id,
    title,
    type: "default",
    duration: 4000,
    ...options,
  };

  toasts = [newToast, ...toasts].slice(0, 3);
  listeners.forEach((listener) => listener([...toasts]));

  setTimeout(() => {
    toast.dismiss(id);
  }, newToast.duration);

  return id;
};

toast.success = (title: string, options?: any) =>
  toast(title, { ...options, type: "success" });
toast.error = (title: string, options?: any) =>
  toast(title, { ...options, type: "error" });
toast.info = (title: string, options?: any) =>
  toast(title, { ...options, type: "info" });
toast.warning = (title: string, options?: any) =>
  toast(title, { ...options, type: "warning" });
toast.dismiss = (id: string) => {
  toasts = toasts.filter((t) => t.id !== id);
  listeners.forEach((listener) => listener([...toasts]));
};

export const Toaster = () => {
  const [currentToasts, setCurrentToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    const listener = (newToasts: ToastProps[]) => setCurrentToasts(newToasts);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  if (currentToasts.length === 0) return null;

  const getIcon = (type?: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 color="#16A34A" size={22} />;
      case "error":
        return <XCircle color="#DC2626" size={22} />;
      case "warning":
        return <TriangleAlert color="#D97706" size={22} />;
      case "info":
        return <Info color="#0369A1" size={22} />;
      default:
        return null;
    }
  };

  return (
    <View
      pointerEvents="box-none"
      className="absolute top-14 left-0 right-0 z-50 items-center px-4"
    >
      {currentToasts.map((t) => (
        <Animated.View
          key={t.id}
          pointerEvents="auto"
          entering={FadeIn.duration(400)}
          exiting={FadeOut.duration(300)}
          layout={LinearTransition.duration(300)}
          className="w-full flex-row items-start rounded-2xl border border-gray-200 bg-[#FDFBF5] p-4 mb-3 shadow-lg shadow-black/5"
        >
          {/* Ícone */}
          {t.type !== "default" && (
            <View className="mr-3 mt-0.5">{getIcon(t.type)}</View>
          )}

          {/* Textos */}
          <View className="flex-1 justify-center">
            <Text className="font-poppins-medium text-[15px] text-admin-dark leading-snug">
              {t.title}
            </Text>
            {t.description && (
              <Text className="font-poppins-regular text-[14px] text-admin-main">
                {t.description}
              </Text>
            )}
          </View>

          {/* Botão Fechar */}
          <TouchableOpacity
            onPress={() => toast.dismiss(t.id)}
            className="ml-4 p-1"
          >
            <X color="#9ca3af" size={18} />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};
