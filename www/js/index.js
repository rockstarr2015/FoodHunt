

function findLocation(){
    return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition((location)=>{
            if(location){
                resolve(location.coords);

            }
            else{
                reject("error");
            }
        })
    })
    
}

var initMap = function(){
 
    findLocation().then((data)=>{
       return drawMap(data);
    });

    function drawMap(location){

        var mapOptions = {
            center: {lat:location.latitude , lng: location.longitude},
            zoom:  14,
            styles:[
                      {
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#ebe3cd"
                          }
                        ]
                      },
                      {
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#523735"
                          }
                        ]
                      },
                      {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                          {
                            "color": "#f5f1e6"
                          }
                        ]
                      },
                      {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                          {
                            "color": "#c9b2a6"
                          }
                        ]
                      },
                      {
                        "featureType": "administrative.land_parcel",
                        "elementType": "geometry.stroke",
                        "stylers": [
                          {
                            "color": "#dcd2be"
                          }
                        ]
                      },
                      {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#ae9e90"
                          }
                        ]
                      },
                      {
                        "featureType": "landscape.natural",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#dfd2ae"
                          }
                        ]
                      },
                      {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#dfd2ae"
                          }
                        ]
                      },
                      {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#93817c"
                          }
                        ]
                      },
                      {
                        "featureType": "poi.park",
                        "elementType": "geometry.fill",
                        "stylers": [
                          {
                            "color": "#a5b076"
                          }
                        ]
                      },
                      {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#447530"
                          }
                        ]
                      },
                      {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#f5f1e6"
                          }
                        ]
                      },
                      {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#fdfcf8"
                          }
                        ]
                      },
                      {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#f8c967"
                          }
                        ]
                      },
                      {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                          {
                            "color": "#e9bc62"
                          }
                        ]
                      },
                      {
                        "featureType": "road.highway.controlled_access",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#e98d58"
                          }
                        ]
                      },
                      {
                        "featureType": "road.highway.controlled_access",
                        "elementType": "geometry.stroke",
                        "stylers": [
                          {
                            "color": "#db8555"
                          }
                        ]
                      },
                      {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#806b63"
                          }
                        ]
                      },
                      {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#dfd2ae"
                          }
                        ]
                      },
                      {
                        "featureType": "transit.line",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#8f7d77"
                          }
                        ]
                      },
                      {
                        "featureType": "transit.line",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                          {
                            "color": "#ebe3cd"
                          }
                        ]
                      },
                      {
                        "featureType": "transit.station",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#dfd2ae"
                          }
                        ]
                      },
                      {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                          {
                            "color": "#b9d3c2"
                          }
                        ]
                      },
                      {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#92998d"
                          }
                        ]
                      }
                    ],
            disableDefaultUI: true


        };

        var pyrmont = new google.maps.LatLng(location.latitude,location.longitude);

         var request = {
            location: pyrmont,
            radius: '500',
            type: ['restaurant']
          };
        
        var map = new google.maps.Map(document.getElementById("map"),mapOptions);

        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, (result,status)=>{
            if (status == google.maps.places.PlacesServiceStatus.OK) {

                //creating marker 
                result.forEach(function(data,index){
                    setTimeout(function(){
                        createMarker(data);
                    }, index*200)
                    
                })
              }
        });

        function createMarker(data){
            
            var myLatLng = {lat: data.geometry.viewport.f.b, lng: data.geometry.viewport.b.b};
            

            var contentString = `<div id="content">
                                    <div id="contentHead">
                                        <center>Content Head</center>
                                    </div>

                                    <div id="contentMain">
                                        <p>location description....</p>
                                    </div>

                                </div>`


            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });


            

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map, 
                animation: google.maps.Animation.DROP,
                title: data.name
            });
          
            //adding markert to map
            marker.addListener('click', function(event) {
                
                console.log("marker is clicked...");
                //display the data 
                displayInfo(data);
               
            });
            
        }


    }



}

var displayInfo = function(data){

    console.log(data.name);
    console.log("displaying marker information");
}





