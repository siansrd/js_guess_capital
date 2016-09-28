var Marker = function(coords, map) {

  this.marker = new google.maps.Marker({ 
    position: coords, 
    map: map 
  })
}
