import { Redirect } from "expo-router";

// import { useUserStore } from '@/stores/user.store';

// TODO Tela redireciona de acordo com a autenticação do usuário

const Index = () => {
  const isAuthenticated = true;

  if (isAuthenticated) {
    return <Redirect href="/(authenticated)/roleSelect" />;
  }
  return <Redirect href="/(public)/welcome" />;
};

export default Index;
