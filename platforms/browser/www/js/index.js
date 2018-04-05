

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
            zoom:  16
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
                result.forEach(function(d){
                    createMarker(d);
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

            console.log(infowindow);

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Hello World!'
            });
          
            marker.addListener('click', function() {
            infowindow.open(map, marker);
            });
            
        }


    }

    


}





