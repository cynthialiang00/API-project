import { csrfFetch } from './csrf';

const GET_RVWS = "review/GET_RVWS";
const NEW_RVW = "review/NEW_RVW";
const DELETE_RVW = "review/DELETE_RVW";

const actionGetRvws= (rvws) => {
    return {
        type: GET_RVWS,
        payload: rvws,
    };
};

const actionNewRvw = (rvw) => {
    return {
        type: NEW_RVW,
        payload: rvw
    };
};

const actionDeleteRvw = (id) => {
    return {
        type: DELETE_RVW,
        payload: id
    }
};

export const thunkGetRvws = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'GET',
    });

    const data = await response.json();
    dispatch(actionGetRvws(normalizeData(data.Reviews)));
    return response;
};

export const thunkCreateRvw = (spotId, rvw) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: rvw
    });

    const data = await response.json();
    dispatch(actionNewRvw(data));
    return response;
};

export const thunkDeleteRvw = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    await response.json();
    dispatch(actionDeleteRvw(reviewId));
    return response;
};

const initialState = { spot: {}, user: {}, new: {} };

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_RVWS:
            newState = Object.assign({}, state);
            newState.spot = {};
            newState.spot = action.payload;
            return newState;
        case NEW_RVW:
            newState = Object.assign({}, state);
            newState.new = {};
            newState.new[action.payload.id] = action.payload;
            return newState;
        case DELETE_RVW:
            newState = Object.assign({}, state);
            newState.spot = {...state.spot};
            delete newState.spot[action.payload];
            newState.new = {...state.new};
            delete newState.new[action.payload];
            return newState;
        default:
            return state;
    }
};


// Function takes in an array of data and normalizes it based on data element's id
// Returns the normalized data as an object
const normalizeData = (dataArr) => {
    const normalizeObj = {};
    dataArr.forEach(element => {
        normalizeObj[element.id] = element
    });

    return normalizeObj;

}
export default reviewReducer;