var express = require("express")
var mongo = require("mongoose")
var bodyparser = require("body-parser")
var user = require("./controller/user")
var del = require("./controller/deluser")
var app = express()


app.use(bodyparser.urlencoded({extended:true}))


mongo.connect("mongodb://database/test",{useNewUrlParser:true})
var conn = mongo.connection
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open',()=>{
    console.log('connection open from server');
})

app.route("/adduser")
.post(user)

app.route("/deluser")
.post(del)

app.listen(3000,(req,res)=>{
    console.log("people listening")
})