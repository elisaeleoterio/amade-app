import { Product } from "@/mocks/productMock";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

// A chave (nome do arquivo) onde vamos salvar os dados no celular
const SHIFT_STORAGE_KEY = "@amade_current_shift";

export type CartItem = {
  product: Product;
  paymentMethod: string;
  hasDiscount: boolean;
  discountType: "percentage" | "value";
  discountValue: number;
  finalPrice: number;
};

export type Sale = {
  id: string;
  time: string;
  items: CartItem[];
  total: number;
};

interface ShiftContextData {
  isShiftActive: boolean;
  startShift: (date: string, time: string) => void;
  closeShift: () => void;
  cancelShift: () => Promise<void>;
  sales: Sale[];
  addSaleToShift: (sale: Sale) => void;
  currentCart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
}

const ShiftContext = createContext<ShiftContextData>({} as ShiftContextData);

export const ShiftProvider = ({ children }: { children: React.ReactNode }) => {
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [sales, setSales] = useState<Sale[]>([]);
  const [currentCart, setCurrentCart] = useState<CartItem[]>([]);

  const [isHydrated, setIsHydrated] = useState(false);

  // 1. LER DADOS AO ABRIR O APP
  useEffect(() => {
    const loadSavedShift = async () => {
      try {
        const storedData = await AsyncStorage.getItem(SHIFT_STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setIsShiftActive(parsedData.isShiftActive || false);
          setSales(parsedData.sales || []);
          setCurrentCart(parsedData.currentCart || []);
        }
      } catch (error) {
        console.error("Erro ao carregar turno do disco:", error);
      } finally {
        setIsHydrated(true); // Avisa que terminou de ler
      }
    };

    loadSavedShift();
  }, []); // O array vazio garante que isso rode apenas 1 vez quando o app abre

  // 2. SALVAR DADOS SEMPRE QUE HOUVER MUDANÇA
  useEffect(() => {
    // Evita que ele salve o estado inicial vazio ANTES de terminar de ler o disco
    if (!isHydrated) return;

    const saveShiftData = async () => {
      try {
        const dataToSave = JSON.stringify({
          isShiftActive,
          sales,
          currentCart,
        });
        await AsyncStorage.setItem(SHIFT_STORAGE_KEY, dataToSave);
      } catch (error) {
        console.error("Erro ao salvar turno no disco:", error);
      }
    };

    saveShiftData();
  }, [isShiftActive, sales, currentCart, isHydrated]); // Sempre que uma dessas variáveis mudar, o useEffect é disparado

  const startShift = () => setIsShiftActive(true);

  const closeShift = () => {
    setIsShiftActive(false);
    setSales([]);
    setCurrentCart([]);
    // Quando fechar o turno, podemos limpar o disco rígido também (opcional)
    AsyncStorage.removeItem(SHIFT_STORAGE_KEY);
  };

  const cancelShift = async () => {
    // Limpa a memória (Context)
    setIsShiftActive(false);
    setSales([]);
    setCurrentCart([]);

    // Limpa o disco rígido (AsyncStorage)
    try {
      await AsyncStorage.removeItem(SHIFT_STORAGE_KEY);
    } catch (error) {
      console.error("Erro ao limpar dados do turno cancelado:", error);
    }
  };

  const addToCart = (item: CartItem) =>
    setCurrentCart((prev) => [...prev, item]);

  const removeFromCart = (id: string) =>
    setCurrentCart((prev) => prev.filter((item) => item.product.id !== id));

  const updateCartItem = (id: string, updates: Partial<CartItem>) => {
    setCurrentCart((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, ...updates } : item,
      ),
    );
  };

  const clearCart = () => setCurrentCart([]);

  const addSaleToShift = (sale: Sale) => setSales((prev) => [...prev, sale]);

  // Se os dados ainda não foram carregados, não renderiza as telas do app para evitar que o usuário veja a tela piscar
  if (!isHydrated) {
    return null; // Aqui você pode retornar um ActivityIndicator (carregamento) se quiser
  }

  return (
    <ShiftContext.Provider
      value={{
        isShiftActive,
        startShift,
        closeShift,
        cancelShift,
        sales,
        addSaleToShift,
        currentCart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </ShiftContext.Provider>
  );
};

export const useShift = () => useContext(ShiftContext);
