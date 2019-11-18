var model = require("../model/peopledb")

var addtask = (req, res) => {
    var widbody = req.body.wid
    var tn = req.body.taskname
    var ts = req.body.tasksite
    var records;
    var newrecords = { "taskname": tn, "tasksite": ts }
    console.log(widbody)
    console.log(ts)
    console.log(tn)


    model.update(
        { wid: widbody }, 
        { $push: { task: newrecords } },
        (err,resp)=>{
            if(err){
                res.send("false")
            }
            else{
                console.log("updated")
                res.send("true")
            }
        })
}

module.exports = addtask