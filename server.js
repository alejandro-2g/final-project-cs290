//var path = require('path')

var express = require('express')
var exerciseData = require('./data.json')
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
    var  muscleGroup = req.params.muscleGroup
    var exercises = exerciseData[muscleGroup]
    // console.log(post)
    // if(post){
    //     res.status(200).render("postsPage",{
    //         allposts: false,
    //         price: post.price,
    //         city: post.city,
    //         condition: post.condition,
    //         photoURL: post.photoURL,
    //         description: post.description
    //     })
    // }
    // else{
        next()
    // }
})

app.get('*', function (req, res) {
    res.status(404).render("404Page", {url: req.originalUrl})
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})