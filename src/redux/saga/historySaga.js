import { put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getRequest, postRequest } from '../../utils/apiRequests'
import { api_url, astrologer_call_history, astrologer_wallet_history, astrologers_chat_history, get_astrolgoer_live_calls, get_gift_order_history, get_video_call_history, get_status_online, get_status_offline, get_all_pooja, astrologer_register_puja, Issue_reporting, Select_language, Main_Expertise, My_Customer, Block_user } from '../../config/Constants'
import { Alert } from 'react-native'
import { showToastMessage } from '../../utils/services'
import { state } from 'react-native-fs'

function* getChatHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const providerData = yield select(state => state.provider.providerData)

        const response = yield postRequest({
            url: api_url + astrologers_chat_history,
            data: {
                astrologerId: providerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_CHAT_HISTORY, payload: response?.chatHistory })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* getCallHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const providerData = yield select(state => state.provider.providerData)
        const response = yield postRequest({
            url: api_url + astrologer_call_history,
            data: {
                astrologerId: providerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_CALL_HISTORY, payload: response?.history })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* getLiveVedioCallHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const providerData = yield select(state => state.provider.providerData)

        const response = yield postRequest({
            url: api_url + get_astrolgoer_live_calls,
            data: {
                astrologerId: providerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_LIVE_VEDIO_CALL_HISTORY, payload: response?.history })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getWalletHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const providerData = yield select(state => state.provider.providerData)

        const response = yield postRequest({
            url: api_url + astrologer_wallet_history,
            data: {
                astrologerId: providerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_WALLET_HISTORY, payload: response?.walletHistory })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* getVideoCallHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const providerData = yield select(state => state.provider.providerData)

        const response = yield postRequest({
            url: api_url + get_video_call_history,
            data: {
                astrologerId: providerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_VIDEO_CALL_HISTORY, payload: response?.history })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* getGiftOrderHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const providerData = yield select(state => state.provider.providerData)

        const response = yield postRequest({
            url: api_url + get_gift_order_history,
            data: {
                astrologerId: providerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_GIFT_ORDER_HISTORY, payload: response?.results })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getoffline() {
    const providerData = yield select(state => state.provider.providerData)
    console.log("providerData", providerData?._id)
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })


        const response = yield postRequest({
            url: api_url + get_status_offline,
            data: {
                astrologerId: providerData?._id,
                status: 'offline'
            }
        })
        console.log("offline data:::::::", response?.data?.totalOfflineDuration)
        yield put({ type: actionTypes.SET_OFFLINE_DATA, payload: response })
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getonline() {
    const providerData = yield select(state => state.provider.providerData)
    console.log("providerData", providerData?._id)
    try {

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield postRequest({
            url: api_url + get_status_online,
            data: {
                astrologerId: providerData?._id,
                status: 'online'
            }
        })
        console.log("online data:::::::", response?.data?.totalActiveDuration)
        yield put({ type: actionTypes.SET_ONLINE_DATA, payload: response })
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getAllastrologerPooja(actions) {
    console.log("actions", actions)
    try {
        const { payload } = actions


        const Response = yield getRequest({
            url: api_url + get_all_pooja,
        })
        console.log("anujjjjjjj", Response?.success)

        if (Response?.success) {
            yield put({ type: actionTypes.SET_ASTROLOGER_DATA, payload: Response?.pooja })
            showToastMessage({ message: Response?.message })
        }

        // yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

    } catch (e) {
        // yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log('hii', e);
    }
}


function* getRegisterdPuja(actions) {
    const { payload } = actions
    console.log("bjhiguytfgvytfg", payload)

    const providerData = yield select(state => state.provider.providerData)
    console.log("providerData", providerData?._id)

    try {

        const data = {
            astrologerId: providerData?._id,
            pujaId: payload?.pujaId,
            pujaStartDate: payload?.pujaStartDate,
            pujaStartTime: payload?.pujaStartTime,
            mode: 'online',
            duration: payload?.duration
        }
        console.log("sadhsaoui", data)
        const response = yield postRequest({
            url: api_url + astrologer_register_puja,
            data: {
                astrologerId: providerData?._id,
                pujaId: payload?.pujaId,
                pujaStartDate: payload?.pujaStartDate,
                pujaStartTime: payload?.pujaStartTime,
                mode: 'online',
                duration: payload?.duration
            }
        })
        console.log("responsepooja", response?.success)
        yield put({ type: actionTypes.SET_REGISTERD_PUJA_DATA, payload: response })
        showToastMessage(message = "Pooja is Registered")
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* getIssueregisterd(actions) {
    const { payload } = actions
    console.log("bjhiguytfgvytfg", payload)

    const providerData = yield select(state => state.provider.providerData)
    console.log("providerData", providerData?._id)

    try {

        const data = {
            astrologerId: providerData?._id,
            description: payload?.description

        }
        console.log("sadhsaoui", data)
        const response = yield postRequest({
            url: api_url + Issue_reporting,
            data: {
                astrologerId: providerData?._id,
                description: payload?.description


            }
        })
        console.log("ANUJJJDATA", response?.message)
        yield put({ type: actionTypes.SET_REGISTERD_PUJA_DATA, payload: response })
        showToastMessage({ message: Response?.message })
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getSelectLanguagedata(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: api_url + Select_language,

        })
        console.log('anujjjjlanguage', response?.languageData)
        if (response?.success) {

            yield put({ type: actionTypes.SET_SELECT_LANGUAGE_DATA, payload: response?.languageData })
            showToastMessage({ message: response?.message })

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getExpertisedata(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: api_url + Main_Expertise,


        })
        console.log('anujjjjexpertise', response?.mainExpertise)


        if (response?.success) {


            yield put({ type: actionTypes.SET_EXPERTISE_DATA, payload: response?.mainExpertise })

            showToastMessage({ message: response?.message })

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getMyCustomerData(actions) {
    const { payload } = actions
    console.log("bjhiguytfgvytfg", payload)

    const providerData = yield select(state => state.provider.providerData)
    console.log("providerData", providerData?._id)

    try {

        const data = {
            astrologerId: providerData?._id,


        }
        console.log("sadhsaouiaaaaaaaa", data)
        const response = yield postRequest({
            url: api_url + My_Customer,
            data: {
                astrologerId: providerData?._id,

            }
        })
        console.log("Cutomersaagaaaaa", response?.customers)
        yield put({ type: actionTypes.SET_MY_CUSTOMER_DATA, payload: response?.customers })
        showToastMessage({ message: Response?.message })
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}


function* getUpdateProfile(actions) {
    const { payload } = actions
    console.log("bjhiguytfgvytfg", payload)

    const providerData = yield select(state => state.provider.providerData)
    console.log("providerData", providerData?._id)

    try {

        const data = {
            astrologerId: providerData?._id,
            description: payload?.description

        }
        console.log("sadhsaoui", data)
        const response = yield postRequest({
            url: api_url + Issue_reporting,
            data: {
                astrologerId: providerData?._id,
                description: payload?.description


            }
        })
        console.log("ANUJJJDATA", response?.message)
        yield put({ type: actionTypes.SET_REGISTERD_PUJA_DATA, payload: response })
        showToastMessage({ message: Response?.message })
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getBlockUser(actions) {
    const { payload } = actions
    console.log("bjhiguytfgvytfg", payload)

    const providerData = yield select(state => state.provider.providerData)
    console.log("providerData", providerData?._id)

    try {

        const data = {
            astrologerId: providerData?._id,
            customerId: payload?.customerId,
            reason: payload?.reason,

        }
        console.log("sadhsaoui", data)
        const response = yield postRequest({
            url: api_url + Block_user,
            data: {
                astrologerId: providerData?._id,
                customerId: payload?.customerId,
                reason: payload?.reason,


            }
        })
        console.log("ANUJJJDATA", response?.message)
        yield put({ type: actionTypes.SET_BLOCK_USER_DATA, payload: response })
        showToastMessage({ message: response?.message })
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}







export default function* historySaga() {
    yield takeLeading(actionTypes.GET_CHAT_HISTORY, getChatHistory)
    yield takeLeading(actionTypes.GET_CALL_HISTORY, getCallHistory)
    yield takeLeading(actionTypes.GET_LIVE_VEDIO_CALL_HISTORY, getLiveVedioCallHistory)
    yield takeLeading(actionTypes.GET_WALLET_HISTORY, getWalletHistory)
    yield takeLeading(actionTypes.GET_VIDEO_CALL_HISTORY, getVideoCallHistory)
    yield takeLeading(actionTypes.GET_GIFT_ORDER_HISTORY, getGiftOrderHistory)
    yield takeLeading(actionTypes.GET_ASTROLOGER_DATA, getAllastrologerPooja)
    yield takeLeading(actionTypes.GET_STATUS_ONLINE, getonline)
    yield takeLeading(actionTypes.GET_ONLINE_DATA, getonline)
    yield takeLeading(actionTypes.GET_OFFLINE_DATA, getoffline);
    yield takeLeading(actionTypes.GET_REGISTERD_PUJA_DATA, getRegisterdPuja); getSelectLanguagedata
    yield takeLeading(actionTypes.GET_ISSUE_DATA, getIssueregisterd); getExpertisedata
    yield takeLeading(actionTypes.GET_SELECT_LANGUAGE_DATA, getSelectLanguagedata); getMyCustomerData
    yield takeLeading(actionTypes.GET_EXPERTISE_DATA, getExpertisedata);
    yield takeLeading(actionTypes.GET_MY_CUSTOMER_DATA, getMyCustomerData);
    yield takeLeading(actionTypes.GET_UPDATE_PROFILE_DATA, getUpdateProfile);

    yield takeLeading(actionTypes.GET_BLOCK_USER_DATA, getBlockUser);

}