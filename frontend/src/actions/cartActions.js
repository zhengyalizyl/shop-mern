import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants';

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


export const saveSHippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}