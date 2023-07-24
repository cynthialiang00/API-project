import React from "react";
import { useState } from "react";
import { thunkEditBooking } from "../../../../store/booking";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";

import '../../../Spots/SpotShow/SpotShow.css';


function EditBookingForm ({ handleSetNumDays, numDays, user, bookingId }) {
    
    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleCheckIn = (e) => {
        console.log("CHECK IN DATE: ", e.target.value)
        setStartDate(e.target.value);
        return;
    }

    const handleCheckOut = (e) => {
        console.log("CHECK OUT DATE: ", e.target.value)
        setEndDate(e.target.value);
        return;
    }

    const calculateDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffStartEnd = end.getTime() - start.getTime();

        return diffStartEnd / (1000 * 3600 * 24);
    };


    if (startDate && endDate) {
        const numOfDays = calculateDays(startDate, endDate);
        handleSetNumDays(numOfDays);
    };

    const handleSubmitDates = (e) => {
        e.preventDefault();

        const newBooking = JSON.stringify({
            startDate: startDate,
            endDate: endDate
        });

        const editBooking = dispatch(thunkEditBooking(bookingId, newBooking))
                                .then((res) => {
                                    if (res.statusCode === 400) {
                                        return alert(`${res.message}`)
                                    }

                                    if (!res.statusCode) {
                                        alert(`Successfully changed your booking!`)
                                        return closeModal();
                                    }
                                    return;
                                })

    };

    return (
        <form className="reserve-form"
              onSubmit={handleSubmitDates}
        >

            <div className="reserve-form-inputs">
                <div className="reserve-form-date">
                    <label for="checkin">Check in:</label>

                    <input type="date" id="checkin" name="book-checkin"
                        onChange={handleCheckIn}
                    >
                            
                    </input>
                </div>

                <div className="reserve-form-date">
                    <label for="checkout">Check out:</label>

                    <input type="date" id="checkout" name="book-checkout"
                        onChange={handleCheckOut}
                    >
                            
                    </input>
                </div>
            </div>

            <button className="reserve-form-edit-btn"
                    disabled={numDays === 0 || !user}
                    type="submit"
            >
                Edit Reservation
            </button>
        </form>
    )
}

export default EditBookingForm;


