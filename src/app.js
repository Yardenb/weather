const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
//Define paths for express config
const publicDirectory = path.join(__dirname, '..', './public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname,'..', '/templates','/partials')


//Setup hb engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath);

//Set up static dir to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'mizi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'pizi'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Mizi pizi'
    })
})

app.get('/weather', (req, res) => {
    const {address} = req.query
    if(!address){
        return res.send({error: 'Address must be provided'})
    }
    geocode(address, (err,{latitude, longitude, location}={})=>{
        
        if (err) {
            return res.send({error: err})
        }

        forecast(latitude, longitude, (err, forecastData)=>{
            if (err) {
                return res.send({error: err})
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
   
})

app.get('/products', (req, res)=>{
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'404',
        errorMsg: 'Help article was not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})