const express = require('express')
const utils = require('./../utils/geocode')
const hbs  = require('hbs')
const path = require('path')
const app = express()
//nodemon app.js -e js,hbs command to tell nodemon to look for hbs files also
//
const publicPath = (path.join(__dirname,'../public'))
const viewpath = path.join(__dirname,'./templates/views')
const pathpartials = path.join(__dirname,'./templates/partials')


//setup handalbars egine and views location 
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(pathpartials)
//set up static directory to server
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Harshraj Dhote'
    })
})
app.get('/weather', (req, res) => {
   if(!req.query.address)
   return res.send({
       error:'address must be provided'
   })


   var location = req.query.address
    utils.geocode(location,(err,data={})=>{
        location = data.location
        if(err)
        res.send({title: 'weather Details',err})
        else
        utils.forecast(data.longitude,data.latitude,(err,data)=>{
            if(err)
            res.send({title: 'weather Detials',err})
            else
            res.send({name : 'Harshraj Dhote',title: 'weather Details',location ,temperature : data.temperature,summary : data.summary,precipProbability : data.precipProbability})
   // console.log(data.location)
                  })
    })
})   
// app.get("/weather/:location",(req,res)=>{
//     var location = req.params.location
//     utils.geocode(location,(err,data)=>{
//         location = data.location
//         if(err)
//         res.render('index',{title: 'weather Details',err})
//         else
//         utils.forecast(data.longitude,data.latitude,(err,data)=>{
//             if(err)
//             res.render('index',{title: 'weather Detials',err})
//             else
//             res.render('index',{name : 'Harshraj Dhote',title: 'weather Details',location ,temperature : data.temperature,summary : data.summary,precipProbability : data.precipProbability})
//     // console.log(data.location)
//         })

//     })
// })

app.get("/about",(req,res)=>{
   res.render('about',{title : 'About Me',name : 'Harshraj Dhote' })
})
// app.get("/help",(req,res)=>{
//    res.sendFile("about.html")
// })
app.get('/help',(req,res)=>{
    res.render('help',{title: 'Help',helptxt:'hello this may be helpful',name : 'Harshraj Dhote'})
})
//here the orderof the gets matter that's why get * written at last
app.get("/help/*",(req,res)=>{
    res.render("404",{title:'404' ,error:"help article couldn't found",name : 'Harshraj Dhote'})
})

app.get("*",(req,res)=>{
    res.render("404",{title:"404",name : 'Harshraj Dhote',error : 'Page not found'})

})

app.listen(3000,()=>{
    console.log("server has been started")
})
 



// https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
