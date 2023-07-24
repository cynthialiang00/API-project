import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import './GMap.css';

function GMap({spotLat, spotLng}) { 
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });
    const center = useMemo(() => ({ lat: spotLat, lng: spotLng }), [spotLat, spotLng]);

    // console.log("MAPLAT: ", spotLat)
    // console.log("MAPLNG: ", spotLng)

    return (
        <div className="spot-google-map">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={15}
                >
                    <Marker position={center}/>

                </GoogleMap>

                
            )}
        </div>
    );
};

export default GMap;