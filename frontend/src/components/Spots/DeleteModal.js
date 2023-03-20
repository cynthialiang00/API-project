import React from 'react';
import { useModal } from "../../context/Modal";
import * as spotActions from '../../store/spot';
import { useDispatch } from 'react-redux';

function DeleteModal({id}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteTest = (e) =>{
        e.preventDefault();
        dispatch(spotActions.thunkDeleteSpot(id))
        closeModal();

    }
    return (
        <div className="delete-spot-parent">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button className="delete-spot-yes" onClick={deleteTest}>Yes (Delete Spot)</button>
            <button className="delete-spot-no">Yes (Keep Spot)</button>
        </div>
    )
}

export default DeleteModal;