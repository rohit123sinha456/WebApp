var http = require("http")

var su = (req,res)=>{
  var allpeople;
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
      allpeople = chunk;
    });
    response.on('end', function() {
        res.render("allpeople",{people:allpeople})
    })
  });
  httpreq.end();

}
module.exports = su;
