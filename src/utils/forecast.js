const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/ac3be73ae5f99fbf75a07dfeb045fe1f/${latitude},${longitude}?units=si`;

    request(
        {
            url,
            json: true,
        },
        (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather service!', undefined);
            } else if (body.error) {
                callback('Unable to find location.', undefined);
            } else {
                callback(
                    undefined,
                    `${body.daily.data[0].summary} It is currently ${
                        body.currently.temperature
                    } degrees out. The high today is ${body.daily.data[0].temperatureHigh} with a low of ${
                        body.daily.data[0].temperatureLow
                    }. There is a ${body.currently.precipProbability}% chance of rain.`
                );
            }
        }
    );
};

module.exports = forecast;
