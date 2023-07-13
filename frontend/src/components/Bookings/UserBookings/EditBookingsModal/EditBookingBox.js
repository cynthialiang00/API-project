import React, { useState } from "react";

import EditBookingStats from "./EditBookingStats";
import EditBookingForm from "./EditBookingForm";
import EditBookingPrices from "./EditBookingPrices";

import '../../../Spots/SpotShow/SpotShow.css';

function EditBookingBox({bookingId, spot, user}) {

    const [numDays, setNumDays] = useState(0);

    const handleSetNumDays = (numOfDays) => {
        setNumDays(numOfDays);
        return;
    }

    
    return(
        <div className="reserve-box">
            <EditBookingStats spot={spot}/>
            
            <EditBookingForm handleSetNumDays={handleSetNumDays} numDays={numDays} user={user} bookingId={bookingId}/>

            {
                numDays > 0 ?
                    <EditBookingPrices numDays={numDays} price={spot.price}/>
                :
                null
            }
            
        </div>
    )
}

export default EditBookingBox;


