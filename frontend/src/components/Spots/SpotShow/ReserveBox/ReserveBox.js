import React, { useState } from "react";
import ReserveStats from './ReserveStats'
import ReserveForm from "./ReserveForm";
import ReservePrices from "./ReservePrices";

import '../SpotShow.css';

function ReserveBox({spot, user}) {

    const [numDays, setNumDays] = useState(0);

    const handleSetNumDays = (numOfDays) => {
        setNumDays(numOfDays);
        return;
    }

    
    return(
        <div className="reserve-box">
            <ReserveStats spot={spot}/>
            
            <ReserveForm handleSetNumDays={handleSetNumDays} numDays={numDays} user={user} spotId={spot.id}/>

            {
                numDays > 0 ?
                    <ReservePrices numDays={numDays} price={spot.price}/>
                :
                null
            }
            
        </div>
    )
}

export default ReserveBox;


