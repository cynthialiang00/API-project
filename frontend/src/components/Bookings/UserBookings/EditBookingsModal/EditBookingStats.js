import React from "react";

import '../../../Spots/SpotShow/SpotShow.css';

function EditBookingStats({ spot }) {

    return (
            <div className="reserve-stats">

                <div className="reserve-stats-price-details">

                    <span>{`$${spot.price}`}</span>
                    <span>night</span>

                </div>

                

            </div>
    )
}

export default EditBookingStats;


