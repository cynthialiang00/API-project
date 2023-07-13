import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../../store/spot';
import { useEffect } from "react";
import { useParams } from "react-router-dom";



import ReadReviews from "./Reviews/ReadReviews";

import './SpotShow.css';
import ReserveBox from "./ReserveBox/ReserveBox";

function SpotShow() {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    
    const spot = useSelector(state=>state.spots.singleSpot)
    const sessionUser = useSelector(state => state.session.user);

    const reviews = useSelector(state => state.reviews.spot);
    const newestReview = useSelector(state => state.reviews.new);    


    useEffect(() => {
        dispatch(spotActions.thunkGetSpotDetail(spotId));
    }, [dispatch, spotId, reviews, newestReview])

    if (Object.keys(spot).length) {
        return (
                <div className="details-content">
                    <div className="spot-header">
                        <h2>{spot.name}</h2>
                        <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
                    </div>

                    <div className="spot-images">
                        {spot.SpotImages.map((img, index) => (
                            
                            <div key={img.id} className={`img-${index}-container`}>
                                <img className={`pic-${index}`} src={img.url} alt="spot preview"></img>
                            </div>

                        ))}
                    </div>

                    
                    
                    <div className="spot-details-wrapper">

                        <div className="spot-details-content">
                            <div className="spot-details-owner">
                                Hosted by {`${spot.Owner.firstName} ${spot.Owner.lastName}`}
                            </div>
                            <div className="spot-details-body">
                                <p>{`${spot.description}`}</p>
                            </div>
                        </div>
                        
                        {
                            spot.ownerId !== sessionUser.id ?
                                <ReserveBox spot={spot} user={sessionUser} />  
                            :
                            null

                        }
                        
                    </div>

                    

                     

                    <div className="reviews">
                        <h3 className="reviews-head">
                                <span className="reviews-avg-rating-star">
                                    <i className="fa-solid fa-star"></i>
                                </span>
                                 <span className="reviews-avg-rating">
                                    {spot.avgStarRating === "0.0" ? `New` : `${spot.avgStarRating} `}
                                 </span>
                                    

                                {
                                    spot.numReviews && spot.numReviews > 0 ? 
                                        <span>·</span>
                                    : 
                                    null
                                }

                                {
                                    spot.numReviews && spot.numReviews > 1 ?
                                        <span>
                                            {` ${spot.numReviews} reviews`}
                                        </span>
                                    : spot.numReviews && spot.numReviews === 1 ?
                                        <span>
                                            {` ${spot.numReviews} review`}
                                        </span>
                                    :
                                    null

                                }

                                
                        </h3>
                        
                        <ReadReviews isOwner={sessionUser && sessionUser.id === spot.Owner.id}/>
                    </div>
                </div>

    )}
    else return (
        <>
        </>
    )
}

export default SpotShow;