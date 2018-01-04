const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    }).help().alias('help', 'h').argv;


    const encodedQueryAddress = encodeURIComponent(argv.address); 
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedQueryAddress}`; 

    axios.get(geocodeUrl)
        .then((response) => {
            if (response.data.status === 'ZERO_RESULTS') {
                throw new Error('Unable to find that address');
            }

            var API_Key = 'a81fa217a2568058261cb8987e6a0f6e';
            var lat = response.data.results[0].geometry.location.lat;
            var lng = response.data.results[0].geometry.location.lng;
            const weatherUrl = `https://api.darksky.net/forecast/${API_Key}/${lat},${lng}`;

            console.log(response.data.results[0].formatted_address);

            return axios.get(weatherUrl).then((response) => {

                var temperature = response.data.currently.temperature;
                var apparentTemperature = response.data.currently.apparentTemperature;

                console.log(`It's currently ${temperature}, but it feels like ${apparentTemperature}`); 



            })


        })
        .catch((e) => {
            if (e.code === 'ENOTFOUND') {
                console.log('Unable to connect to API Server');
            } else {
                console.log(e.message)
            }
        })