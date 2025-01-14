import { stat } from 'react-native-fs';
import * as actionTypes from '../actionTypes';
const initialState = {
    newPoojaCategoryData: null,
    newPujaData: null,
  
};
const puja = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
     
        case actionTypes.SET_POOJA_CATEGORY_DATA:
            return {
                ...state,
                newPoojaCategoryData: payload,
            };
        case actionTypes.SET_NEW_POOJA_DATA:
            return {
                ...state,
                newPujaData: payload
            }

        default:
            return state;


    }
};

export default puja;
