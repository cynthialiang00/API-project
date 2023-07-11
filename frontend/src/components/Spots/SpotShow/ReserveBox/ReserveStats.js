import React from "react";

import '../SpotShow.css';

function ReserveStats({ spot }) {

    return (
            <div className="reserve-stats">

                <div className="reserve-stats-price-details">

                    <span>{`$${spot.price}`}</span>
                    <span>night</span>

                </div>

                <div className="reserve-stats-rvw-details">

                    <div className="reserve-stats-rvw-details-avg-rating">

                        <i className="fa-solid fa-star"></i>

                        {spot.avgStarRating === "0.0" ?
                            `New`
                            :
                            `${spot.avgStarRating}`
                        }

                    </div>

                    {spot.numReviews && spot.numReviews > 0 ?
                        <div id="reserve-stats-rvw-details-dot"> · </div>
                        :
                        null
                    }

                    {
                        spot.numReviews && spot.numReviews > 1 ?
                            <div className="reserve-stats-rvw-details-num-reviews">
                                {`${spot.numReviews} reviews`}
                            </div>
                            : spot.numReviews && spot.numReviews === 1 ?
                                <div className="reserve-stats-rvw-details-num-reviews">
                                    {`${spot.numReviews} review`}
                                </div>
                                :
                                null

                    }

                </div>


        </div>
    )
}

export default ReserveStats;


