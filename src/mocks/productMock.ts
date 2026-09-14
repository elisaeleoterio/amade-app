export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  status: "Cadastrado" | "Disponível" | "Vendido" | "Quitado" | "Indisponível";
  paymentMethod?: "PIX" | "Cartão de Crédito" | "Dinheiro" | "Boleto";
  imageUrls: string[];
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "COD-001",
    title: "Boneco de Fritz",
    description:
      "Boneco tradicional alemão esculpido à mão em madeira de reflorestamento, com detalhes em pintura acrílica.",
    price: 700.0,
    status: "Disponível",
    paymentMethod: "PIX",
    imageUrls: [
      "https://images.unsplash.com/photo-1588058365548-9efe5acb8077?auto=format&fit=crop&q=80&w=300", // Imagem principal (Capa)
      "https://images.unsplash.com/photo-1588058365548-9efe5acb8077?auto=format&fit=crop&q=80&w=400", // Imagem 2 (Detalhes)
      "https://images.unsplash.com/photo-1588058365548-9efe5acb8077?auto=format&fit=crop&q=80&w=500", // Imagem 3 (Costas)
    ],
  },
  {
    id: "COD-002",
    title: "Relógio de Cuco",
    description: "Relógio de cuco mecânico adaptado com marchetaria local.",
    price: 1250.0,
    status: "Vendido",
    paymentMethod: "Cartão de Crédito",
    imageUrls: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzv6Tv5EOJQkx1qxAIOTDUzf6rhPQ6_CxcR2FwYj2THC6DeSx9sJ5BeAYI&s=10",
      "https://images.unsplash.com/photo-1583344658145-8c0c92bb943d?auto=format&fit=crop&q=80&w=400",
    ],
  },
  {
    id: "COD-003",
    title: "Caneca de Chopp",
    description:
      "Caneca rústica tratada com cera de abelha, ideal para decoração ou uso.",
    price: 85.5,
    status: "Cadastrado",
    imageUrls: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg_t0kPewVq2TAfC76rO5MOZYoAo53R2M23LmPlRPH_C3Zlg4IflFyrGA-&s=10",
    ],
  },
];

export const fetchMockProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS);
    }, 0);
  });
};
