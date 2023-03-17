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
        <div>
            <h2>Delete Review</h2>
            <div>Are you sure you want to delete this review?</div>
            <button onClick={deleteTest}>Yes (Delete Review)</button>
            <button onClick={closeModal}>No (Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal;