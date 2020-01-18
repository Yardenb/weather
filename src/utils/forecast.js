const request = require('request')
const forecast = (lat, lng, cb)=>{
    const url = `https://api.darksky.net/forecast/7289e26b4a6397f23f23374edf743d99/${lat},${lng}?units=si`;
    request({url, json: true}, (err, {body})=>{
        if(err){
            cb('Unable to connect to forecase')
        } else if(body.error){
            cb('Unable to find the location')
        }else{
            cb(undefined, 
                `${body.daily.data[0].summary}it is currently ${body.currently.temperature}, there is ${body.currently.precipProbability}% chance for rain.
                The high today is ${body.daily.data[0].temperatureHigh} and a low of ${body.daily.data[0].temperatureLow}`
                )
        }
        
    })
}

module.exports = forecast