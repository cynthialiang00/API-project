import React from 'react';
import { useModal } from '../../../context/Modal';
import { thunkDeleteUserBooking } from '../../../store/booking';
import { useDispatch } from 'react-redux';
import '../../Spots/DeleteModal.css';

function DeleteBookingsModal({bookingId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();

        const delBooking = dispatch(thunkDeleteUserBooking(bookingId))
            .then((res) => {
                if (res.statusCode === 400 || res.statusCode === 403) {
                    return alert(`${res.message}`)
                }

                if (!res.statusCode) {
                    alert(`Successfully deleted your booking!`)
                    return closeModal();
                }
                return;
            })

    }
    
    return (
        <div className="delete-modal-wrapper">
            <h2>Delete this booking?</h2>
            <div>Are you sure you want to remove this booking?</div>

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

export default DeleteBookingsModal;