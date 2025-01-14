import * as actionTypes from '../actionTypes';
const initialState = {
    notificationdata: null,
    UpdatePassword:null,
    UpdatePhonenumber:null
};

const notificationReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case actionTypes.SET_NOTIFICATIONS_DATA:
            return {
                ...state,
                notificationdata: payload
            }


            case actionTypes.SET_UPDATE_PASSWORD_DATA:
                return {
                    ...state,
                    UpdatePassword: payload
                }

                case actionTypes.SET_UPDATE_PHONE_NUMBER_DATA:
                    return {
                        ...state,
                        UpdatePhonenumber: payload
                    }

        default: {
            return state
        }
    }
}

export default notificationReducer

