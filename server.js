var path = require('path')
var express = require('express')
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
            MyPlanPage: true,
            exercises: MyPlanData
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
            MyPlanPage: false,
            muscleGroup: exerciseData.muscleGroup,
            exercises: exerciseData.exercises
        })
    }
    else{
        next()
    }
})

// app.post('/workouts/:muscleGroup/addMyPlan', function (req, res, next) {
//     var muscleGroup = req.params.muscleGroup.toLowerCase()
//     var exerciseData = data[muscleGroup]
//     if (exerciseData) {
//       if (req.body && req.body.url && req.body.exerciseName) {
//         MyPlanData.exercises.push({
//           exerciseName: req.body.exerciseName,
//           url: req.body.url
//         })
  
//         fs.writeFile(
//           "./MyPlanData.json",
//           JSON.stringify(MyPlanData, null, 2),
//           function (err) {
//             if (err) {
//               res.status(500)
//             } else {
//               res.status(200)
//             }
//           }
//         )
//       } else {
//         res.status(400)
//       }
//     } else {
//       next()
//     }
//   })

// app.delete('/workouts/:muscleGroup/removeMyPlan', function(req, res, next){
//     var muscleGroup = req.params.muscleGroup.toLowerCase()
//     var exerciseData = MyPlanData[]
// })

app.get('*', function (req, res) {
    res.status(404).render("404Page", {url: req.originalUrl})
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})