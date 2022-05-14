const request = require('request')
require('dotenv').config()

const forecast = (latitude, longitude, callback) => {
    const api_key = process.env.WEATHERSTACK_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${api_key}` + '&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, { body } = {}) => {
        if (error) callback('Unable to connect to weather services', undefined)
        else if (body.error) callback('Unable to fetch data for given coordinates', undefined)
        else {
            callback(undefined, {
                // location: response.body.location.name,
                // region: response.body.location.region,
                // country: response.body.location.country,
                temperature: body.current.temperature,
                weatherDesc: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast