import React from "react";
import * as rvwActions from "../../store/review";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import "./Reviews.css";

function PostReviewModal ({id}) {

    const { closeModal } = useModal();
    const history = useHistory();
    const dispatch = useDispatch();


    const [review, setReview] = useState('');
    const [activeStars, setActiveStars] = useState(0);
    const [stars, setStars] = useState(0);

    const [rvwErrors, setRvwErrors] = useState({});
    const [dynamicRvwErrors, setDynamicRvwErrors] = useState({});

    const [hasSubmitted, setHasSubmitted] = useState(false);


    const onChange = (number) => {
        setStars(parseInt(number));
    };

    const starsIcon = (number) => {
        const props = {};
        props.onMouseEnter = () => setActiveStars(number);
        props.onMouseLeave = () => setActiveStars(stars);
        props.onClick = () => onChange(number);
        return (
            <div key={number} className={activeStars >= number ? "filled" : "empty"} {...props}>
                <i className="fa-solid fa-star"></i>
            </div>
        );
    };

    useEffect(() => {

        const errors = {};
        if (review.length < 10) errors["review"] = "Review must be at least 10 characters long";
        if (!stars) errors["stars"] = "Star rating must be given";
        setDynamicRvwErrors(errors);
    }, [review, stars]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setRvwErrors({});

        setHasSubmitted(true);

        const newRvw = JSON.stringify({
            review,
            stars
        });

        dispatch(rvwActions.thunkCreateRvw(id, newRvw))
        .then(closeModal)
            .catch(async (response) => {
                const validationErrors = await response.json();
                console.log(validationErrors)
                if (validationErrors.errors) setRvwErrors(validationErrors.errors)
            });
        

        //reset form state
        setReview('');
        setStars(0);
        setActiveStars(0);

        return closeModal();


    }
    return (
        <div className="post-review-parent">
            <form className="review-form" onSubmit={handleSubmit}>
                <h2>How was your stay?</h2>
                {hasSubmitted && Object.keys(rvwErrors).length && 
                    <div className="review-errors">
                        <p className="errors">{rvwErrors.review}</p>
                        <p className="errors">{rvwErrors.stars}</p>
                    </div>
                }

                <div className="review-input">
                    <textarea
                        className="review-text-area"
                        placeholder="Leave your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    >
                    </textarea>
                    {hasSubmitted && dynamicRvwErrors.review &&
                        <p className="errors">{dynamicRvwErrors["review"]}</p>
                    }
                </div>
                
                
                <div className="stars-input">
                    {[1, 2, 3, 4, 5].map(number => starsIcon(number))}
                    <label>Stars</label>
                </div>
                
                {hasSubmitted && dynamicRvwErrors.stars &&
                    <p className="errors">{dynamicRvwErrors.stars}</p>
                }
                <button type="submit"
                        disabled={Object.keys(dynamicRvwErrors).length}
                >
                    Submit Your Review
                </button>
            </form>

        </div>
        
    )
}

export default PostReviewModal;