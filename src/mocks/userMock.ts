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
      resolve(MOCK_USER_ARTESAO_LOJISTA);
    }, 1000);
  });
};

export const updateMockProfileImage = async (
  newAvatarUrl: string,
): Promise<UserProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_USER_ARTESAO_LOJISTA.avatarUrl = newAvatarUrl;
      resolve(MOCK_USER_ARTESAO_LOJISTA);
    }, 800);
  });
};

export const updateMockEmail = async (
  newEmail: string,
): Promise<UserProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_USER_ARTESAO_LOJISTA.email = newEmail;
      resolve(MOCK_USER_ARTESAO_LOJISTA);
    }, 800);
  });
};

export const updateMockPassword = async (
  newPassword: string,
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 800);
  });
};
