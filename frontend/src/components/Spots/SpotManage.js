import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spot';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "./DeleteModal";
import './Spots.css';

function SpotManage() {
    const dispatch = useDispatch();
    const allSpotsObj = useSelector(state => state.spots.allSpots)

    useEffect(() => {
        console.log("use effect triggered")
        dispatch(spotActions.thunkGetUserSpots());

    }, [dispatch])

    const allSpotsArr = Object.values(allSpotsObj);



    return (
        <div className="spots-content">
            <div className="spots-page-header">
                <h2>Manage Your Spots</h2>
                <button className="small-button" >
                    <NavLink className="button-link" to="/spots/new">Create a New Spot</NavLink>
                </button>
            </div>
            <div className="spots-grid">
                {allSpotsArr.map((spot) => (
                    <div key={spot.id} className="spot-container" title={`${spot.city}, ${spot.state}`}>
                        <NavLink exact to={`/spots/${spot.id}`} className="spot-link">
                            <img className="spot-image" src={`${spot.previewImage}`} alt={`Preview of ${spot.address}`}></img>
                            <div className="spot-description">
                                <div className="spot-title">{`${spot.city}, ${spot.state}`}</div>
                                <div className="spot-price">{`$${spot.price} night`}</div>
                                <span className="avg-rating-container">
                                    <span className="avg-rating-star">
                                        <i className="fa-solid fa-star"></i>
                                    </span>
                                    <span className="avg-rating-rating">
                                        {spot.avgRating === "No Reviews exist for this spot" ? `New` : `${spot.avgRating}`}
                                    </span>

                                </span>
                            </div>
                        </NavLink>

                        <div className="update-button">
                            <button className="small-button" >
                                <NavLink className="button-link" to={`${spot.id}/edit`}>Update</NavLink>
                            </button>
                        </div>
                        <div className="update-button">
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteModal id={spot.id} />}
                            />
                        </div>
                    </div>

                ))}
            </div>
        </div>

    )
}

export default SpotManage;