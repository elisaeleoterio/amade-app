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
        // Cores do Administrador e Geral
        admin: {
          dark: "#2A0F01", // Marrom bem escuro
          main: "#451A03", // Marrom principal
          light: "#712B05", // Marrom claro
          surface: "#FFFBEB", // Fundo creme
        },
        // Cores do Lojista
        lojista: {
          dark: "#4C0519", // Vinho escuro
          main: "#810F2F", // Vinho principal
          light: "#9F1239", // Rosa/Magenta forte
          surface: "#FFF1F2", // Fundo rosado
        },
        // Cores do Artesão
        artesao: {
          dark: "#14532D", // Verde escuro
          main: "#166534", // Verde principal
          light: "#15803D", // Verde claro
          surface: "#F0FDF4", // Fundo esverdeado
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
