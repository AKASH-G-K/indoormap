import { E_SDK_EVENT, MappedinLocation, MappedinPolygon, showVenue, TGetVenueOptions } from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import useMapView from "./common/useMapView";
import useVenue from "./common/useVenue";
import './style.css';
import { getVenue, Mappedin } from "@mappedin/mappedin-js";
import Search from "./components/Search";
import Form from "./components/form";


export default function App() {
  
  const options = useMemo<TGetVenueOptions>(
    () => ({
      venue: "mappedin-demo-mall",
      clientId: "5eab30aa91b055001a68e996",
      clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1"
    }),
    []
  );
  
  const venue = useVenue(options);
  const { elementRef, mapView } = useMapView(venue,{
    dynamicFocus: {
      baseMap: venue?.maps[0],
    }});
  console.log(venue?.venue);

  useEffect(()=>{
   if(mapView){
    mapView.FloatingLabels.labelAllLocations({interactive:true});
    mapView.on(E_SDK_EVENT.CLICK,({floatingLabels}) =>{
      if(floatingLabels && floatingLabels.length>0){
        mapView.setPolygonColor(floatingLabels[0].node?.polygon as MappedinPolygon,"red");
      }else{
        mapView.clearAllPolygonColors();
      }
    })
   }
  },[mapView])

  useEffect(()=>{
    if(mapView){
      mapView.on(E_SDK_EVENT.CLICK,()=>{});
    
    }
  })

  return (
    <div id="app">
      {/* <Search venue={venue} mapview={mapView}/> */}
      <Form venue={venue} mapview={mapView} />

      
      <div id="map-container" ref={elementRef}></div>
    </div>
  );
}
