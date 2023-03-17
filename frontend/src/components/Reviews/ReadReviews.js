import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as rvwActions from '../../store/review';
import { useEffect} from "react";
import { useParams } from "react-router-dom";


function ReadReviews () {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const reviews = useSelector(state=>state.reviews.spot);
    const spot = useSelector(state => state.spots.singleSpot)
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(rvwActions.thunkGetRvws(spotId))
    }, [dispatch, spotId])

    const reviewsArr = Object.values(reviews);
 

    reviewsArr.reverse();

    // takes in json   and returns [Month, year] in array
    const toMonthYear = (updatedAt) => {
        const tempDate = new Date(updatedAt);
        const splitDate = tempDate.toDateString().split(' ');
        return [splitDate[1], splitDate[3]];
    }


    if (!reviewsArr.length && sessionUser && sessionUser.id !== spot.Owner.id) {
        return (
            <div>
                
                Be the first to post a review!
            </div>
        )
    }
    return (
            <div>

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