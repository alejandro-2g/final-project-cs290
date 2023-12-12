//var path = require('path')

var express = require('express')
var data = require('./data.json')
var exphbs = require('express-handlebars')

var app = express()

app.engine("handlebars", exphbs.engine({defaultlayout: "main"}))
app.set("view engine", "handlebars")

var port = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/', function(req, res, next){
        res.status(200).render("HomePage")
})

app.get('/AboutUs', function(req, res, next){
    res.status(200).render("AboutUs")
})

app.get('/workouts/:muscleGroup', function(req, res, next){
    var  muscleGroup = req.params.muscleGroup.toLowerCase()
    var exerciseData = data[muscleGroup]
    if(exerciseData){
        res.status(200).render("MuscleGroupPage",{
            muscleGroup: exerciseData.muscleGroup,
            exercises: exerciseData.exercises
        })
    }
    else{
        next()
    }
})

app.get('*', function (req, res) {
    res.status(404).render("404Page", {url: req.originalUrl})
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})