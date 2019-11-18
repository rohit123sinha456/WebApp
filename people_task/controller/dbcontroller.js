var model = require("../model/peopledb.js")
var qs = require("querystring")
var ppl = (req,res)=>{

    //console.log("parsing request");
    //console.log(req)
    
    var uname = req.body.username
    model.find({wid:uname},(err,docs)=>{
        if(err){

        }else{
            console.log(docs)
            res.send(docs)
        }
    })

}

module.exports = ppl;
