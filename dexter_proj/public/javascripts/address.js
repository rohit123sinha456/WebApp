var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError,{enableHighAccuracy: true});
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}


function showPosition(position) {
  
  //var times = position.timestamp;
  //dateObj = new Date(times * 1000); 
    //        utcString = dateObj.toUTCString(); 
  //
    //        time = utcString.slice(-11, -4); 
var latitude = position.coords.latitude;
var longitude = position.coords.longitude;
  
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

console.log("date", date);
console.log("time", time);
console.log("latitude", latitude);
console.log("longitude", longitude);
console.log("accuracy", position.coords.accuracy);


        
        let url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${"06e674094ab34ac8b335f4d0e277720d"}`; //geocode url
        fetch(url) //ajax request
        .then(response => response.json() ) //creating the json object
        .then(data => {
            console.log(data);
            document.body.insertAdjacentHTML("beforeend",`<p>address: ${data.results[0].formatted} </p>`);
        } )
        .catch(err => console.warn(err.message));          
}


function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}