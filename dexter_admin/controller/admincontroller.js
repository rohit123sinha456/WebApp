var model = require("../model/adminmodel")

var postreqest = (req,res)=>{

    //console.log(req)
    var uname = req.body.username;
    var pass = req.body.password
    model.find({username:uname},(err,docs)=>{
        if(err){

        }
        else{
            console.log("this the doc")
            console.log(docs)
            if(docs.length>0)
            {
                if(pass == docs[0].password){
                    res.send('true')
                }
                else{
                    res.send('false')
                }
            }
            else{
                res.send('false')
            }
        }
    })

}

module.exports = postreqest;