import * as actionTypes from '../actionTypes';
const initialState = {
    newPoojaCategoryData: null,
  
};
const puja = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
     
        case actionTypes.SET_POOJA_CATEGORY_DATA:
            return {
                ...state,
                newPoojaCategoryData: payload,
            };

        default:
            return state;


    }
};

export default puja;
