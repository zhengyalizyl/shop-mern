import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';
import store from '../store';

export const addToCart = (id, qty) => async(dispatch, getState) => {
    try {
        const { data: { data, success } } = await axios.get(`/api/products/${id}`);

        if (success) {
            const { _id, ...res } = data
            dispatch({
                type: CART_ADD_ITEM,
                payload: {
                    product: _id,
                    qty,
                    ...res
                }
            })
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        } else {

        }
    } catch (error) {

    }
}

export const removeToCart = (id) => async(dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}