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

export const createOrder = (order) => async(dispatch) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { data: { data, success } } = await axios.post(`/api/orders`, order);
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
            payload: error
        });
    }
};


export const getOrderDetails = (id) => async(dispatch) => {

    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        const { data: { data, success } } = await axios.get(`/api/orders/${id}`);
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
            payload: error
        });
    }
};

export const payOrder = (orderId, paymentResult) => async(dispatch) => {

    try {
        dispatch({ type: ORDER_PAY_REQUEST });
        const { data: { data, success } } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult);
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
            payload: error
        });
    }
};
export const deliveredOrder = (orderId) => async(dispatch) => {

    try {
        dispatch({ type: ORDER_DELIVERED_REQUEST });
        const { data: { data, success } } = await axios.put(`/api/orders/${orderId}/delivered`, {});
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
            payload: error
        });
    }
};
export const listMyOrders = () => async(dispatch) => {

    try {
        dispatch({ type: ORDER_MY_LIST_REQUEST });

        const { data: { data, success } } = await axios.get(`/api/orders/myorders`);
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
            payload: error
        });
    }
};


export const listOrders = () => async(dispatch) => {

    try {
        dispatch({ type: ORDER_LIST_REQUEST });
        const { data: { data, success } } = await axios.get(`/api/orders`);
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
            payload: error
        });
    }
};