var model = require("../models/people")

var postpeoplecontroller = (req,res) =>{
    var uname = req.body.username;
    var pass = req.body.pass;

    model.find({wid:uname},(err,docs)=>{
        if(err){
        }
        else{
            if(docs.length > 0){
            if(docs[0].password == pass){
                console.log("correct password")
                req.session.user = "user"
                req.session.uid = docs[0].wid
                res.redirect("/dashboard")
            }
            else{
                res.redirect("/")
            }
        }
        else{
            res.redirect("/")
        }

        }
    })

}
module.exports = postpeoplecontroller;