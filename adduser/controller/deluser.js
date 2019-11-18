var model = require("../model/model")
var usercontroller = (req,res)=>{
    var widbody = req.body.wid
    model.deleteOne({wid:widbody},(err)=>{
        if(err){
            console.log(err)
                res.send("false")
        }
        else{
            console.log("deleted user")
            res.send("true")

        }

    })    

}


module.exports = usercontroller;