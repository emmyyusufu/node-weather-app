const request = require('request');


var geoCodeAddress = (address) => {

    return new Promise((resolve, reject) => {
        // since the request library does not support Promises, we wrap it inside a Promise
        
        const encodedQueryAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedQueryAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            reject('Unable to get Address');
        } else if (body.status === 'ZERO_RESULTS') {
            reject('Unable to get Address');
        } else {
            resolve({
                Address: body.results[0].formatted_address,
                Latitude: body.results[0].geometry.location.lat,
                Longitude: body.results[0].geometry.location.lng
            });
        } 
    });

    });

}

geoCodeAddress("****").then((res) => {
    console.log(JSON.stringify(res, undefined, 2))
}, (errorMessage) => {
    console.log(errorMessage);
});