const request = require('request');


const fetchWeather = (lat, lng, callback) => {

    const API_Key = 'a81fa217a2568058261cb8987e6a0f6e';

    request({
        url: `https://api.darksky.net/forecast/${API_Key}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {

        if (!error && response.statusCode === 200) {
            callback(undefined, body.currently.temperature);   
        } else {
            callback('Unable to fetch Weather data');
        }
    });
}


module.exports.fetchWeather = fetchWeather;