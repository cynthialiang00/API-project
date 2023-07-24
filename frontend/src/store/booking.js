import { csrfFetch } from './csrf';

const GET_USER_BOOKINGS = "booking/GET_USER_BOOKINGS";
const ADD_BOOKING = "booking/ADD_BOOKING";
const DELETE_USER_BOOKING = "booking/DELETE_USER_BOOKING";
const EDIT_USER_BOOKING = "booking/EDIT_USER_BOOKING";


const addBooking = (data) => ({
    type: ADD_BOOKING,
    payload: data
});

const getUserBookings = (data) => ({
    type: GET_USER_BOOKINGS,
    payload: data
});

const editUserBooking = (data) => ({
    type: EDIT_USER_BOOKING,
    payload: data
});

const deleteUserBooking = (bookingId) => ({
    type: DELETE_USER_BOOKING,
    payload: bookingId
});

export const thunkAddBooking = (spotId, bookingBody) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        body: bookingBody
    });

    const data = await response.json();

    if (response.ok) {
        dispatch(addBooking(data));
    }
    
    return data;
};

export const thunkEditBooking = (bookingId, bookingBody) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        body: bookingBody
    });

    const data = await response.json();

    if (response.ok) {
        dispatch(editUserBooking(data));
    }

    return data;
};

export const thunkGetUserBookings = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`);

    const data = await response.json();

    if (response.ok) {
        dispatch(getUserBookings(data));
    }

    return data;
};

export const thunkDeleteUserBooking = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (response.ok) {
        dispatch(deleteUserBooking(bookingId));
    }

    return data;
};




const initialState = { user: {} , spot: {}};

const bookingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_BOOKING:
            newState = {...state};
            newState.spot = {...state.spot};
            newState.spot[action.payload.id] = action.payload;
            newState.user = {...state.user};
            newState.user[action.payload.id] = action.payload;

            return newState;
        case EDIT_USER_BOOKING:
            newState = {...state};
            newState.user = {...state.user};
            newState.user[action.payload.id] = action.payload;
            newState.user[action.payload.id]["Spot"] = {...state.user[action.payload.id]["Spot"]};

            return newState;

        case GET_USER_BOOKINGS:
            newState = {...state};
            newState.user = {};
            action.payload.Bookings.forEach((book) => {
                newState.user[book.id] = book
            });

            return newState;

        case DELETE_USER_BOOKING:
            newState = {...state};
            newState.user = {...state.user};
            delete newState.user[action.payload];
            return newState;
        default:
            return state;
    }
    
}

export default bookingReducer;