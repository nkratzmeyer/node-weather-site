/* jshint esversion: 6 */
const request = require('request');

//DarkSky Info
const dsKey = process.env.DS_KEY;
const units = 'us';
const exclude = 'minutely';

//Get the weather forecast for a specific latitude longitude using DarkSky api
const getWeatherForecast = (lat, long, callback) => {

    const url = `https://api.darksky.net/forecast/${dsKey}/${lat},${long}?units=${units}&exclude=${exclude}`;

    const requestOptions = {
        url: url,
        json: true  //Using this, we don't have to manually parse JSON
    };

    request(requestOptions, (error, response, body) => {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log(lat, long);
            console.log(url);
            callback(error, undefined);
        } else if (response.body.error) {
            console.log(response.body.error);
            callback(response.body.error, undefined);
        }
        else {
            const currently = body.currently;
            const daily = body.daily.data;

            const data = {
                summary: currently.summary,
                currentTemp: currently.temperature,
                precipProbability: currently.precipProbability,
                high: daily[0].temperatureHigh,
                low: daily[0].temperatureLow
            };
            callback(undefined, data);
        }
    });
};//End GetWeatherForecast

module.exports = getWeatherForecast;