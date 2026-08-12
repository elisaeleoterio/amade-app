const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = (() => {
  // 1. Pega a configuração padrão do Expo
  const config = getDefaultConfig(__dirname);

  // 2. Separa os módulos de transformação e resolução
  const { transformer, resolver } = config;

  // 3. Configura o transformador de SVG
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  };

  // 4. Diz ao Metro: "Não trate .svg como imagem comum (asset), trate como código fonte"
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  // 5. Aplica o NativeWind por cima de tudo e exporta
  return withNativeWind(config, { input: "./src/global.css" });
})();
