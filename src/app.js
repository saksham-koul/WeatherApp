const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setting handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Saksham Koul'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Saksham Koul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        desc: 'To use this web application, just specify the location whose weather information you want.\n' +
            '\nAdditionally, you can toggle between Celsius and Fahrenheit scales once the weather information loads.',
        name: 'Saksham Koul'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({error})

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({error})
            let celsius = (forecastData.temperature - 32) * 5 / 9
            res.send({
                forecast: forecastData,
                tempC: Math.round((celsius + Number.EPSILON) * 100) / 100,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.render('404', {
            title: '404',
            errorMsg: 'No search term provided'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    // res.send('Help article not found')
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    // res.send('404! Page not found.')
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server up & running on port ' + port)
})
