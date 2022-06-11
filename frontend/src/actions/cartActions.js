import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstants';
import { useStore } from 'react-redux'
import store from '../store';

export const addToCart = (id, qty) => async(dispatch) => {
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
            const { getState } = store;
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        } else {

        }
    } catch (error) {

    }
}