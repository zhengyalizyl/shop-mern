import axios from 'axios';
import { USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/userConstants';

export const login = (email, password) => async(dispatch, getState) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data: { data, success } } = await axios.post('/api/users/login', { email, password }, config);
        console.log(data, success)
        if (success) {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data))
        } else {
            dispatch({ type: USER_LOGIN_FAIL })
        }

    } catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const register = (email, password) => async(dispatch, getState) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data: { data, success } } = await axios.post('/api/users/register', { email, password }, config);
        console.log(data, success)
        if (success) {
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data))
        } else {
            dispatch({ type: USER_REGISTER_FAIL })
        }

    } catch (error) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    document.location.href = "/login"
}