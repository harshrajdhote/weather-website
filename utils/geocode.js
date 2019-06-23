const request = require('request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?&access_token=pk.eyJ1IjoiZGhvdGVoYXJzaHJhaiIsImEiOiJjanczczFxdmQwaWxqNDhxcTA5dXF2NDNsIn0.SpRrT-_v7oylFpY96UG34Q'
    request({url,json:true},(error,{body}={})=>
    {
        if(error)
        callback("Unable to connect Please check your connection",undefined)
        else if(body.features.length === 0)
        {
            callback("unable to find the location",undefined)
        }
        else
        {
            var data = {
                location : body.features[0].place_name
                ,longitude : body.features[0].center[1]
                ,latitude : body.features[0].center[0]
            }
            callback(undefined,data)
        }
    }) 
}
const forecast = (longitude,latitude,callback)=>
{
    const url = "https://api.darksky.net/forecast/c547568da96b987fa83f8dab571859c8/"+longitude+','+latitude+"?units=si&lang=en"
    request({url,json:true},(err,response)=>{
        if(err)
        callback("Unable to connect",undefined)
        else if(response.body.error)
        {
            callback("unable to find the location",undefined)
        }
        else
        {
            var data = {
                temperature : response.body.currently.temperature
                ,summary : response.body.daily.data[0].summary
                ,precipProbability : response.body.currently.precipProbability
            }
            callback(undefined,data)
        }    
    })
}
module.exports.geocode = geocode
module.exports.forecast = forecast

