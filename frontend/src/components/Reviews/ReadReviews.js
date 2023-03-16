import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as rvwActions from '../../store/review';
import { useEffect, useState, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";


function ReadReviews () {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const reviews = useSelector(state=>state.reviews.spot);

    useEffect(() => {
        dispatch(rvwActions.thunkGetRvws(spotId))
    }, [dispatch, spotId])

    const reviewsArr = Object.values(reviews);
    // console.log("arr: ", reviewsArr);

    // reviewsArr.forEach((rvw) => {
    //     const time = new Date(rvw.updatedAt);
    //     rvw.epoch = time.getTime();
    // })
    // console.log("arrEpoch: ", reviewsArr);

    reviewsArr.reverse();

    // takes in json   and returns [Month, year] in array
    const toMonthYear = (updatedAt) => {
        const tempDate = new Date(updatedAt);
        const splitDate = tempDate.toDateString().split(' ');
        return [splitDate[1], splitDate[3]];
    }

    // console.log(toMonthYear(reviewsArr[0].updatedAt))
    return (
        <div>
            <div className="review-head"></div>
            {reviewsArr.map((rvw) => (
                <div key={rvw.id} className="review-container">
                    <div className="review-firstName">{rvw.User.firstName}</div>
                    <div className="review-date">
                        {`${toMonthYear(rvw.updatedAt)[0]}, ${toMonthYear(rvw.updatedAt)[1]}`}
                    </div>
                    <div className="review-body">{rvw.review}</div>
                </div>
            ))}
        </div>
    )

}

export default ReadReviews;