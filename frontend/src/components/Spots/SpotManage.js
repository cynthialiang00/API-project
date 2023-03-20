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
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    useEffect(() => {
        dispatch(spotActions.thunkGetUserSpots());

    }, [dispatch, sessionUser, allSpotsObj])

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
            <div className="spots-page-header">
                <h2>Manage Your Spots</h2>
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


                            <span className="spot-util-button">
                                <button >
                                    <NavLink className="button-link" to={`${spot.id}/edit`}>Update</NavLink>
                                </button>
                            </span>
                            
                        
                            <span className="spot-util-button">
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeleteModal id={spot.id} />}
                                />
                            </span>
                        
                    </div>

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

export default SpotManage;