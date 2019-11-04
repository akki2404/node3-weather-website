const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/cd57441ec40085756a8a170eff005a1e/'+latitude+','+longitude+'?units=si'
     request({url, json:true},(error,{body})=>{
         if (error){
             callback('Unable to connect to the Weather Service',undefined)
         }
         else if(body.error){
             callback('Unable to find location',undefined)
         }
         else{
            callback( undefined,'It is currently ' + body.currently.temperature + 'degrees out there. There is a ' + body.currently.precipProbability + '% chance of a rain')
         }
     })

}

module.exports = forecast


