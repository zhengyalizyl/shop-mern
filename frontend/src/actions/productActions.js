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
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
} from '../constants/productConstants'
import axios from 'axios'

export const listProducts = (keyword = '', pageNumber = '') => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_LSIT_REQUEST })
        const { data: { data, success, page, pages } } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        if (success) {
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: {
                    products: data,
                    page,
                    pages
                }
            })
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

export const deleteProduct = (id) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })

        await axios.delete(
            `/api/products/${id}`
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


export const createProduct = () => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST })

        const { data: { data, success } } = await axios.post(
            `/api/products`, {},
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


export const updateProduct = (product) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })


        const { data: { data, success } } = await axios.put(
            `/api/products/${product._id}`,
            product,
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


export const createProductReview = (productId, review) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

        const { data: { success } } = await axios.post(
            `/api/products/${productId}/reviews`,
            review,
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


export const listTopProducts = () => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST });

        const { data: { data, success } } = await axios.get(`/api/products/top`);
        if (success) {

            dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
        } else {
            dispatch({ type: PRODUCT_TOP_FAIL })
        }

    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
};