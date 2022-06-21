import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LSIT_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_SUCCESS
} from '../constants/productConstants'
import axios from 'axios'

export const listProducts = () => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_LSIT_REQUEST })
        const { data: { data, success } } = await axios.get('/api/products');
        if (success) {
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
        } else {
            dispatch({ type: PRODUCT_LIST_FAIL })
        }
    } catch (error) {

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const getProduct = (id) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST })
        const { data: { data, success } } = await axios.get(`/api/products/${id}`);
        if (success) {
            dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data })
        } else {
            dispatch({ type: PRODUCT_DETAIL_FAIL })
        }
    } catch (error) {

        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const deleteProduct = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        await axios.delete(
            `/api/products/${id}`,
            config
        )
        dispatch({ type: PRODUCT_DELETE_SUCCESS })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
}