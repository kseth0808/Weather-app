//js hint version 6
const express = require("express");
const app = express();
const https = require("https");
const { dirname } = require("path");
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
    res.render("weather");
})
app.post("/", function(req,res){
const cityname = req.body.cityname
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=8de2feb41adb56c2f7d891158094f228&units=metric"
https.get(url,function(response){
    response.on("data",function(data){
        const weatherdata = JSON.parse(data)
        const temp = weatherdata.main.temp
        const weatherdescription = weatherdata.weather[0].description
        const icon = weatherdata.weather[0].icon
        const imageUrl = " http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        
        res.render('weather',{city :cityname, temperature:temp,  explain : weatherdescription ,image : imageUrl});
        res.end(); 
    })
})
})


app.listen(process.env.PORT||3000, function(req,res){
    console.log("server is running")
})