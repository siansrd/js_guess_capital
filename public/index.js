var countries = null;

var requestComplete = function() {
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var data = JSON.parse(jsonString); 
  countries = data;
}
// the context of requestComplete is where it is invoked - in make request
var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var getCountry = function(){
  var country = countries[Math.floor(Math.random() * countries.length) + 1];
  return country;
}


var handlePlayButtonClick = function(){
  var countrySpan = document.querySelector('span');
  var countryInPlay = getCountry();
  countrySpan.innerText = countryInPlay.name;

  var submitButton = document.querySelector('#submit');
  submitButton.onclick = function() {
    var input = document.querySelector('input');
    var result = document.querySelector('#answer');
    if (input.value > countryInPlay.population - 1000 && input.value < countryInPlay.population + 1000) {
      result.innerText = "You are within 1000 of the correct answer! One point!"
    } 
    else if (input.value > countryInPlay.population - 5000 && input.value < countryInPlay.population + 5000) {
      result.innerText = "You are within 5000 of the correct answer! Try again!"
    } 
    else {
      result.innerText = "Wrong."
    }
    input.value ="";
  }

  var container = document.getElementById('map');
  var center = { lat: countryInPlay.latlng[0], lng: countryInPlay.latlng[1] };
  var map = new Map(container, center, 4);

}




var app = function(){
  var url = "http://localhost:5000";
  console.log("before request");
  makeRequest(url, requestComplete);
  console.log("after request");


  var playButton = document.querySelector('#play');
  playButton.onclick = handlePlayButtonClick;
}


window.onload = app;