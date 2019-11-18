var mongoose = require("mongoose")

var schema = mongoose.Schema

var ppl = new schema({
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
module.exports = mongoose.model("people",ppl,"people");