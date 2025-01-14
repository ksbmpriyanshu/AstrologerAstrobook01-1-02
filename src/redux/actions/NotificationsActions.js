import * as actionTypes from '../actionTypes'



export const getNotifications = payload => ({
    type: actionTypes.GET_NOTIFICATIONS_DATA,
    payload
})

export const setNotifications = payload => ({
    type: actionTypes.SET_NOTIFICATIONS_DATA,
    payload
})

export const getUpdatePassword = payload => ({
    type: actionTypes.GET_UPDATE_PASSWORD_DATA,
    payload
})

export const setUpdatePassword = payload => ({
    type: actionTypes.SET_UPDATE_PASSWORD_DATA,
    payload
})

export const getUpdatePhoneNumber = payload => ({
    type: actionTypes.GET_UPDATE_PHONE_NUMBER_DATA,
    payload
})

export const setUpdatePhoneNumber = payload => ({
    type: actionTypes.SET_UPDATE_PHONE_NUMBER_DATA,
    payload
})




