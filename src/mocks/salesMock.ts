export interface SaleDiscount {
  label: string;
  amount: number;
}

export interface SoldItem {
  id: string;
  title: string;
  code: string;
  status: string;
  salePrice: number;
  paymentMethod: string;
  discounts: SaleDiscount[];
  netTotal: number;
  date: Date;
}

export interface SalesSummary {
  totalSold: number;
  totalDiscounts: number;
  discountsBreakdown: SaleDiscount[];
  totalToReceive: number;
}

export const MOCK_SOLD_ITEMS: SoldItem[] = [
  {
    id: "1",
    title: "Boneco de Fritz",
    code: "COD-001",
    status: "Vendido",
    salePrice: 50.0,
    date: new Date("2026-09-14T10:00:00"),
    paymentMethod: "Crédito",
    discounts: [
      { label: "Desconto crédito", amount: 1.5 },
      { label: "Repasse Associação", amount: 1.5 },
    ],
    netTotal: 47.0,
  },
];

export const MOCK_SALES_SUMMARY: SalesSummary = {
  totalSold: 50.0,
  totalDiscounts: 3.0,
  discountsBreakdown: [
    { label: "Desconto forma de pagamento", amount: 1.5 },
    { label: "Repasse Associação", amount: 1.5 },
  ],
  totalToReceive: 47.0,
};

export const fetchSalesData = async () => {
  return new Promise<{ summary: SalesSummary; items: SoldItem[] }>(
    (resolve) => {
      setTimeout(() => {
        resolve({ summary: MOCK_SALES_SUMMARY, items: MOCK_SOLD_ITEMS });
      }, 800);
    },
  );
};
