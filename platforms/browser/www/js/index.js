

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
            zoom: 13 
        };
        
        var map = new google.maps.Map(document.getElementById("map"),mapOptions);

    }


}





