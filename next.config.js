// @generated: @expo/next-adapter@2.1.0
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const generateSiteMap = require("./utils/generateSiteMap");

const { withExpo } = require('@expo/next-adapter');
const withImages = require('next-optimized-images');
const withFonts = require('next-fonts');

const fetch = require('isomorphic-unfetch');

async function getListings() {
    var masterRef = await fetch('https://spicygreenbook.cdn.prismic.io/api/v2');
    var masterRef_json = await masterRef.json();
    var master_ref;
    masterRef_json.refs.forEach(line => {
        if (line.id === 'master') {
            master_ref = line.ref;
        }
    })

    let url;
    url = `https://spicygreenbook.cdn.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22listing%22)%5D%5D&orderings=%5Bmy.listing.home_page_order%20desc%5D&pageSize=100`;
    if (url) {
        let data = await fetch(url);
        let parsed_data = [];
        let getLoop = async (nextInfo) => {
            nextInfo.results.map((doc, i) => {
                parsed_data.push(doc);
            })
            if (nextInfo.next_page) {
                console.log('fetching next page', nextInfo.next_page)
                let data = await fetch(nextInfo.next_page);
                getLoop(await data.json());
            }
        }
        await getLoop(await data.json());

        //console.log('parsed_data', parsed_data)
        //console.log('parsed', parsed_data)

        rows = parsed_data.map((doc, i) => {
            let content = {
                id: doc.id,
                uid: doc.uid,
                _slug: doc.uid,
                created: new Date(doc.first_publication_date).getTime(),
                updated: new Date(doc.last_publication_date).getTime(),
            };
            return content;
        })
    }
    //console.log('rows', rows)
    return rows
}

async function handle() {
    let listings = await getListings();
    let sitemap = await generateSiteMap(listings);
    return {}
}

module.exports = withExpo(withFonts(withImages({
    projectRoot: __dirname,
    generaiteSiteMap: handle()
})));

