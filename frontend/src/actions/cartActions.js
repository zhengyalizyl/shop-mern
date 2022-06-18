import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_MENTHOD } from '../constants/cartConstants';

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


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}
export const savePaymentMenthod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_MENTHOD, payload: data });
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}