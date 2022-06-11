import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailReducer } from './reducers/productReducers';
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer
});

const cartItems = localStorage.getItem('cartItems')
const cartItemsFromStorage = cartItems ? JSON.parse(cartItems) : []
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage
    }
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
export default store;