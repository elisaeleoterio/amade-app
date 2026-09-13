export type Role = "artesao" | "lojista" | "admin";

export interface UserProfile {
  id: string;
  name: Record<string, string>;
  email: string;
  roles: Role[];
  avatarUrl?: string;
  phone?: string;
}

export const MOCK_USER_ARTESAO_LOJISTA: UserProfile = {
  id: "usr_123",
  name: {
    first: "Maria",
    second: "das Graças",
  },
  email: "maria.artes@email.com",
  roles: ["artesao", "lojista"],
  phone: "(11) 99999-9999",
  avatarUrl:
    "https://ui-avatars.com/api/?name=Maria+Gracas&background=14532D&color=fff",
};

export const fetchMockProfile = async (
  role: "artesao" | "lojista" | "admin",
): Promise<UserProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USER_ARTESAO_LOJISTA); // Retornaria baseado no role na prática
    }, 1000);
  });
};
