import React from "react";
import './bookings.css';
import OpenModalButton from "../../OpenModalButton";
import { useDispatch } from "react-redux";
import { thunkDeleteUserBooking } from "../../../store/booking";
import EditBookingBox from "./EditBookingsModal/EditBookingBox";
import DeleteBookingsModal from "../DeleteBookingsModal/DeleteBookingsModal";

function UserBookingCard({booking, user}) {
    const moment = require('moment');
    const dispatch = useDispatch();
    const dateNow = new Date();

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
                    {`${moment(booking.startDate.split("T")[0]).format("MMM D")}
                        - ${moment(booking.endDate.split("T")[0]).format("MMM D")}`}
                    
                </div>

                
            </div>

            {
                booking.startDate > dateNow ?
                    <div className="user-bookings-card-btns-wrapper">
                        <OpenModalButton
                            id={"user-bookings-card-edit-btn"}
                            buttonText={"Edit"}
                            modalComponent={<EditBookingBox bookingId={booking.id} spot={booking.Spot} user={user} />}
                        />

                        <OpenModalButton
                            id={"user-bookings-card-delete-btn"}
                            buttonText={"Delete"}
                            modalComponent={<DeleteBookingsModal bookingId={booking.id} />}
                        />
                    </div>
                :
                    null

            }
            
            
            
        </div>

    )
}

export default UserBookingCard;