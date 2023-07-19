import React from 'react';
import { useModal } from "../../context/Modal";
import * as spotActions from '../../store/spot';
import { useDispatch } from 'react-redux';
import './DeleteModal.css';

function DeleteModal({spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) =>{
        e.preventDefault();
        dispatch(spotActions.thunkDeleteSpot(spotId))
        closeModal();

    }
    return (
        <div className="delete-modal-wrapper">
            <h2>Delete this listing?</h2>
            <div>Are you sure you want to remove this listing?</div>

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

export default DeleteModal;