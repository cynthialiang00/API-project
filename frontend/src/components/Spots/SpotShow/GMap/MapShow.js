import React from "react";
import { useEffect, useState } from "react";
import GMap from "./Gmap";

function MapShow({ spot }) {

    const [addr, setAddr] = useState();

    const spotLat = spot.lat;
    const spotLng = spot.lng; 
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    
    useEffect(() => {
        const addr = fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${spotLat},${spotLng}&key=${googleMapsApiKey}`)
            .then((res) => res.json())
            .then((parsedRes) => (
                setAddr(parsedRes.results[4].formatted_address)
            ))
    }, []);



        

    
    return (
        <div className="spot-map-section">
            <div>Where you'll be</div>
            <GMap spotLat={spotLat} spotLng={spotLng} />
            <div>
                {addr}
            </div>
        </div>

    )
};

export default MapShow;