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

var getCountryName = function(){
  var country = countries[Math.floor(Math.random() * countries.length) + 1];
  return country.name;
}

var handlePlayButtonClick = function(){
  var country = document.querySelector('span');
  country.innerText = getCountryName();
}


var app = function(){
  var url = "https://restcountries.eu/rest/v1";
  console.log("before request");
  makeRequest(url, requestComplete);
  console.log("after request");
  var playButton = document.querySelector('#play');
  playButton.onclick = handlePlayButtonClick;

}


window.onload = app;