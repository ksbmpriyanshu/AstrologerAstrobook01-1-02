import { delay, put, select, takeLeading,call } from 'redux-saga/effects'
import socketServices from '../../utils/socket'
import * as actionTypes from '../actionTypes'
import { resetToScreen } from '../../navigations/NavigationServices'
import database from '@react-native-firebase/database'
import * as ChatActions from '../actions/ChatActions'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { blobRequest, postRequest } from '../../utils/apiRequests'
import { api_url, base_url, endvidocall, get_linked_profile, store_file } from '../../config/Constants'
import RNFetchBlob from 'rn-fetch-blob'
import axios from 'axios'
import { showToastMessage } from '../../utils/services'

function* onAcceptRejectChat(actions) {

    try {
        const { requestData, status } = actions.payload
        console.log("requestData", requestData)
        if (status == 'accept') {
            socketServices.emit('onAstroAccept', requestData?.chatId)
            socketServices.emit('joinChatRoom', requestData?.chatId)
            yield AsyncStorage.setItem('chatData', JSON.stringify(requestData))
            yield put({ type: actionTypes.SET_CHAT_REQUESTED_DATA, payload: requestData })
            yield resetToScreen('providerChat')
            return
        }
        const data = {
            roomID: requestData?.chatId,
            actionBy: 'astro'
        }
        socketServices.emit('declinedChat', data)
        resetToScreen('providerHome')
    } catch (e) {
        console.log(e)
    }
}

function* onInitiatChat(actions) {
    try {
        const { dispatch, historyId } = actions.payload
        socketServices.initializeSocket(dispatch);
        yield delay(500)
        socketServices.emit('joinChatRoom', historyId)
        socketServices.emit('startChatTimer', historyId)

        const response = yield postRequest({
            url: 'https://api.astrobook.co.in/api/customers/get_chat_details',
            data: {
                chatId: historyId,
            }
        })


        const astrologerResponse = yield postRequest({
            url: 'https://api.astrobook.co.in/api/astrologer/get_splash',
            data: {
                astrologerId: response?.chatHistory?.astrologerId?._id
            },
        });


        if (astrologerResponse?.success) {
            yield AsyncStorage.setItem(
                'providerData',
                JSON.stringify(astrologerResponse?.astrologer),
            );
            yield put({
                type: actionTypes.SET_PROVIDER_DATA,
                payload: astrologerResponse?.astrologer,
            });
        }

        const data = {
            customerName: response?.chatHistory?.customerId?.customerName,
            customerImage: response?.chatHistory?.customerId?.image,
            user_id: response?.chatHistory?.customerId?._id,
            wallet_balance: response?.chatHistory?.customerId?.wallet_balance,
            invoiceId: response?.chatHistory?.transactionId,
            astroID: response?.chatHistory?.astrologerId?._id,
            chatId: historyId,
            profileId: response?.chatHistory?.formId?._id,
            chatPrice: response?.chatHistory?.chatPrice
        };

        console.log("check chat data", data)

        yield AsyncStorage.setItem('chatData', JSON.stringify(data))
        yield put({ type: actionTypes.SET_CHAT_REQUESTED_DATA, payload: data })

        const chat_id = `customer_${data?.user_id}_astro_${data?.astroID}`

        const messagesRef = database()
            .ref(`ChatMessages/${chat_id}`)
            .orderByChild('addedAt');

        messagesRef.on('value', snapshot => {
            try {
                const msg = [];
                snapshot.forEach(childSnapshot => {
                    try {
                        const message = childSnapshot.val();
                        if (!message.received && message?.user?.id != data?.astroID) {
                            // updateMessageStatus(childSnapshot.key);
                        }
                        msg.push({ ...message });
                    } catch (e) {
                        console.log(e)
                    }

                });
                dispatch(ChatActions.setChatData(msg.reverse()))

                // setMessages(msg.reverse());
            } catch (e) {
                console.log(e);
            }
        });

    } catch (e) {
        console.log(e)
    }
}

function* sendChatMessage(actions) {
    try {
        const requestedData = yield select(state => state.chat.requestedData)
        console.log(requestedData)
        const chat_id = `customer_${requestedData?.user_id}_astro_${requestedData?.astroID}`
        console.log(chat_id)
        const { payload } = actions

        const chatNode = database().ref(`ChatMessages/${chat_id}`).push();
        const newKey = chatNode.key;
        const chatRef = database().ref(`ChatMessages/${chat_id}/${newKey}`);
        chatRef.set({
            ...payload,
            pending: false,
            sent: true,
            received: false,
            createdAt: new Date().getTime(),
            addedAt: database.ServerValue.TIMESTAMP,
        });

    } catch (e) {
        console.log(e)
    }
}

function* saveChatMessage(actions) {
    try {
        const chatData = yield select(state => state.chat.chatData)
        const { payload } = actions
        console.log(payload)
        yield put({ type: actionTypes.SET_CHAT_DATA, payload: GiftedChat.append(chatData, payload), })

    } catch (e) {
        console.log(e)
    }
}

function* onEndChat(actions) {
    try {
        const requestedData = yield select(state => state.chat.requestedData)
        socketServices.emit('endChat', { roomID: requestedData?.chatId });
        yield put({ type: actionTypes.ON_CLOSE_CHAT, payload: null })
    } catch (e) {
        console.log(e)
    }
}

function* onCloseChat(actions) {
    try {
        yield AsyncStorage.removeItem('chatData')
        yield put({ type: actionTypes.SET_CHAT_REQUESTED_DATA, payload: null })
        yield put({ type: actionTypes.SET_CHAT_DATA, payload: [] })
        yield put({ type: actionTypes.SET_CHAT_TIMER_COUNTDOWN, payload: 0 })
        yield put({ type: actionTypes.SET_LINKED_PROFILE_DATA, payload: null })
        yield put({ type: actionTypes.GET_PROVIDER_DATA, payload: null })
        resetToScreen('providerHome')
    } catch (e) {
        console.log(e)
    }
}

function* onChatImageSend(actions) {
    try {
        const { message, uri } = actions.payload
        const response = yield blobRequest({
            url: api_url + store_file,
            data: [
                {
                    name: 'fileType',
                    data: 'image',

                },
                {
                    name: 'filePath',
                    filename: 'chat_image.png',
                    data: RNFetchBlob.wrap(uri),
                    type: 'image/png',
                }
            ]
        })

        if (response?.success) {
            let msg = {
                ...message,
                image: base_url + response?.data?.filePath
            }
            yield put({ type: actionTypes.SEND_CHAT_MESSAGE, payload: msg })
        }



        console.log(response)

    } catch (e) {
        console.log(e, 'e')
    }
}

function* getIntakeDetails(actions) {
    try {
        const requestedData = yield select(state => state.chat.requestedData)
        const callRequestData = yield select(state => state.chat.callRequestData)
        const callVideoRequestData = yield select(state => state.chat.callVideoRequestData)
        console.log("requestedData::>>>>", requestedData)
        console.log("callRequestData::>>>>", callRequestData)
        console.log("callVideoRequestData::>>>>", callVideoRequestData)
        const response = yield postRequest({
            url: api_url + get_linked_profile,
            data: {
                profileId: requestedData ? requestedData?.profileId : callVideoRequestData ? callVideoRequestData : callRequestData
            }

        })
        console.log("response video call :::", response);
        if (response?.success) {
            yield put({ type: actionTypes.SET_LINKED_PROFILE_DATA, payload: response?.data })
        }

    } catch (e) {
        console.log(e)
    }
}
function* onVideoCallENd(actions) {
    try {
        const { payload } = actions
        console.log("call Id Payload :::", payload);
        // const data ={
        //     callId: payload.callID,
        // }
        // const response = axios.post(api_url + endvidocall,data);
        const response = yield postRequest({
            url: `https://api.astrobook.co.in/api/customers/endvideocall`,
            data: {
                callId: payload.callID,
            }
        })
        console.log(response, 'all data')
        if (response) {
            showToastMessage({ message: "Video Call Successfully" });
            // yield put({ type: actionTypes.GET_PROVIDER_DATA, payload: null})
        }
    } catch (e) {
        console.log(e);
    }
}
function* getprivioushistory(actions) {

    console.log("getprivioushistory", actions);

    try {
        const providerData = yield select(state => state.provider.providerData);

        const { payload } = actions;

        // console.log("payload::::::::::::::", payload);
        console.log("customerData::::::::::::::", providerData?._id);
        const chat_id = `customer_${payload}_astro_${providerData?._id}`;

        console.log("chat_id:::::", chat_id)

        const reference = database().ref(`/ChatMessages/${chat_id}`);

        const snapshot = yield call([reference, reference.once], 'value');
        const messagesData = snapshot.val();

        console.log("messagesData", messagesData)
        if (messagesData) {
            const messages = Object.keys(messagesData).map((key) => ({
                id: key,
                ...messagesData[key],
            }));
            yield put({ type: actionTypes.SET_PREVIUOS_HISTORY, payload: messages });
        } else {
            console.log('No chat history found for this room.');
        }
    } catch (e) {
        console.log('Error fetching chat history:', e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


export default function* chatSaga() {
    yield takeLeading(actionTypes.ON_ACCEPT_REJECT_CHAT, onAcceptRejectChat)
    yield takeLeading(actionTypes.ON_INITIATE_CHAT, onInitiatChat)
    yield takeLeading(actionTypes.SEND_CHAT_MESSAGE, sendChatMessage)
    yield takeLeading(actionTypes.SAVE_CHAT_MESSAGE, saveChatMessage)
    yield takeLeading(actionTypes.ON_END_CHAT, onEndChat)
    yield takeLeading(actionTypes.ON_CLOSE_CHAT, onCloseChat)
    yield takeLeading(actionTypes.ON_CHAT_IMAGE_SEND, onChatImageSend)
    yield takeLeading(actionTypes.GET_INTAKE_DETAILS, getIntakeDetails)
    yield takeLeading(actionTypes.ON_VIDEO_CALL_END, onVideoCallENd);
    yield takeLeading(actionTypes.GET_PREVIUOS_HISTORY, getprivioushistory);
}