import React from "react";
import * as rvwActions from "../../store/review";
import { useState } from "react";
import { useHistory } from "react-router-dom";


function PostReviewModal ({id}) {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);

    const [rvwErrors, setRvwErrors] = useState({});

    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setRvwErrors({});

        const newRvw = JSON.stringify({
            review,
            stars
        });

        const newRvwData = await rvwActions.fetchCreateRvw(id, newRvw)
            .catch(async (response) => {
                const validationErrors = await response.json();
                if (validationErrors.errors) setRvwErrors(validationErrors.errors)
            });
        

        //reset form state
        setReview('');
        setStars(0);

        history.push(`/spots/${id}`);

    }
    return (
        <div>
            <form className="review-form" onSubmit={handleSubmit}>
                <h2>How was your stay?</h2>
                {Object.keys(rvwErrors).length && 
                    <div>
                        <p className="errors">{rvwErrors.review}</p>
                        <p className="errors">{rvwErrors.stars}</p>
                    </div>
                }
                <textarea 
                className="review-text-area"
                placeholder="Leave your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                >
                </textarea>
                <button type="submit">Submit Your Review</button>
            </form>

        </div>
        
    )
}

export default PostReviewModal;