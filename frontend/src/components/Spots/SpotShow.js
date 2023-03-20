import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spot';
import { useEffect, useState, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import OpenReserveMenuItem from "./OpenReserveMenuItem";
import ReserveFormModal from "./ReserveFormModal";



import ReadReviews from "../Reviews/ReadReviews";

import './SpotShow.css';

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
            <>
                <div className="details-content">
                    <div className="spot-header">
                        <div className="spot-title">
                            <h2>{spot.name}</h2>
                        </div>
                        <div className="spot-title">
                            <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
                        </div>
                    </div>
                        {spot.SpotImages.map((img) => (
                            <div key={img.id} className="spot-images">
                                <div className="main-img-container">
                                    <img className="main-pic" src={img.url} alt="spot picture"></img>
                                </div>
                                <div className="img-1-container">
                                    <img className= "small-pic1" src="https://visitkinosaki.com/vkcore/wp-content/uploads/2021/04/about-top-slider1-5.jpg"></img>
                                </div>
                                <div className="img-2-container">
                                    <img className="small-pic2" src="https://photos.smugmug.com/Kyoto/Kinosaki-Onsen/i-JvX4wKT/0/a7cad879/L/shutterstock_645280435-L.jpg"></img>
                                </div>
                                <div className="img-3-container">
                                    <img className="small-pic3" src="https://cdn.jalan.jp/jalan/images/pict3L/Y8/Y371928/Y371928268.jpg"></img>
                                </div>
                                <div className="img-4-container">
                                    <img className="small-pic4" src="https://i0.wp.com/outoftownblog.com/wp-content/uploads/2020/01/Yukata-Rental-with-Sakura-1.jpg?fit=1000%2C1500&ssl=1"></img>
                                </div>
                            </div>
                        ))}
                    
                    <div className="spot-details">
                        <div className="spot-details-head">
                            <h2>Hosted by {`${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
                        </div>
                        <div className="spot-details-body">
                            <p>{`${spot.description}`}</p>
                        </div>
                        <div className="reserve-box">
                            <div className="price-details">
                                <span className="reserve-price">{`$${spot.price}`}</span>
                                <span className="night">night</span>
                            </div>
                            
                            <div className="reserve-rvw-details">
                                <span className="avg-rating-star">
                                    <i className="fa-solid fa-star"></i>
                                </span>
                                <span className="avg-rating-rating">
                                    {spot.avgStarRating === "0.0" ? `New` : `${spot.avgStarRating}`}
                                </span>
                                {spot.numReviews ? <span className="dot">· </span>
                                    : <></>}

                                {spot.numReviews === 1 ?
                                    <span>
                                        {`${spot.numReviews} review`}
                                    </span>
                                    :
                                    <></>
                                }
                                {spot.numReviews > 1 ?
                                    <span>
                                        {`${spot.numReviews} reviews`}
                                    </span>
                                    :
                                    <></>
                                }
                            </div>

                            <div className="reserve-rvw">
                                <OpenReserveMenuItem
                                    itemText="Reserve"
                                    modalComponent={<ReserveFormModal />}
                                />

                            </div>
                        </div>
                    </div>

                    <div className="reviews">
                        <div className="review-head">
                            <h2>
                                <span className="avg-rating-star">
                                    <i className="fa-solid fa-star"></i>
                                </span>
                                 <span className="avg-rating-rating">
                                    {spot.avgStarRating === "0.0" ? `New` : `${spot.avgStarRating}`}
                                 </span>
                                    

                                {spot.numReviews ? <span className="dot">· </span>
                                : <></>}

                                {spot.numReviews === 1 ?
                                    <span>
                                        {`${spot.numReviews} review`}
                                    </span>
                                :
                                    <></>
                                }
                                {spot.numReviews > 1 ?
                                    <span>
                                        {`${spot.numReviews} reviews`}
                                    </span>
                                :
                                    <></>
                                }
                            </h2>
                        </div>
                        
                        <ReadReviews isOwner={sessionUser && sessionUser.id === spot.Owner.id}/>
                    </div>
                </div>

            </>
    )}
    else return (
        <>
        </>
    )
}

export default SpotShow;