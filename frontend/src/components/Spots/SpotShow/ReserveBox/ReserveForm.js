import React from "react";
import { useState } from "react";


import '../SpotShow.css';

function ReserveForm({ handleSetNumDays }) {
    

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
    }

    console.log("DAYS BETWEEN: ", calculateDays(startDate, endDate));

    if (startDate && endDate) {
        const numOfDays = calculateDays(startDate, endDate);
        handleSetNumDays(numOfDays);
    }

    return (
        <form className="reserve-form">

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

            <button className="reserve-form-submit-btn">
                Reserve
            </button>
        </form>
    )
}

export default ReserveForm;

