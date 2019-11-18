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

var model = mongoose.model("people",ppl,"people")


var peoplecontroller = (req,res)=>{
    model.find({},(err,docs)=>{
        if(err){}
        else{
            res.send(docs)
        }
    })

}

module.exports = peoplecontroller;