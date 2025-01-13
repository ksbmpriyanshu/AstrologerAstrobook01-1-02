import * as actionTypes from '../actionTypes'

const initialState = {
    chatHistoryData: null,
    callHistoryData: null,
    liveVedioCallHistoryData: null,
    walletHistory: null,
    videoCallHistoryData:null,
    giftOrderHistoryData:null,
    offlineData:null,
    onlineData:null,
    AllPoojaData:null,
    RegisterPujadata:null,
    SelectLanguagedata:null,
    Expertisedata:null,
    MyCustomerData:null,
    SelectedLanguagedata:null,
    UpdateProfile:null,
    BlockUser:null
};

const history = (state = initialState, actions)=>{
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_CHAT_HISTORY:
            return {
               ...state,
               chatHistoryData: payload,
            };
        case actionTypes.SET_CALL_HISTORY:
            return {
               ...state,
               callHistoryData: payload,
            };
        case actionTypes.SET_LIVE_VEDIO_CALL_HISTORY:
            return {
               ...state,
               liveVedioCallHistoryData: payload,
            };
        case actionTypes.SET_WALLET_HISTORY:
            return {
               ...state,
               walletHistory: payload,
            };
            case actionTypes.SET_VIDEO_CALL_HISTORY:
                return {
                   ...state,
                   videoCallHistoryData: payload,
                };
                case actionTypes.SET_GIFT_ORDER_HISTORY:
                return {
                   ...state,
                   giftOrderHistoryData: payload,
                };
                case actionTypes.SET_OFFLINE_DATA:
                return {
                   ...state,
                   offlineData: payload,
                };
                case actionTypes.SET_ONLINE_DATA:
                return {
                   ...state,
                   onlineData: payload,
                };
                case actionTypes.SET_ASTROLOGER_DATA:
                    return {
                       ...state,
                       AllPoojaData: payload,
                    };
                    case actionTypes.SET_ASTROLOGER_DATA:
                    return {
                       ...state,
                       AllPoojaData: payload,
                    };

                    case actionTypes.SET_REGISTERD_PUJA_DATA:
                     return {
                        ...state,
                        RegisterPujadata: payload,
                     };
                     case actionTypes.SET_REGISTERD_PUJA_DATA:
                     return {
                        ...state,
                        RegisterPujadata: payload,
                     };
                    
                     case actionTypes.SET_SELECT_LANGUAGE_DATA:
                        return {
                           ...state,
                           SelectLanguagedata: payload,
                        };
                        case actionTypes.SET_SELECT_LANGUAGE_DATA:
                        return {
                           ...state,
                           SelectLanguagedata: payload,
                        };

                        case actionTypes.SET_EXPERTISE_DATA:
                           return {
                              ...state,
                              Expertisedata: payload,
                           };

                           case actionTypes.SET_MY_CUSTOMER_DATA:
                              return {
                                 ...state,
                                 MyCustomerData: payload,
                              };

                              case actionTypes.SET_SELECTED_LANGUAGE_DATA:
                              return {
                                 ...state,
                                 SelectedLanguagedata: payload,
                              };

                              case actionTypes.SET_UPDATE_PROFILE_DATA:
                                 return {
                                    ...state,
                                    UpdateProfile: payload,
                                 };

                                 case actionTypes.SET_BLOCK_USER_DATA:
                                 return {
                                    ...state,
                                    BlockUser: payload,
                                 };

                           
                          
        default:{
            return state
        }
    }
}

export default history;