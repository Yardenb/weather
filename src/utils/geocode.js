const request = require('request')
const geocode = (address, cb)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieWFyZGVuYiIsImEiOiJjazVlYjlzYzAwY2F4M29sZXJiNThpN3M5In0.KTt3gw-Rbq0vI8TJYq3mCA&limit=1`

    request({url, json: true}, (err, {body})=>{
        if(err){
            cb('Unable to connect to geocode service')
        } else if(body.features.length === 0){
            cb('Unable to find location.')
        }
        else{
            cb(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode