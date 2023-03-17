import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as rvwActions from '../../store/review';
import { useEffect} from "react";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import PostReviewModal from "./PostReviewModal";

function ReadReviews ({isOwner}) {
    console.log("IS OWNER: ", isOwner)
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const reviews = useSelector(state=>state.reviews.spot);
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

    if (!reviewsArr.length && sessionUser && !isOwner) {
        return (
            <div className="reviews-list">
                <div className="post-rvw-button">
                    <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<PostReviewModal id={spotId} />}
                    />
                </div>
                Be the first to post a review!
            </div>
        )
    }
    return (
            <div className="reviews-list">
                { sessionUser && !isOwner && !reviewsArr.find(rvw => rvw.User.id === sessionUser.id) ?
                    <div className="post-rvw-button">
                        <OpenModalButton
                            buttonText="Post Your Review"
                            modalComponent={<PostReviewModal id={spotId} />}
                        />
                    </div>
                :
                <></>
                }
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