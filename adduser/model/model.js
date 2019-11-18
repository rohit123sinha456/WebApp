var mongoose = require("mongoose")

var schema = mongoose.Schema

var user = new schema({
    wid: String,
    username: String,
    password: String,
    task:[{
        taskname: String,
        tasksite: String,
        //taskarrivetime: Date,
        taskarriveloc: String,
        //taskdepttime: Date,
        taskdeptloc: String
    }]
})


var model = mongoose.model("user",user,"people")

module.exports = model