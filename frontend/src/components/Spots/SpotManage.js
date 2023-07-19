import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spot';
import { useEffect} from "react";
import { NavLink, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "./DeleteModal";
import './Spots.css';

function SpotManage({user}) {
    const dispatch = useDispatch();
    const allSpotsObj = useSelector(state => state.spots.allSpots)
    const history = useHistory();

    useEffect(() => {
        dispatch(spotActions.thunkGetUserSpots());

    }, [dispatch])

    const editSpotHandler = (e, spotId) => {
        e.preventDefault();
        return history.push(`/spots/${spotId}`);
    }



    const allSpotsArr = Object.values(allSpotsObj);

    if (!user) {
        return history.push("/not-found");
    };

    if (allSpotsObj.undefined) {
        return (
            <div className="spots-content">
                <div className="spots-page-header">
                    <h2>Manage Your Spots</h2>
                    {allSpotsObj.undefined ?
                    <div className="spot-util-button">
                            <button  >
                                <NavLink className="button-link" to="/spots/new">Create a New Spot</NavLink>
                            </button>
                    </div>
                        
                        :
                        <></>
                    }

                </div>
            </div>
        )
    }


    
    return (
        <div className="spots-content">
            
            <h2 id="spots-content-header">
                Manage Your Listings
            </h2>

            <div className="spots-grid">
                {allSpotsArr.map((spot) => (
                    
                    <div key={spot.id} 
                         className="spot-container" 
                         title={`${spot.city}, ${spot.state}`}
                    >
                            
                            <img className="spot-image" src={`${spot.previewImage}`} alt={`Preview of ${spot.address}`}></img>

                            <div className="spot-description">

                                <div className="spot-description-stats">
                                    <div className="spot-description-title">{`${spot.city}, ${spot.state}`}</div>

                                    <span className="avg-rating-container">
                                        <span>
                                            <i className="fa-solid fa-star"></i>
                                        </span>
                                        <span className="avg-rating-rating">
                                            {spot.avgRating === "No Reviews exist for this spot" ? `New` : `${spot.avgRating}`}
                                        </span>

                                    </span>
                                </div>

                                <div className="spot-description-price">
                                    <span>{`$${spot.price} `}</span>
                                    <span>night</span>
                                </div>

                                
                            </div>

                            <div className="spot-btns">
                                <button id="spot-edit-btn"
                                        onClick={(e) => editSpotHandler(e, spot.id)}
                                >
                                    Edit
                                </button>

                                <OpenModalButton
                                    id={"spot-delete-btn"}
                                    buttonText={"Delete"}
                                    modalComponent={<DeleteModal spotId={spot.id}/>}
                                />
                            </div>
                            
                    </div>


                    
                ))}
            </div>
        </div>

    )
}

export default SpotManage;