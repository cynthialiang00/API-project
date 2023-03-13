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
    
    
    return (
        <>
        <button onClick={spotTest}>
            Get Spots
        </button>
        </>
    )
}

export default Spots;