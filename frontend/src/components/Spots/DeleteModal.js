import React from 'react';
import { useModal } from "../../context/Modal";
import * as spotActions from '../../store/spot';
import { useDispatch } from 'react-redux';

function DeleteModal({id}) {
    const dispatch = useDispatch();

    const deleteTest = (e) =>{
        e.preventDefault();
        console.log("delete button clicked")
        dispatch(spotActions.thunkDeleteSpot(id))
    }
    return (
        <div>
            <button>Go Back</button>
            <button onClick={deleteTest}>Delete Spot</button>
        </div>
    )
}

export default DeleteModal;