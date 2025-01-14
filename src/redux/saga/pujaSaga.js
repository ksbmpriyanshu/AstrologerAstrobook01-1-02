import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { getRequest, postRequest } from '../../utils/apiRequests';
import * as actionTypes from '../actionTypes';

import axios from 'axios';
import { api_url } from '../../config/Constants';


function* getNewPoojaCategoryData() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        // Make the API call
        const poojaDataResponse = yield axios({
            method: 'get',
            url: "https://api.astrobook.co.in/api/ecommerce/get_puja_category"
        });

        // console.log("Response from API: ", poojaDataResponse?.data?.results);

        if (poojaDataResponse) {
            // const results = poojaDataResponse.data.success.results;
            yield put({ type: actionTypes.SET_POOJA_CATEGORY_DATA, payload: poojaDataResponse?.data?.results });
            // console.log("Data fetched: ", poojaDataResponse?.data?.results);
        } else {
            console.error("No success data found in the response.");
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        // Set loading to false when there's an error
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.error('Error fetching pooja category data:', e);
    }
}


function* getNewPoojaData(actions) {
    try {
        const { payload } = actions;
        console.log("payload", payload);
        
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const apiUrl = `${api_url}ecommerce/get_verified_puja_filter?categoryId=${payload?.categoryId}`;
        console.log("API URL:", apiUrl);

        const poojaDataResponse = yield getRequest({
            url: apiUrl
        });

        console.log("Pooja Data Response:", poojaDataResponse);

        if (poojaDataResponse?.success) {
            console.log("Pooja Data Results:", poojaDataResponse?.results);
            
            yield put({ type: actionTypes.SET_NEW_POOJA_DATA, payload: poojaDataResponse?.results });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Something went wrong...:', e);
    }
}


export default function* pujaSaga() {
    yield takeLeading(actionTypes.GET_POOJA_CATEGORY_DATA, getNewPoojaCategoryData);
    yield takeLeading(actionTypes.GET_NEW_POOJA_DATA , getNewPoojaData);
}