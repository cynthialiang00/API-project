import { csrfFetch } from './csrf';

const GET_RVWS = "spot/GET_RVWS";

const actionGetRvws= (rvws) => {
    return {
        type: GET_RVWS,
        payload: rvws,
    };
};

export const thunkGetRvws = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'GET',
    });

    const data = await response.json();
    dispatch(actionGetRvws(normalizeData(data.Reviews)));
    return response;
};

export const fetchCreateRvw = async (spotId, rvw) => {
    const response = await csrfFetch(`/api/spots/:spotId/reviews`, {
        method: 'POST',
        body: rvw
    });

    const data = await response.json();
    return data;
};

const initialState = { spot: {}, user: {} };

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_RVWS:
            newState = Object.assign({}, state);
            newState.spot = {};
            newState.spot = action.payload;
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