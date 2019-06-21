/* jshint esversion: 6 */
const env = require('dotenv').config();
const request = require('request');

//MapBox Info
const mbKey = process.env.MB_KEY;

//Get latitude and longitude from mapbox
const getGeoCode = (location, callback) => {
    const mbEndpoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const encodedLocation = encodeURIComponent(location);
    const mbUrl = `${mbEndpoint}${encodedLocation}.json?limit=1&access_token=${mbKey}`;
   
    const mbRequestOptions = {
        url: mbUrl,
        json: true
    }
    request(mbRequestOptions, (error, response, body) => {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode);
            callback(error, undefined);
        } else if (response.body.error) {
            console.log(response.body.error);
            console.log('statusCode:', response && response.statusCode);
            callback(response.body.error, undefined);
        } else if (!body.features) {
            console.log(body.message);
            console.log('statusCode:', response && response.statusCode);
            callback(body.message, undefined);
        } else {
            const feature = body.features[0];
            if (!feature) {
                callback(`Couldn't find location ${location}`, undefined);
            } else {
                const long = body.features[0].center[0];
                const lat = body.features[0].center[1];
                const place_name = body.features[0].place_name;

                const data = {
                    lat,
                    long,
                    place_name
                };
                callback(undefined, data);
            }
        }
    });
};//End getGeoCode

module.exports = getGeoCode;