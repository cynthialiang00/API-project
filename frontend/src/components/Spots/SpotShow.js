import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spot';
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import './SpotShow.css';

function SpotShow() {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state=>state.spots.singleSpot)

    useEffect(() => {
        dispatch(spotActions.thunkGetSpotDetail(spotId));
    }, [dispatch])

    return (
        <>
            <div className="test">
                <h1>{spot.name}</h1>
            </div>
        </>
    )
}

export default SpotShow;