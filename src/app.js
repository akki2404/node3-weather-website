const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
const app = express()
//define paths for express config
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")
//setup static directory to serve
app.use(express.static(publicDirectoryPath))
//set up handle bars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather ',
        name:'AKshay Shelatkar'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name:'Akshay Shelatkar'

    })
})
app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help',
        para:'For help please contact me',
        name:'Akshay Shelatkar'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'You must provide the address term'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error, forecastdata)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
       
        })
    })

    // res.send({forecast:'Cloudy',
    // Location:'Pune',
    // address:req.query.address})

})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Akshay  Shelatkar',
        errorMesssage:'Help article not found'
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Akshay Shelatkar',
        errorMesssage:'Page not found'
    })
})

app.listen(port, ()=> {
    console.log('Server is up on port' +port)
})