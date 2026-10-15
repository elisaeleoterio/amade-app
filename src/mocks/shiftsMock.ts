export interface Shift {
  id: string;
  pieces: number;
  date: Date;
  startTime: string;
  totalValue: number;
  productIds: string[];
}

export const MOCK_SHIFT: Shift[] = [
  {
    id: "TRN-001",
    pieces: 2,
    date: new Date("2026-07-22T12:00:00"),
    startTime: "09:00",
    totalValue: 1950.0,
    productIds: ["COD-001", "COD-002"],
  },
  {
    id: "TRN-002",
    pieces: 1,
    date: new Date("2026-07-21T12:00:00"),
    startTime: "14:00",
    totalValue: 85.5,
    productIds: ["COD-003"],
  },
  {
    id: "TRN-003",
    pieces: 1,
    date: new Date("2026-07-20T12:00:00"),
    startTime: "08:00",
    totalValue: 85.5,
    productIds: ["COD-004"],
  },
  {
    id: "TRN-004",
    pieces: 1,
    date: new Date("2026-07-21T12:00:00"),
    startTime: "18:00",
    totalValue: 85.5,
    productIds: ["COD-003"],
  },
  {
    id: "TRN-005",
    pieces: 1,
    date: new Date("2026-07-20T12:00:00"),
    startTime: "14:00",
    totalValue: 85.5,
    productIds: ["COD-004"],
  },
];

// SIMULAÇÃO DE GET
export const fetchMockShifts = async (): Promise<Shift[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_SHIFT]);
    }, 500);
  });
};
