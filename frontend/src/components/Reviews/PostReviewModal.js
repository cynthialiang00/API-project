function PostReviewModal ({id}) {
    return (
        <div>
            <h2>How was your stay?</h2>
            <textarea className="review-text-area"
            placeholder="Leave your review here...">
            </textarea>
            <button type="submit">Submit Your Review</button>


        </div>
        
    )
}

export default PostReviewModal;