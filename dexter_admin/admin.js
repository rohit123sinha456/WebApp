var express = require("express")
var bodyparser = require("body-parser")
var admincontroller = require("./controller/admincontroller")
var app = express()
var mongo = require("mongoose")


app.use(bodyparser.urlencoded({extended:true}))

mongo.connect("mongodb://database/admindb",{useNewUrlParser:true})
var conn = mongo.connection
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open',()=>{
    console.log('connection open from server');
})

app.route("/admin")
.post(admincontroller)

app.listen(3001,(req,res)=>{
    console.log("admin in")
})