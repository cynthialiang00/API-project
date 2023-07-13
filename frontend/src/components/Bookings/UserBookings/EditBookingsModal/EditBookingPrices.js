import React from "react";

import '../../../Spots/SpotShow/SpotShow.css';

function EditBookingPrices ({numDays, price}) {

    const cleaningFee = 75;
    const servFee = 40;

    return (
        <div className="reserve-prices-preview">

            <div id="reserve-prices-preview-message">
                You won't be charged yet
            </div>

            <div className="reserve-prices-preview-price-line">
                <div>

                    {numDays === 1 ?
                        `$${price} x ${numDays} night`
                    :
                        `$${price} x ${numDays} nights`
                    }
                </div>
                <div>
                    {`$${price * numDays}`}
                </div>
            </div>
            <div className="reserve-prices-preview-price-line">
                <div>
                    Cleaning Fee
                </div>
                <div>
                    {`$${cleaningFee}`}
                </div>
            </div>
            <div className="reserve-prices-preview-price-line">
                <div>
                    Service Fee
                </div>
                <div>
                    {`$${servFee}`}
                </div>
            </div>

            <div id="reserve-prices-preview-divider"></div>

            <div className="reserve-prices-preview-price-total">
                <div>
                    Total
                </div>
                <div>
                    {`$${(price*numDays)+cleaningFee+servFee}`}
                </div>
            </div>

        </div>
    )
}

export default EditBookingPrices;


