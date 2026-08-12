/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        general: {
          bg: "#FFFBEB", // Fundo creme
        },
        // Cores do Administrador e Geral
        admin: {
          dark: "#2A0F01", // Marrom bem escuro
          lighter: "#451A03", // Marrom levemente mais escuro
          main: "#712B05", // Marrom principal
          surface: "#E0D1C7", // Marrom bem claro (Tab e Ghost)
        },
        // Cores do Lojista
        lojista: {
          dark: "#4C0519", // Vinho escuro
          wine: "#810F2F", // Vinho principal
          main: "#9F1239", // Rosa/Magenta forte
          surface: "#E9CCD2", // Ghost rosado
        },
        // Cores do Artesão
        artesao: {
          dark: "#14532D", // Verde escuro
          main: "#166534", // Verde principal
          light: "#15803D", // Verde claro
          surface: "#E5EFE5", // Fundo esverdeado
        },
        // Cores de Feedback (Toasters)
        toaster: {
          info: "#0369A1", // Azul
          warning: "#D97706", // Laranja
          success: "#16A34A", // Verde
          error: "#DC2626", // Vermelho
        },
        // Cores neutras extras para inputs e backgrounds
        neutral: {
          input: "#F1F1F1", // Fundo do placeholder
          border: "#D1D1D1", // Borda do input inativo
        },
      },
      fontFamily: {
        "poppins-extralight": ["Poppins-ExtraLight"],
        "poppins-light": ["Poppins-Light"],
        "poppins-regular": ["Poppins-Regular"],
        "poppins-medium": ["Poppins-Medium"],
        "poppins-semibold": ["Poppins-SemiBold"],
        "poppins-bold": ["Poppins-Bold"],
      },
    },
  },
  plugins: [],
};
