# Guia de desenvolvimento — AMADE App

Documento de referência pessoal: o que foi instalado, por quê, e como rodar/rebuildar o projeto. Atualize conforme for adicionando coisas novas.

## 1. Stack do projeto

| Peça | O que é | Versão |
|---|---|---|
| Expo SDK | Framework base (build, dev server, módulos nativos) | 57 |
| Expo Router | Roteamento por arquivos (`src/app/*`) | ~57.0.12 |
| React / React Native | Base da UI | React 19.2 / RN 0.86 |
| NativeWind | Tailwind CSS funcionando em React Native | ^4.2.6 |
| Reanimated + Worklets | Animações performáticas (rodam fora da thread JS) | Reanimated 4.5 / Worklets 0.10 |

Sempre que for programar algo novo com API do Expo, consulta a doc **versionada** do SDK 57 (não a doc genérica "latest"): `https://docs.expo.dev/versions/v57.0.0/`. Várias APIs mudaram entre versões.

## 2. Por que Expo Go não funciona aqui

O app usa módulos nativos que **não vêm dentro do app Expo Go** (o app genérico da loja):

- `@expo/ui` — bridge nativo pra componentes SwiftUI (iOS) / Jetpack Compose (Android)
- `expo-glass-effect` — efeito "Liquid Glass" nativo do iOS
- `react-native-worklets` + `react-native-reanimated` 4 — precisam de código nativo compilado
- `expo-dev-client` — o próprio pacote que troca o "runtime" do Expo Go pelo nosso runtime customizado

Por isso o projeto depende de um **development build** (dev client) próprio, feito com EAS, em vez de abrir com o app Expo Go da loja. Isso está confirmado em `eas.json`, no profile `development` (`developmentClient: true`).

**Regra prática:** toda lib que tem código nativo (a maioria dos pacotes `expo-*` e `react-native-*`) exige rebuild do dev client depois de instalada. Lib 100% JavaScript (ex.: `class-variance-authority`, `lucide-react-native`, `clsx`) não exige.

## 3. Pacotes instalados e pra que servem

### Core do Expo
- **expo** — runtime principal, CLI (`expo start`, etc.)
- **expo-router** — roteamento por arquivos dentro de `src/app`
- **expo-constants** — acesso a config do `app.json`/manifest em runtime
- **expo-linking** — deep links / abrir URLs
- **expo-status-bar** — controle da status bar
- **expo-system-ui** — cor de fundo do sistema (splash, navigation bar)
- **expo-web-browser** — abrir navegador in-app (ex.: login OAuth)

### Dev client / build
- **expo-dev-client** — runtime customizado que substitui o Expo Go
- **expo-device** — informações do device (usado em debug/telemetria)

### UI e design
- **@expo/ui** — componentes nativos (SwiftUI/Compose)
- **expo-glass-effect** — efeito Liquid Glass (iOS)
- **expo-image** — componente de imagem otimizado (cache, formatos modernos)
- **expo-symbols** — ícones SF Symbols (iOS)
- **nativewind** + **tailwindcss** — className com Tailwind em React Native
- **@rn-primitives/slot** + **class-variance-authority** — base dos componentes em `src/components/ui` (padrão shadcn/ui adaptado pra RN — ver `components.json`)
- **lucide-react-native** — ícones
- **react-native-svg** + **react-native-svg-transformer** — permite importar `.svg` como componente React (usado pro logo, ver `metro.config.js`)

### Fontes
- **@expo-google-fonts/poppins** — família Poppins carregada em `src/app/_layout.tsx` via `useFonts`
- **expo-font** — API base de carregamento de fontes
- **expo-splash-screen** — mantém a splash visível até as fontes carregarem

### Animação / gestos
- **react-native-reanimated** — animações
- **react-native-worklets** — motor de worklets que o Reanimated 4 usa
- **react-native-gesture-handler** — gestos (swipe, pan, etc.)
- **react-native-screens** — otimiza navegação nativa (usado por debaixo do expo-router)
- **react-native-safe-area-context** — respeitar notch/status bar

### Web
- **react-native-web** + **react-dom** — permite `expo start --web`

## 4. Comandos do dia a dia

```bash
# instalar dependências (depois de clonar ou dar pull)
npm install

# rodar o servidor de desenvolvimento pro dev client (celular/emulador com o build customizado instalado)
npx expo start --dev-client

# rodar versão web
npx expo start --web

# lint
npx expo lint

# checar saúde do projeto (configs, deps duplicadas, compatibilidade)
npx expo-doctor@latest
```

## 5. Quando (e como) rebuildar o dev client

**Gatilho:** instalou/atualizou qualquer pacote com código nativo.

```bash
# 1. garante que as versões instaladas são as esperadas pro SDK do projeto
npx expo install --fix

# 2. gera o novo build de desenvolvimento (troca android/ios conforme o device)
eas build --profile development --platform android
eas build --profile development --platform ios

# 3. instala o novo build no aparelho, desinstalando o antigo antes
# (o EAS mostra um QR code / link pra baixar o .apk ou .ipa)

# 4. sobe o metro apontando pro dev client
npx expo start --dev-client
```

Sintoma clássico de dev client desatualizado: app abre, fica em splash/tela branca pra sempre e nunca carrega — porque o JS bundle tenta usar um módulo nativo que não existe dentro do binário antigo.

## 6. Estrutura de pastas (`src/`)

```
src/
  app/            rotas (expo-router) — cada arquivo é uma tela
    _layout.tsx   layout raiz: carrega fontes e controla a splash screen
    index.tsx     tela inicial
  components/
    ui/           componentes de base (padrão shadcn/ui adaptado, ver components.json)
  constants/
    theme.ts      constantes de tema
  hooks/
    use-color-scheme.ts / .web.ts   detecta dark/light mode (versão nativa e web)
    use-theme.ts
  lib/
    utils.ts      helpers (ex.: `cn()` pra combinar classes do tailwind)
  global.css      entrada do Tailwind/NativeWind
```

## 7. Cores do tema (`tailwind.config.js`)

Paleta organizada por papel de usuário — cada um com `dark` / `main` / `light` / `surface`:

- `admin` — tons de marrom (administrador)
- `lojista` — tons de vinho/magenta (lojista)
- `artesao` — tons de verde (artesão)
- `toaster` — cores de feedback (info/warning/success/error)
- `neutral` — cinzas neutros pra inputs/bordas

Uso via className, ex.: `bg-admin-surface`, `text-admin-main`.

## 8. Links oficiais

- Doc do Expo SDK 57 (versionada, não a "latest"): https://docs.expo.dev/versions/v57.0.0/
- EAS Build: https://docs.expo.dev/build/introduction/
- Development builds: https://docs.expo.dev/develop/development-builds/introduction/
- NativeWind: https://www.nativewind.dev/
- Expo Router: https://docs.expo.dev/router/introduction/
