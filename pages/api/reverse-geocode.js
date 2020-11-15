import fetch from 'isomorphic-unfetch'

const mapquestApiKey = process.env.MAPQUEST_KEY;

/**
 * Uses the mapquest API to find place information for provided latitude
 * and longitude
 */
const reverseGeocode = async (req, res) => {
  const { latlng = '' } = req.query;
  const [latitude, longitude] = latlng.split(',');

  console.log('Request made it this far');

  if (!latitude || !longitude) {
    res.statusCode = 400;
    res.json({ error: 'latlng query param is required' });
    return;
  }

  try {
    const placeResult = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${mapquestApiKey}&location=${latitude},${longitude}`);
    const placeData = await placeResult.json();
    const location = placeData.results[0].locations[0];
    const place = {
      country: location.adminArea1,
      region: location.adminArea3,
      city: location.adminArea5,
      postalCode: location.postalCode,
    };
    res.statusCode = 200;
    res.json(place);
  } catch (e) {
    const error = e.data && e.data.message || e.message;
    console.log(error);
    res.statusCode = 500;
    res.json({ error });
  }
};

module.exports = reverseGeocode;
