# AMADE App

App de gestão de estoque e vendas da Associação de Artesãos em Madeira, feito com [Expo](https://expo.dev).

> 📖 Guia completo de desenvolvimento (pacotes instalados, comandos, como rebuildar o dev client): [`docs/DESENVOLVIMENTO.md`](./docs/DESENVOLVIMENTO.md)

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   Este projeto usa módulos nativos que **não funcionam no app Expo Go**. É preciso abrir com um [development build](https://docs.expo.dev/develop/development-builds/introduction/) próprio (ver `docs/DESENVOLVIMENTO.md`):

   ```bash
   npx expo start --dev-client
   ```

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation (versão SDK 57)](https://docs.expo.dev/versions/v57.0.0/): sempre usar a doc versionada, não a "latest" — várias APIs mudaram.
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
