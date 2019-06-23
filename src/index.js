/* jshint esversion: 6 */
const env = require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

//Define application paths
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

//Get port to use
const port = process.env.PORT || 3000;

const app = express();

//Set up handlebars template engine
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory);

app.use((express.static(publicDirectory)));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome!',
        name: 'Nathan Kratzmeyer'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nathan Kratzmeyer'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nathan Kratzmeyer'
    });
});


app.get('/weather', (req, res) => {

    const address = req.query.address;

    if (!address) {
        res.send({
            error: 'You must provide a search address'
        });
    } else {

        geocode(address, (geoError, geoData = {}) => {
            if (geoError) {
                res.send({
                    error: geoError
                });
            } else {
                forecast(geoData.lat, geoData.long, (forecastError, forecastData) => {
                    if(forecastError){
                        res.send({
                            error: forecastError
                        });
                    }else{
                        res.send({
                            place_name: geoData.place_name,
                            forecast: forecastData
                        });
                    }
                });
            }
        });

    }
});//End get /weather


app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'That help article was not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        message: 'That page was not found'
    });
});


app.listen(port, () => {
    console.log(`Started on ${port}`);
});