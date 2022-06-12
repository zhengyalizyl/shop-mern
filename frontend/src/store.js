import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailReducer } from './reducers/productReducers';
import { cartReducer } from "./reducers/cartReducer";
import { userLoginReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer
});

const cartItems = localStorage.getItem('cartItems');
const userInfo = localStorage.getItem('userInfo');
const cartItemsFromStorage = cartItems ? JSON.parse(cartItems) : [];
const userItemsFromStorage = userInfo ? JSON.parse(userInfo) : null;
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage
    },
    userLogin: { userInfo: userItemsFromStorage }
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
export default store;