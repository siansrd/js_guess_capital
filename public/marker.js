var markerIcon = {
  url: "http://www.iconsdb.com/icons/preview/deep-pink/question-mark-4-xxl.png",
  scaledSize: new google.maps.Size(40, 40)

}


var Marker = function(coords, map) {

  this.marker = new google.maps.Marker({ 
    position: coords, 
    map: map,
    icon: markerIcon
   

  })
}

