import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spot';

function Spots () {
    const dispatch = useDispatch();
    const spots = useSelector(state=>state.spots)

    const spotTest = (e) => {
        e.preventDefault();
        dispatch(spotActions.thunkGetSpots());
        console.log(spots)
    }
    
    const userTest = (e) => {
        e.preventDefault();
        dispatch(spotActions.thunkGetUserSpots());
        console.log(spots)
    }
    return (
        <>
        <button onClick={spotTest}>
            Get Spots
        </button>
        <button onClick={userTest}>
            Get Spots of Current User
        </button>
        </>
    )
}

export default Spots;