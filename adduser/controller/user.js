var model = require("../model/model")

var usercontroller = (req,res)=>{


    var addus = new model ({
        wid: req.body.pid,
        username: req.body.name,
        //mobileno: req.body.mobileno,
        //company: req.body.comp,
        password: req.body.password,
        task:[{}]

    });
    addus.save((err, details) => {

        if (err) {
            console.log(err)
            res.send("false")
        }
        else {
            console.log(details)
            res.send('true');
        }


    })

}


module.exports = usercontroller;