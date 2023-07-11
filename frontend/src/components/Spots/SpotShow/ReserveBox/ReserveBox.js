import React, { useState } from "react";
import ReserveStats from './ReserveStats'
import ReserveForm from "./ReserveForm";
import ReservePrices from "./ReservePrices";

import '../SpotShow.css';

function ReserveBox({spot}) {

    const [numDays, setNumDays] = useState(0);

    const handleSetNumDays = (numOfDays) => {
        setNumDays(numOfDays);
        return;
    }

    console.log("RESERVE BOX NUM DAYS: ", numDays);
    
    return(
        <div className="reserve-box">
            <ReserveStats spot={spot}/>
            
            <ReserveForm handleSetNumDays={handleSetNumDays}/>

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


