var express = require('express')
var http = require("http")
//var json = require("json")
var querystring = require('querystring');
var path = require("path")
var exphbs = require("express-handlebars")
var session = require("express-session")
var cokieparser = require("cookie-parser")
var bodyparser = require("body-parser")
var mongo = require("mongoose")
var people = require("./controller/peoplecontroller")
var app = express()
//var showuser = require("./controller/showuser")
app.engine(".hbs",exphbs({
    defaultLayout:"home",
    extname:".hbs"
}))
app.set("view engine","hbs")
//setting public folder space
app.use(express.static(path.join(__dirname,"public")))
// Building the middleware stack of the express
app.use(bodyparser.urlencoded({extended:true}))
app.use(cokieparser())
app.use(session({
    key: "user_sid",
    secret:"helloworld",
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:300000//86400000
    }
}))


// my middleware function to see if the cookies are still
//saved in the browser
/*app.use((req,res,next)=>{
    if(req.cookies.user_sid)
    {
        res.clearCookie('user_sid')
    }
    next()
})
*/
//middle ware to check for logged in user
var sesscheck = (req,res,next)=>{
    if(req.session.user == "user" && req.cookies.user_sid){
        res.redirect("/dashboard")
    }
    else{
    next()
    }

}
mongo.connect("mongodb://database/test",{useNewUrlParser:true})
var conn = mongo.connection
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open',()=>{
    console.log('connection open from server');
})
app.route('/')
.get(sesscheck,(req,res)=>{
    res.render('login',{admin:false})
})
.post(sesscheck,people)


app.get("/dashboard",(req,res) =>{
    if(req.session.user == "user" && req.cookies.user_sid){
        //console.log(req.session.user);console.log(req.cookies.user_sid)
    var data = querystring.stringify({
    username: req.session.uid
  });
  console.log("inside dashboard")

  var options = {
    host: 'task',
    port: 3000,
    path: '/task',
    method: 'POST',
    headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
  };
    var databseinfo;
    console.log("sending request from databse")
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      databseinfo = JSON.parse(chunk)
    });
    response.on('end', function() {
        console.log("before rendering")
        console.log(databseinfo)
      res.render('task',{databaseinfo:databseinfo[0].task})
    })
  });
  httpreq.write(data);
  httpreq.end();
    }
    else{
        //console.log(req.session.user);console.log(req.cookies.user_sid)
        res.redirect("/")
    }
})


app.route("/logout")
.get((req,res)=>{
    if(req.session.user == "user" || req.session.user == "admin" && req.cookies.user_sid){
        res.clearCookie("user_sid")
        res.redirect("/")
    }
    else{
        res.redirect("/")
    }
})

var sesscheckadmin = (req,res,next)=>{
  if(req.session.user == "admin" && req.cookies.user_sid){
    console.log("insde sesscheckher")
    console.log(req.session.user)
    console.log(req.cookies.user_sid)
      res.redirect("/admindashboard")
  }
  else{
  next()
  }
}

app.route("/admin")
.get(sesscheckadmin,(reqq,res)=>{
    res.render("login",{admin:true})
})


app.route("/admindashboard")
.get((req,res)=>{
  if(req.session.user == "admin" && req.cookies.user_sid){
    res.render("admindashboard")
  }
  else{
    res.redirect("/admin")
  }
})

app.route("/admincontainer")
.post((req,res)=>{
  console.log("entering adminconatiner")
  //console.log("error in stringify")
  var data = querystring.stringify({
    username: req.body.username,
    password: req.body.pass
  })
  //console.log(req.body.username)
  //console.log(req.body.pass)
  //console.log(req)
  var successornot;
    var options = {
    host: 'adminstator',
    port: 3001,
    path: '/admin',
    method: 'POST',
    headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
  };
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      successornot = chunk;
    });
    response.on('end', function() {
      if(successornot == 'true'){
        req.session.user = "admin";
        res.redirect("/admindashboard")
      }
      else{
        res.clearCookie("user_sid")
        res.redirect("/admin")
      }
    })
  });
  httpreq.write(data)
  httpreq.end();
})




// ====================================>
// This deals with with the admin all users
var users;
var sesscheckadminpeople = (req,res,next)=>{
  if(req.session.user == "admin" && req.cookies.user_sid){
      next()
  }
  else{
      res.redirect("/admin")
  }
}
//=====================================>

app.route("/admin/showuser")
.get(sesscheckadminpeople,(req,res)=>{
    var options = {
    host: 'people',
    port: 3000,
    path: '/people',
    method: 'GET',
    headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
  };
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      users = JSON.parse(chunk);
      console.log(typeof(users))

    });
    response.on('end', function() {
        res.redirect("/allpeople");
        //res.ren(allpeople)
    });
  });
  httpreq.end();
})// controller that renders the show user page

//allppl = [{"rittika":"sur"},{"hfeifgy":"hfiuehrfiuh"}];
//var users=[{"_id":"5da9a366307748728cd8c672","wid":"01","username":"rohit","password":"sinha","tasks":[{"taskname":"webapp","tasksite":"home","tasskloc":"shyambazar","taskdeptloc":"shyambazar"}],"task":[]},{"_id":"5da9a38a307748728cd8c673","wid":"02","username":"ishan","password":"ghosh","tasks":[{"taskname":"webapp","tasksite":"home","tasskloc":"shyambazar","taskdeptloc":"shyambazar"}],"task":[]}]
app.get("/allpeople",sesscheckadminpeople,(req,res)=>{
  console.log(users)
  res.render("allpeople",{people:users})
})









//========================================================+=============>
//                  ADD USER


app.route("/adduser")
.post(sesscheckadminpeople,(req,res)=>{
  var data = querystring.stringify({
    pid: req.body.pid,
    name: req.body.fullname,
    mobileno: req.body.mobileno,
    company: req.body.comp,
    password: req.body.password

})

var successornot;
    var options = {
    host: 'adduser',
    port: 3000,
    path: '/adduser',
    method: 'POST',
    headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
  };
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      successornot = chunk;
    });
    response.on('end', function() {
      console.log(successornot)
      if(successornot == 'true'){
        res.redirect("/admin/showuser")
      }
      else{
        res.redirect("/admindashboard")
      }
    })
  });
  httpreq.write(data)
  httpreq.end();

})


//=====================================================>
app.route("/admindeleteuser")
.post(sesscheckadminpeople,(req,res)=>{
  var data = querystring.stringify({
    wid: req.body.usertodelete

})
console.log("in delete user")
console.log(req.body.usertodelete)

var successornot;
    var options = {
    host: 'adduser',
    port: 3000,
    path: '/deluser',
    method: 'POST',
    headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
  };
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      successornot = chunk;
      console.log("data recieved")
      console.log(successornot)
    });
    response.on('end', function() {
      console.log(successornot)
      if(successornot == 'true'){
        console.log("in true")
        res.redirect("/admin/showuser")
      }
      else{
        console.log("in false")
        res.redirect("/admindashboard")
      }
    })
  });
  httpreq.write(data)
  httpreq.end();
})



//======================================================>
app.route("/addtask")
.get(sesscheckadminpeople,(req,res)=>{
  res.redirect("/admindashboard")
})
.post((req,res)=>{
  console.log(req.body.workerid)
  var data = querystring.stringify({
    username: req.body.workerid
  });
  console.log("inside dashboard")

  var options = {
    host: 'task',
    port: 3000,
    path: '/task',
    method: 'POST',
    headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
  };
    var databseadmininfo;
    console.log("sending request from admin")
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      databseadmininfo = JSON.parse(chunk)
    });
    response.on('end', function() {
      console.log("all the tasks")
      console.log(typeof(databseadmininfo[0].task))
        console.log(databseadmininfo[0].task)
        console.log(databseadmininfo[0].wid)
      res.render('admintask',{databaseinfo:databseadmininfo[0].task})
    })
  });
  httpreq.write(data);
  httpreq.end();
})

//=======================================================================>

app.route("/addusertask")
.post(sesscheckadminpeople,(req,res)=>{
  console.log("just inside addusertask")
  console.log(req.body.taskname)
  var data = querystring.stringify({
    taskname: req.body.taskname,
    tasksite: req.body.tasksite,
    wid: req.body.wid
  });
  console.log("inside dashboard")

  var options = {
    host: 'task',
    port: 3000,
    path: '/addusertask',
    method: 'POST',
    headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
  };
    var adduserinfo;
    console.log("sending request from admin")
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      console.log(chunk)
      adduserinfo = chunk
    });
    response.on('end', function() {
      if(adduserinfo == "true"){
          console.log("updated")
          res.redirect("/admindashboard")
      }
      else{
        console.log("not update")
        res.redirect("/admindashboard")

      }
    })
  });
  httpreq.write(data);
  httpreq.end();
})



//===========================================>
app.route("/deleteusertask")
.post(sesscheckadminpeople,(req,res)=> {
  console.log("user deleted")
})



app.listen(3000,(req,res)=>{
    console.log("server Starting")
})



