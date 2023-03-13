import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spot';
import { useEffect, useState } from "react";
function Spots () {
    const dispatch = useDispatch();
    const allSpotsObj = useSelector(state=>state.spots.allSpots)

    useEffect(() => {
        dispatch(spotActions.thunkGetSpots());
        
    }, [dispatch])

    const allSpotsArr = Object.values(allSpotsObj);
    console.log(`spotsObj: `, allSpotsObj)
    console.log(`spotsArr: `, allSpotsArr)
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
        <div className="spots-display">
        {allSpotsArr.map((spot) => (
            <img className={`${spot.id}-image`} src={`${spot.previewImage}`} alt={`Preview of ${spot.address}`}></img>
        ))}
        {/* <button onClick={spotTest}>
            Get Spots
        </button>
        <button onClick={userTest}>
            Get Spots of Current User
        </button> */}
        </div>
    )
}

export default Spots;