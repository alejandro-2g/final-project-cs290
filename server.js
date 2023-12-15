var path = require('path')
var express = require('express')
var fs = require('fs')
var data = require('./data.json')
var MyPlanData = require('./MyPlanData.json')
var exphbs = require('express-handlebars')

var app = express()

app.engine("handlebars", exphbs.engine({defaultlayout: "main"}))
app.set("view engine", "handlebars")

var port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))

app.get('/', function(req, res, next){
    res.status(200).render("HomePage")
})

app.get('/AboutUs', function(req, res, next){
    res.status(200).render("AboutUs")
})

app.get('/MyPlan', function(req, res, next){
    if(MyPlanData){
        res.status(200).render("MyPlanPage", {
            exercises: MyPlanData.MyExercises
         })
    }
    else{
        next()
    }
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

app.post('/workouts/:muscleGroup/addMyPlan', function (req, res, next) {
    var muscleGroup = req.params.muscleGroup.toLowerCase()
    var exerciseData = data[muscleGroup]
    if (exerciseData) {
      if (req.body && req.body.url && req.body.exerciseName) {
        MyPlanData.MyExercises.push({
          exerciseName: req.body.exerciseName,
          url: req.body.url
        })
        
        fs.writeFile(
          "/MyPlanData.json",
          JSON.stringify(MyPlanData, null, 2),
          function (err) {
            if (err) {
              res.status(500).send("Server Error")
            } else {
              res.status(200).send("Data Saved Successfully.")
            }
          }
        )
      } else {
        res.status(400).send("Invalid JSON URL and exercise name")
      }
    } else {
      next()
    }
  })

app.delete('/:index/removeMyPlan', function(req, res, next){
  var exerciseIndex = req.params.index
  if(MyPlanData){
    if(exerciseIndex >= 0 && exerciseIndex < MyPlanData.MyExercises.length){
      MyPlanData.MyExercises.splice(exerciseIndex,1)
      fs.writeFile(
        "./MyPlanData.json",
        JSON.stringify(MyPlanData, null, 2),
        function (err) {
          if (err) {
            res.status(500).send("Server Error")
          } else {
            res.status(200).send("Data Deleted Successfully.")
          }
      })
    }
    else{
      res.status(400).send("Invalid My Plan Index")
    }
  }
  else
    next()
})

app.get('*', function (req, res) {
    res.status(404).render("404Page", {url: req.originalUrl})
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})