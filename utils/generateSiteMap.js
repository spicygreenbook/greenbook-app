const fs = require('fs');

async function generateSiteMap(data) {

    let paths = []
    try {
      const arrayOfFiles = fs.readdirSync("./pages")
      if (arrayOfFiles) {
        console.log('files to turn to paths are', arrayOfFiles)
        arrayOfFiles.filter(file => {
            return file.indexOf('.js') > -1 && file.slice(0,1) !== '_';
        }).forEach(file => {
            if (file === 'index.js') {
                file = '';
            }
            paths.push(file.replace(/\.js/gi, ''))
        })
      }
    } catch(e) {
      console.log(e)
    }


    console.log('paths', paths)
    let today = new Date().toISOString().substr(0,10);
    let urls = '';



    paths.sort().forEach(path => {
        urls += `
<url>
    <loc>https://spicygreenbook.com/${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
</url>
`;
    })
    data.listings.forEach(item => {
        urls += `
<url>
    <loc>https://spicygreenbook.com/biz/${item._slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
</url>
`;
    })

    let template = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
</urlset>`;

    //console.log(template);
    fs.writeFileSync('./public/sitemap.xml', template);
    return template;

}

module.exports = generateSiteMap
