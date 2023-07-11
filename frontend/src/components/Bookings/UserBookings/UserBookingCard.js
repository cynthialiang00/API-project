import React from "react";
import './bookings.css';
import OpenModalButton from "../../OpenModalButton";
import { useDispatch } from "react-redux";
import { thunkDeleteUserBooking } from "../../../store/booking";

function UserBookingCard({booking, user}) {
    const moment = require('moment');
    const dispatch = useDispatch();
    
    const handleDeleteBooking = async (e) => {
        e.preventDefault();

        await dispatch(thunkDeleteUserBooking(booking.id));

        return;

    }


    return (
        <div className="user-bookings-card-wrapper">

            <img className="user-bookings-card-image"
                 src={booking.Spot.previewImage}
                 alt="preview spot"
            >
            </img>

            <div className="user-bookings-card-details">
                <div className="user-bookings-card-details-spot-name">
                    {`${booking.Spot.name}`}
                </div>

                <div className="user-bookings-card-details-dates">
                    {`${moment(booking.startDate).format("MMM D")} - ${moment(booking.endDate).format("MMM D")}`}
                </div>

                
            </div>
            
            <div className="user-bookings-card-btns-wrapper">
                <OpenModalButton 
                    id={"user-bookings-card-edit-btn"}
                    buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                />
                {/* <button id="user-bookings-card-edit-btn">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button> */}
                <button id="user-bookings-card-cancel-btn"
                        onClick={handleDeleteBooking}
                >
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>
            </div>
            
        </div>

    )
}

export default UserBookingCard;