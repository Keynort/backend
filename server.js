const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const https = require('https')
app.use(bodyParser.urlencoded({ extended: false }))

const port = 2000;
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    let cityName = req.body.city
    let key = '68b022855d96b25ff96777b72efb3d2d'
    let url = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+key+'&units=metric&mode=json'
    https.get(url ,function (response){
        response.on('data',data=>{
            let a = JSON.parse(data)
            let temp =  a.main.temp
            let cond =  a.weather[0].description
            res.send("weather in "+cityName+" is: "+cond+ " " +temp+" degree about celcius")
        })
    })
});
app.listen(port, () => {
    console.log(port);
});