import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_RESET,
    ORDER_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_RESET,
    ORDER_MY_LIST_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_RESET,
    ORDER_DELIVERED_SUCCESS
} from "../constants/orderConstants";

import { CART_REMOVE_ITEMS } from "../constants/cartConstants";

export const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data: { data, success } } = await axios.post(`/api/orders`, order, config);
        if (success) {

            dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });

            dispatch({ type: CART_REMOVE_ITEMS });

            localStorage.removeItem("cartItems");
        } else {
            dispatch({
                type: ORDER_CREATE_FAIL
            });
        }

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
};


export const getOrderDetails = (id) => async(dispatch, getState) => {

    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data: { data, success } } = await axios.get(`/api/orders/${id}`, config);
        if (success) {

            dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
        } else {
            dispatch({
                type: ORDER_DETAILS_FAIL
            });
        }

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
};

export const payOrder = (orderId, paymentResult) => async(dispatch, getState) => {

    try {
        dispatch({ type: ORDER_PAY_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data: { data, success } } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
        if (success) {

            dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
        } else {
            dispatch({
                type: ORDER_PAY_FAIL
            });
        }

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
};
export const deliveredOrder = (orderId) => async(dispatch, getState) => {

    try {
        dispatch({ type: ORDER_DELIVERED_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data: { data, success } } = await axios.put(`/api/orders/${orderId}/delivered`, {}, config);
        if (success) {

            dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
        } else {
            dispatch({
                type: ORDER_DELIVERED_FAIL
            });
        }

    } catch (error) {
        dispatch({
            type: ORDER_DELIVERED_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
};
export const listMyOrders = () => async(dispatch, getState) => {

    try {
        dispatch({ type: ORDER_MY_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data: { data, success } } = await axios.get(`/api/orders/myorders`, config);
        console.log(data, success)
        if (success) {

            dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data });
        } else {
            dispatch({
                type: ORDER_MY_LIST_FAIL
            });
        }

    } catch (error) {
        dispatch({
            type: ORDER_MY_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
};


export const listOrders = () => async(dispatch, getState) => {

    try {
        dispatch({ type: ORDER_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data: { data, success } } = await axios.get(`/api/orders`, config);
        console.log(data, success)
        if (success) {

            dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
        } else {
            dispatch({
                type: ORDER_LIST_FAIL
            });
        }

    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        });
    }
};