import React from "react";
import { useEffect, useState } from "react";
import GMap from "./SpotShow/GMap/Gmap";

function SpotFormGeocode({ address, city, state, lat, lng, setLat, setLng }) {

    let addrSplit;

    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    if (address) addrSplit = address.split(" ");
    
    useEffect(() => {
        if (address && city && state) {
        const addr = fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addrSplit[0]}%20${addrSplit[1]}%20${addrSplit[2]}%20${city}%20${state}&key=${googleMapsApiKey}`)
            .then((res) => res.json())
            .then((parsedRes) => 
                {
                if (parsedRes.status === 'OK') {
                    setLat(+parsedRes.results[0].geometry.location.lat)
                    setLng(+parsedRes.results[0].geometry.location.lng)
                    return;
                }
                else {
                    return;
                }
                }

            )
        }
    }, [addrSplit, city, state]);



    return (
        <div className="spot-map-section">
            <div>Find lat, lng coordinates</div>
            {
                !lat || !lng ?
                <div id="invalid-geocode"> 
                    Invalid coordinates, try a different address
                </div>
                :
                <div id="valid-geocode"> 
                        <div>{`lat: ${lat}`}</div>
                        <div>{`lng: ${lng}`}</div>
                    
                </div>
            }

            { lat && lng ?
                <GMap spotLat={lat} spotLng={lng} />
              :
              null
            }
            
        </div>

    )
};

export default SpotFormGeocode;