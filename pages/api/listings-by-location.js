const { Client } = require('@googlemaps/google-maps-services-js');
const Prismic = require('prismic-javascript');

const prismicEndpoint = 'https://spicygreenbook.cdn.prismic.io/api/v2';
const getPrismicClient = (req) => Prismic.getApi(prismicEndpoint, { req });

const googleMapsServicesApi = new Client({});
const googleMapsServicesApiKey = process.env.GOOGLE_MAPS_SERVICES_API_KEY;

let listingsByCountry = {};
let listingsByRegion = {};
let listingsByCity = {};
let listingsByPostalCode = {};
let createIndexTimeout = null;

const getComponentShortName = (components, type) => {
    const component = components.find(c => c.types.indexOf(type) >= 0);
    return component ? component.long_name : '';
};

const parsePlace = (place) => {
    const components = place.address_components;
    return {
        country: getComponentShortName(components, 'country'),
        region: getComponentShortName(components, 'administrative_area_level_1'),
        city: getComponentShortName(components, 'locality'),
        postalCode: getComponentShortName(components, 'postal_code'),
    };
};

const createIndex = async () => {
    if (!googleMapsServicesApiKey) {
        console.warn('listings-by-location.js: GOOGLE_MAPS_SERVICES_API_KEY not provided. Skipping index creation.');
        return;
    }
    console.log('Creating location index');
    clearTimeout(createIndexTimeout);

    const tempListingsByCountry = {};
    const tempListingsByRegion = {};
    const tempListingsByCity = {};
    const tempListingsByPostalCode = {};

    const client = await getPrismicClient();

    let page = 1;
    let totalPages = Infinity;

    while (page < totalPages) {
        const result = await client.query(
            Prismic.Predicates.at('document.type', 'listing'),
            { page }
        );

        totalPages = result.total_pages;

        for (result of result.results) {
            try {
                const { latitude, longitude } = result.data.geocoordinates;
                const placeResult = await googleMapsServicesApi.reverseGeocode({
                    params: {
                        latlng: `${latitude},${longitude}`,
                        result_type: 'country|administrative_area_level_1|locality|postal_code',
                        key: process.env.GOOGLE_MAPS_SERVICES_API_KEY,
                    },
                });
                const place = parsePlace(placeResult.data.results[0]);
                const listing = {
                    id: result.id,
                    name: result.data.name[0].text,
                    city: place.city,
                };

                tempListingsByCountry[place.country] = tempListingsByCountry[place.country] || [];
                tempListingsByRegion[place.region] = tempListingsByRegion[place.region] || [];
                tempListingsByCity[place.city] = tempListingsByCity[place.city] || [];
                tempListingsByPostalCode[place.postalCode] = tempListingsByPostalCode[place.postalCode] || [];

                tempListingsByCountry[place.country].push(listing);
                tempListingsByRegion[place.region].push(listing);
                tempListingsByCity[place.city].push(listing);
                tempListingsByPostalCode[place.postalCode].push(listing);
            } catch (e) {
                console.error(e.response.data.error_message);
            }
        }

        console.log(`Processed listings page: ${page}`);
        page += 1;
    }

    listingsByCountry = tempListingsByCountry;
    listingsByRegion = tempListingsByRegion;
    listingsByCity = tempListingsByCity;
    listingsByPostalCode = tempListingsByPostalCode;

    console.log(`Processed listing pages: ${page}`);
    setTimeout(() => createIndex(), 60000);
};

async function handler(req, res) {
    const {
        country,
        region,
        city,
        postalCode,
    } = req.query;
    let result = [];
    if (country) {
        result = listingsByCountry[country] || [];
    } else if (region) {
        result = listingsByRegion[region] || [];
    } else if (city) {
        result = listingsByCity[city] || [];
    } else if (postalCode) {
        result = listingsBypostalCode[postalCode] || [];
    }
    res.statusCode = 200;
    res.json(result);
};

createIndex();

module.exports = handler;
