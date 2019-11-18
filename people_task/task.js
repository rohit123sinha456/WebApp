var express = require("express")
var bodyparser = require("body-parser")
var people = require("./controller/dbcontroller.js")
var addusertask = require("./controller/addtask")
var mongo = require("mongoose")
// create a model...create a controller... when req comes in...parse req.username....find the entry in database
// send the result of the database as json and NOT array
var app = express()

app.use(bodyparser.urlencoded({extended:true}))

mongo.connect("mongodb://database/test",{useNewUrlParser:true})
var conn = mongo.connection
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open',()=>{
    console.log('connection open in task');
})

app.route("/task")
.post(people)


app.route("/addusertask")
.post(addusertask)

app.listen(3000,(req,res)=>{
    console.log("task listening");
    
})