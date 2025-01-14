import * as actionTypes from '../actionTypes';

export const getPoojacategoryData = payload => ({
    type: actionTypes.GET_POOJA_CATEGORY_DATA,
    payload,
})
export const setPoojacategoryData = payload => ({
    type: actionTypes.SET_POOJA_CATEGORY_DATA,
    payload,
})
export const getNewPoojaData = payload => ({
    type: actionTypes.GET_NEW_POOJA_DATA,
    payload,
})
export const setNewPoojaData = payload => ({
    type: actionTypes.SET_NEW_POOJA_DATA,
    payload,
})
