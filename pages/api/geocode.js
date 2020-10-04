/*
accepts a query and attempts to return a geolocation
*/

const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_ACCESSKEY_SECRET
});

var docClient = new AWS.DynamoDB.DocumentClient();

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
// https://www.mapquestapi.com/geocoding/v1/address?key=KEY&inFormat=kvp&outFormat=json&location=irvine+ca&thumbMaps=false

async function handler(req, res) {

    const tableName = "geocache";
    let query = (req.query && req.query.query || '').trim().toLowerCase().replace(/[^a-z0-9\-\,\.]/gi, ' ').replace(/  /g, ' ').replace(/  /g, ' ').replace(/  /g, ' ');
    let error = '';
    let coords;

    const handleFinal = () => {
        if (error) {
            res.statusCode = 500;
            res.json({error: error});
        } else {
            res.setHeader('Cache-Control', 'public, s-maxage=3600, maxage=3600, stale-while-revalidate');
            res.statusCode = 200;
            res.json({query: query, coords: coords});
        }
    }

    // first try to get the cached results from DynamoDB on AWS
    return docClient.get({TableName: tableName, Key: {query: query}}, async (err, data) => {
        if (err) {
            error = 'Error connecting to backend cache service, please try again';
        } else {
            console.log('data', data)
            if (data && data.Item && data.Item.coords) {
                coords = data.Item.coords
                handleFinal();
            } else {
                // if we do not get a result, lets hit the mapquest API do get the coords
                try {
                    // broken?? let mapquest_results = await fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_KEY}&inFormat=kvp&location=${query}`);
                    let mapquest_results = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_KEY}&inFormat=kvp&outFormat=json&location=${encodeURIComponent(query)}&thumbMaps=false`);
                    let mapquest_json = await mapquest_results.json();

                    coords = [mapquest_json.results[0].locations[0].latLng.lat, mapquest_json.results[0].locations[0].latLng.lng];
                    //console.log(mapquest_json.results[0].locations);
                    if (coords) {
                        docClient.put({
                            TableName:tableName,
                            Item:{
                                query: query,
                                "coords": coords
                            }
                        }, (err, data) => {
                            if (err) {
                                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                                error = 'Error updating cache on backend cache service, please try again';
                                handleFinal();
                            } else {
                                console.log("Added item:", JSON.stringify(data, null, 2));
                                handleFinal();
                            }
                        });
                        //handleFinal();
                    } else {
                        error = 'invalid coords from api';
                        handleFinal();
                    }
                } catch(err) {
                    error = 'Could not lookup that query';
                    handleFinal();
                }
            }
        }
    });

}

module.exports = handler;
