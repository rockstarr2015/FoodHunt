

var getLocation = function(){
    return new Promise((resolve,reject)=>{

        $.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCwvRpYYHOPhZCAXX-rCqFNfdGcr-tnYbo", (data)=>{
            if(data){
                resolve(data);
            }
            else{
                reject("error");
            }
        })

    })
}

var initMap = function(){
    getLocation().then((location)=>{
        if(location){
            drawMap(location);
        }
    });

    function drawMap(location){
        var mapOptions = {
            center: {lat: location.location.lat, lng: location.location.lng},
            zoom: 13 
        };

        var map = new google.maps.Map(document.getElementById("map"),mapOptions);
    }
}



