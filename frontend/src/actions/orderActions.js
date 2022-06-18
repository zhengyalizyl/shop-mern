import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
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