var Map = function(container, coords, zoom) {

  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.marker = null

}

Map.prototype = {

  addMarker: function(coords) {
    var marker = new Marker( coords, this.googleMap )
    this.marker = marker
  }
}