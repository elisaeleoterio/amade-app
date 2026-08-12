import { Redirect } from "expo-router";

// import { useUserStore } from '@/stores/user.store';

// TODO Tela redireciona de acordo com a autenticação do usuário

const Index = () => {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Redirect href="/auth/welcome" />;
  }
  return <Redirect href="/auth/welcome" />;
};

export default Index;
