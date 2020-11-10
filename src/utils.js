const axios = require('axios').default;

async function geocode(address) {
    try {
        const API_KEY = 'pk.eyJ1Ijoic2hhcm1hc2h1YmhhbTg1MCIsImEiOiJja2g3bWdwODgwYnN4MnBucWR2ZmhrbDNpIn0.SF4F8wVsDBUg6rDJmqMX9w';

        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`;

        const response = await axios.get(url, {
            params: {
                access_token: API_KEY,
                limit: 1
            }
        });

        // Address not found
        if (response.data.features.length === 0) {
            throw 'Unable to find location. Try another search.'
        }

        return {
            latitude: response.data.features[0].center[1],
            longitude: response.data.features[0].center[0],
            location: response.data.features[0].place_name
        }
    }

    catch (err) {
        // Address not found error
        if (typeof err === 'string') {
            throw err
        }

        // Network error
        throw 'Unable to connect to weather service!'
    }

}

async function forecast(latitude, longitude) {
    try {
        const url = 'https://api.openweathermap.org/data/2.5/weather'
        const API_KEY = '0ef42c71c2bd711fb9003687c7e42368'
        const response = await axios.get(url, {
            params: {
                lat: latitude,
                lon: longitude,
                appid: API_KEY,
                units: 'metric'
            }
        });
        const desc = response.data.weather[0].description;
        const temp = response.data.main.temp;
        const rain = response.data.clouds.all;

        return `It is <b>${desc}</b> here and currently <em>${temp}</em> degrees out. There is a ${rain}% chance of rain.`;
    }

    catch (err) {
        // Coordinates not found
        const { response } = err;
        if (response) {
            throw `${response.data.message}`
        }

        // Network error
        throw 'Unable to connect to weather service!'
    }
}

module.exports = {
    geocode,
    forecast
}