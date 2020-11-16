// this resolve the issue with native-base compiling to expo web. link: https://stackoverflow.com/questions/63213100/you-require-appropriate-loaders-using-react-native-and-expo-app-fails-to-com
// Solution link: https://forums.expo.io/t/expo-start-web-failed-to-compile-after-import-native-base/40826/8
// A patch is being worked on and if so, remove @expo/webpack-config and this file.
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync({
        ...env,
        babel: {
            dangerouslyAddModulePathsToTranspile: ['@codler/react-native-keyboard-aware-scroll-view']
        }
    }, argv);
    return config;
}