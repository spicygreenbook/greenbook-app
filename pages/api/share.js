const visualTestMode = false; // enable to see actual browser window pop up
//const visualTestMode = true; // enable to see actual browser window pop up
const chromium = require('chrome-aws-lambda');

let page;

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const screenshot = async (req, res) => {

  const localDev = req.headers.host === 'localhost:3000';
  const waitUntilNetworkIdle = (process.env.NODE_ENV === 'production' ? 'networkidle0' : 'networkidle0') || 'load';

  let _url = req.url;
  console.log('incoming url', _url)
  let type = req && req.query && req.query.type || '';
  let name = req && req.query && req.query.name || '';

  let url = `https://spicygreenbook.org/widgets/share?type=${type}&name=${name}`;

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: localDev && !visualTestMode ? true : chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  let error = '';

  page.setViewport({
    width: 1200,
    height: 600
  });

  try {

    console.log('network settings', waitUntilNetworkIdle);
    await page.goto(url, {
      // Views with realtime data will always timeout if the
      // 'waitUntilNetworkIdle' flag is flipped
      // networkidle 0 in production and networkidle2 in localdev
      waitUntil: waitUntilNetworkIdle,
      timeout: 30000,
    });

    let imageBuffer;
    imageBuffer = await page.screenshot({
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 600,
      },
    });

    if (!visualTestMode) {
      await browser.close();
    }

   if (typeof imageBuffer !== 'string') {
      res.statusCode = 200;
      let ttl = 60 * 60 * 24;
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, s-maxage=' + ttl + ', maxage=' + ttl + ', stale-while-revalidate');
      return res.end(imageBuffer);
    } else {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Cache-Control', 'public, s-maxage=1, stale-while-revalidate');
      return res.end('We could not load that page properly');
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, s-maxage=1, stale-while-revalidate');
    console.error(error);
    return res.end(error);
  }
};


module.exports = (req, res) => {
  return screenshot(req, res);
};
