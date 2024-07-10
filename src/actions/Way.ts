import { Mappedin, MapView, MappedinLocation } from "@mappedin/mappedin-js";


const path=(venue:Mappedin, mapView:MapView) =>{
    if(venue && mapView){
      const startLocation =venue.locations.find(
        (location:MappedinLocation) => location.name==="DSW"
      );
      const endLocation = venue.locations.find((location:MappedinLocation) => location.name ==="Safe");
      if(startLocation && endLocation){
        const directions =  startLocation.directionsTo(endLocation);
        mapView.Journey.draw(directions , {
          pathOptions:{
            color:"orange"
          }
        })
      }
    }
};
export default path;