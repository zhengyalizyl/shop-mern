import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailReducer, productDeleteReducer, productCreateReducer, productUpdateReducer } from './reducers/productReducers';
import { cartReducer } from "./reducers/cartReducer";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from "./reducers/userReducer";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer } from './reducers/orderReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer
});

const cartItems = localStorage.getItem('cartItems');
const userInfo = localStorage.getItem('userInfo');
const shippingAddress = localStorage.getItem('shippingAdress');
const paymentMenthod = localStorage.getItem('paymentMethod');

const cartItemsFromStorage = cartItems ? JSON.parse(cartItems) : [];
const userItemsFromStorage = userInfo ? JSON.parse(userInfo) : null;
const shippingAddressFromStorage = shippingAddress ? JSON.parse(shippingAddress) : {};
const paymentMenthodFromStorage = paymentMenthod ? JSON.parse(paymentMenthod) : 'PayPal';

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMenthodFromStorage
    },
    userLogin: { userInfo: userItemsFromStorage },
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
export default store;