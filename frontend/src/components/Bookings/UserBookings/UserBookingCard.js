import React from "react";
import './bookings.css';


function UserBookingCard({booking}) {
    
    const bookingStartDate = new Date(booking.startDate);
    const bookingEndDate = new Date(booking.endDate);


    return (
        <div className="user-bookings-card-wrapper">

            <img className="user-bookings-card-image"
                 src={booking.Spot.previewImage}
                 alt="preview spot"
            >
            </img>

            <div className="user-bookings-card-details">
                <div className="user-bookings-card-details-dates">

                </div>

                <div className="user-bookings-card-details-spot-name">

                </div>
            </div>
        </div>

    )
}

export default UserBookingCard;