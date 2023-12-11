var express = require('express')

var exphbs = require('express-handlebars')

var app = express()

app.engine("handlebars", exphbs.engine({defaultlayout: "main"}))
app.set("view engine", "handlebars")

var port = process.env.PORT || 3000

app.use(express.static('static'))

//looking to dynamically generate posts into postsPage.handlebars
//middleware functions need to figure out how to put data into templates
app.get('/', function(req, res, next){
    //if(postData){
        // console.log(postData)
        // console.log(postData[0])
        // res.status(200).render("postsPage", {
        //     allposts: true,
        //     posts: postData
        //assignment 5 stuff^^^^^^^
       // })
    //}
    //else{
        next()
    //}
})

app.get('/workouts/:exercise', function(req, res, next){
    //res.status(200).render()
    // var postNumber = req.params.postNumber
    // var post = postData[postNumber]
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

//CHange below func

app.get('*', function (req, res) {
    res.status(404).render("404Page", {url: req.originalUrl})
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})