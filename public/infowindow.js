var InfoWindow = function(string, marker){

  this.infowindow = new google.maps.InfoWindow({
    content: string
  });
  this.marker = marker

}