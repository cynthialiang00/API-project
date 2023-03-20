import React from 'react';
import { useModal } from "../../context/Modal";
import * as rvwActions from '../../store/review';
import { useDispatch } from 'react-redux';

function DeleteReviewModal({ id }) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const deleteTest = (e) => {
        e.preventDefault();
        dispatch(rvwActions.thunkDeleteRvw(id))
        closeModal();
    }
    return (
        <div className="delete-review-parent">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <button className="delete-review-yes" onClick={deleteTest}>Yes (Delete Review)</button>
            <button className="delete-review-no" onClick={closeModal} >No (Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal;