/* fetch and cache a users approximate city/state from ip */
import fetch from 'isomorphic-unfetch'

const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_ACCESSKEY_SECRET
});

var docClient = new AWS.DynamoDB.DocumentClient();

async function handler(req, res) {

    const ip = req.headers['x-forwarded-for'] || '127.0.0.1';
    console.log('headers', req.headers);
    console.log('ip', ip);
    const tableName = "ipcache";
    let error = '';

    const handleFinal = (response) => {
        if (error) {
            res.statusCode = 500;
            return res.json({error: error});
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            // do not cache res.setHeader('Cache-Control', 'public, s-maxage=3600, maxage=3600, stale-while-revalidate');
            res.statusCode = 200;
            return res.json(response);
        }
    }

    let now = Math.round(Date.now() / 1000);
    let cacheDuration = 60 * 60 * 24 * 7; // 1 week
    // first try to get the cached results from DynamoDB on AWS
    return docClient.get({TableName: tableName, Key: {ip: ip}}, async (err, data) => {
        if (err) {
            console.error(err);
            error = 'Error connecting to backend cache service, please try again';
            return handleFinal()
        } else {
            let lastUpdated = data && data.Item && data.Item.value && data.Item.lastUpdated;
            if (lastUpdated > (now - cacheDuration)) {
                //console.log('deliver from aws cache', 'now', now, 'item last updated', lastUpdated);
                return handleFinal(JSON.parse(data.Item.value));
            } else {
                console.log('fetch from freegeoip cause', lastUpdated, '<', (now - cacheDuration));
                let new_data = await fetch('https://freegeoip.app/json/' + ip);
                let json = await new_data.json();
                console.log('json', json);

                if (json && json.ip) {
                    docClient.put({
                        TableName: tableName,
                        Item: {
                            ip: ip,
                            value: JSON.stringify(json),
                            lastUpdated: now
                        }
                    }, (err, put_data) => {
                        if (err) {
                            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                            error = 'Error updating cache on backend cache service, please try again';
                            handleFinal();
                        } else {
                            console.log("Added item:", put_data);
                            return handleFinal(json);
                        }
                    });

                } else {
                    return handleFinal(JSON.parse(data.Item.value));
                    //error = 'Invalid json from instagram sadly';
                    //return handleFinal();
                }
            }
        }
    });

}

module.exports = handler;
