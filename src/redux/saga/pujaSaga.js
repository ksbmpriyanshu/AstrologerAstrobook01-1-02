import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { getRequest, postRequest } from '../../utils/apiRequests';
import * as actionTypes from '../actionTypes';
import { api_url, get_new_pooja_category } from '../../config/constants';
import axios from 'axios';


function* getNewPoojaCategoryData() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        // Make the API call
        const poojaDataResponse = yield axios({
            method: 'get',
            url: "https://api.astrobook.co.in/api/ecommerce/get_puja_category"
        });

        console.log("Response from API: ", poojaDataResponse?.data?.results);

        if (poojaDataResponse) {
            const results = poojaDataResponse.data.success.results;
            yield put({ type: actionTypes.SET_POOJA_CATEGORY_DATA, payload: poojaDataResponse?.data?.results });
            console.log("Data fetched: ", poojaDataResponse?.data?.results);
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





export default function* pujaSaga() {
    yield takeLeading(actionTypes.GET_POOJA_CATEGORY_DATA, getNewPoojaCategoryData);
}