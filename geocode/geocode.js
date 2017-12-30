const request = require('request');

const geocodeAddress = (address, callback) => {

    const encodedQueryAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedQueryAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address');
        } else if (body.status === 'OVER_QUERY_LIMIT') {
            callback('Daily query limit exceeded');
        } else {
            callback(undefined, {
                Address: body.results[0].formatted_address,
                Latitude: body.results[0].geometry.location.lat,
                Longitude: body.results[0].geometry.location.lng
            });
        } 
    });

};

module.exports = {
    geocodeAddress
}