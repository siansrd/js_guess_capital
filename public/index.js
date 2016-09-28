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
    var guess = document.querySelector('#guess');
    guess.innerText = "You guessed " + input.value;
    if (input.value > countryInPlay.population - 5000 && input.value < countryInPlay.population + 5000) {
      result.innerText = "Good enough, the population is " + countryInPlay.population.toLocaleString()
    } 
    else if (input.value > countryInPlay.population - 500000 && input.value < countryInPlay.population + 500000) {
      result.innerText = "You are within 500000 of the correct answer! Try again!"
    } 
    else if (input.value > countryInPlay.population - 1000000 && input.value < countryInPlay.population + 1000000) {
      result.innerText = "You are within 1000000 of the correct answer! Try again!"
    } 
    else {
      result.innerText = "Wrong."
    }
    input.value ="";
  }

  var container = document.getElementById('map');
  var center = { lat: countryInPlay.latlng[0], lng: countryInPlay.latlng[1] };
  var map = new Map(container, center, 4);
  map.addMarker(center);
  var lower = countryInPlay.population - 1000000;
  var upper = countryInPlay.population + 1000000;
  var hint = "Hint! It's between " + lower.toLocaleString() + " and " + upper.toLocaleString();
  var infowindow = new InfoWindow(hint, map.marker.marker);
  console.log("map marker", map.marker)
  map.marker.marker.addListener('click', function() {
    infowindow.infowindow.open(map, map.marker.marker)
  })
  // map.marker.onclick = hint;
  console.log(map);


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