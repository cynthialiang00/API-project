import { csrfFetch } from './csrf';

const GET_USER_BOOKINGS = "booking/GET_USER_BOOKINGS";
const ADD_BOOKING = "booking/ADD_BOOKING";


const addBooking = (data) => ({
    type: ADD_BOOKING,
    payload: data
});

const getUserBookings = (data) => ({
    type: GET_USER_BOOKINGS,
    payload: data
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

export const thunkGetUserBookings = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`);

    const data = await response.json();

    if (response.ok) {
        dispatch(getUserBookings(data));
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

        case GET_USER_BOOKINGS:
            newState = {...state};
            newState.user = {};
            action.payload.Bookings.forEach((book) => {
                newState.user[book.id] = book
            });

            return newState;
        default:
            return state;
    }
    
}

export default bookingReducer;