import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spot';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './Spots.css';

function Spots () {
    const dispatch = useDispatch();
    const allSpotsObj = useSelector(state=>state.spots.allSpots)

    useEffect(() => {
        dispatch(spotActions.thunkGetSpots());
        
    }, [dispatch])

    const allSpotsArr = Object.values(allSpotsObj);
    // console.log(`spotsObj: `, allSpotsObj)
    // console.log(`spotsArr: `, allSpotsArr)
    // const spotTest = (e) => {
    //     e.preventDefault();
    //     dispatch(spotActions.thunkGetSpots());
    //     console.log(spots)
    // }
    
    // const userTest = (e) => {
    //     e.preventDefault();
    //     dispatch(spotActions.thunkGetUserSpots());
    //     console.log(spots)
    // }

    return (
        <div className="spots-content">

            <div className="spots-grid">

                {allSpotsArr.map((spot) => (

                    <NavLink key={spot.id} exact to={`/spots/${spot.id}`} className="spot-container" title={`${spot.city}, ${spot.state}`}>
                            
                            <img className="spot-image" src={`${spot.previewImage}`} alt={`Preview of ${spot.address}`}></img>

                            <div className="spot-description">

                                <div className="spot-description-stats">
                                    <div className="spot-description-title">{`${spot.city}, ${spot.state}`}</div>

                                    <span className="avg-rating-container">
                                        <span className="avg-rating-star">
                                            <i className="fa-solid fa-star" style={{color: "#222222"}}></i>
                                        </span>
                                        <span className="avg-rating-rating">
                                            {spot.avgRating === "No Reviews exist for this spot" ? `New` : `${spot.avgRating}`}
                                        </span>

                                    </span>
                                </div>

                                <div className="spot-description-price">{`$${spot.price} night`}</div>

                                
                            </div>
                            
                    </NavLink>

                ))}

            </div>

        </div>
        // {/* <button onClick={spotTest}>
        //     Get Spots
        // </button>
        // <button onClick={userTest}>
        //     Get Spots of Current User
        // </button> */}
        
    )
}

export default Spots;