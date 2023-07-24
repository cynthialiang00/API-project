import React from 'react';
import { useModal } from '../../../../context/Modal';
import * as rvwActions from '../../../../store/review';
import { useDispatch } from 'react-redux';

function DeleteReviewModal({ id }) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(rvwActions.thunkDeleteRvw(id))
        closeModal();
    }
    return (
        <div className="delete-modal-wrapper">
            <h2>Delete your review?</h2>
            <div>Are you sure you want to remove this review?</div>

            <div className="delete-modal-btns">
                <button onClick={handleDelete}>
                    Delete
                </button>
                <button onClick={closeModal}>
                    Nevermind
                </button>
            </div>
        </div>
    )
}

export default DeleteReviewModal;