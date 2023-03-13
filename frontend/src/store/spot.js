import { csrfFetch } from './csrf';

const GET_SPOTS = "spot/GET_SPOTS";

const actionGetSpots= (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots,
    };
};


export const thunkGetSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'GET',
    });

    const data = await response.json();
    dispatch(actionGetSpots(normalizeData(data.Spots)));
    return response;
};



const initialState = {allSpots: {}, singleSpot: {}};

const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS:
            newState = Object.assign({}, state);
            newState.allSpots = action.payload;
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
export default spotReducer;