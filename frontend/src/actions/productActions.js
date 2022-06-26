import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LSIT_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
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


export const createProduct = () => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data: { data, success } } = await axios.post(
            `/api/products`, {},
            config
        )
        if (success) {

            dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
        } else {
            dispatch({
                type: PRODUCT_CREATE_FAIL
            })
        }

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
}


export const updateProduct = (product) => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })

        const { userLogin: { userInfo } } = getState()
        console.log('product', product)
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data: { data, success } } = await axios.put(
            `/api/products/${product._id}`,
            product,
            config
        )
        if (success) {

            dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
        } else {
            dispatch({
                type: PRODUCT_UPDATE_FAIL
            })
        }

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
}


export const createProductReview = (productId, review) => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data: { success } } = await axios.post(
            `/api/products/${productId}/reviews`,
            review,
            config
        )
        if (success) {

            dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS })
        } else {
            dispatch({
                type: PRODUCT_CREATE_REVIEW_FAIL
            })
        }

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
}