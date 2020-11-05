// @generated: @expo/next-adapter@2.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const generateSiteMap = require("./utils/generateSiteMap");
import { getData } from './utils';

const { withExpo } = require('@expo/next-adapter');
const withImages = require('next-optimized-images');
const withFonts = require('next-fonts');

async function handle () {
    let listings = await getData({
      type: 'listing'
    });
    let sitemap = await generateSiteMap(listings);
    return {}
}

module.exports = withExpo(withFonts(withImages({
  projectRoot: __dirname,
  generaiteSiteMap: handle()
})));

