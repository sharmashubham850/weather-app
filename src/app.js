const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { geocode, forecast } = require('./utils');

const app = express();
const PORT = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const parialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(parialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

// Routes

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shubbi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shubbi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is some helpful text',
        name: 'Shubbi'
    })
})

app.get('/weather', async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.json({
            error: 'You must provide an address!'
        })
    }

    try {
        const { latitude, longitude, location } = await geocode(address);
        const weatherData = await forecast(latitude, longitude);

        res.json({
            'weather': weatherData,
            'location': location,
            'address': address
        })
    }
    catch (err) {
        res.json({
            error: err
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shubbi',
        errorMsg: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shubbi',
        errorMsg: 'Page not found.'
    })
})

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));