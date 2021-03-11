// @generated: @expo/next-adapter@2.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

module.exports = {
    presets: ['@expo/next-adapter/babel'],
    overrides: [
        {
            test: "./node_modules/@expo/next-adapter/document.js",
            plugins: [["@babel/plugin-proposal-class-properties"]],
        },
        {
            test: "./node_modules/@expo/vector-icons/",
            plugins: [["@babel/plugin-proposal-class-properties"]],
        },
        {
            test: "./node_modules/expo-av/",
            plugins: [["@babel/plugin-proposal-class-properties"]],
        },
    ],
};
