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
        dispatch(spotActions.thunkGetUserSpots());

    }, [dispatch])

    const allSpotsArr = Object.values(allSpotsObj);


}

export default SpotManage;