import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetUserBookings } from "../../../store/booking";
import UserBookingCard from "./UserBookingCard";

function UserBookings ({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const userBookings = useSelector(state => state.bookings.user);

    useEffect(() => {
        dispatch(thunkGetUserBookings());
    }, [dispatch]);

    const userBookingsArr = Object.values(userBookings);

    
    if (!user) {
        return history.push("/not-found");
    };


    return (
        <div className="user-bookings-wrapper">
            {userBookingsArr.length > 0 ?
                userBookingsArr.map((booking) => (
                    <UserBookingCard key={booking.id} booking={booking} user={user}/>
                ))
                :
                <h2> No Bookings. </h2>
            }
        </div>

    )
}

export default UserBookings;