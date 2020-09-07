// @generated: @expo/next-adapter@2.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');
const withImages = require('next-optimized-images');
const withFonts = require('next-fonts');

module.exports = withExpo(withFonts(withImages({
  projectRoot: __dirname,
})));
