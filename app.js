const yargs = require('yargs');

const geocode = require('./geocode/geocode');

const weather = require('./weather/weather');


const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        const lat = results.Latitude;
        const lng = results.Longitude;

        weather.fetchWeather(lat, lng, (errorMessage, weatherResult) => { 
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(weatherResult);
            }
        });

    }
});













// a81fa217a2568058261cb8987e6a0f6e

// https://api.darksky.net/forecast/a81fa217a2568058261cb8987e6a0f6e/37.8267,-122.4233



