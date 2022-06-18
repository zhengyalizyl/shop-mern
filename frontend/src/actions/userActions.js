import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS
} from '../constants/userConstants';

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
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data }); //注册成功后，让其自动登录
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
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


export const getUserDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data: { success, data } } = await axios.get(`/api/users/${id}`, config);
        if (success) {
            dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

        } else {
            dispatch({ type: USER_DETAILS_FAIL })
        }
    } catch (error) {

        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const updateUserProfile = (user) => async(dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState();
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data: { success, data } } = await axios.put(`/api/users/profile`, user, config);
        if (success) {

            dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, success: true, payload: data });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

            localStorage.setItem('userInfo', JSON.stringify(data))
        } else {
            dispatch({ type: USER_UPDATE_PROFILE_FAIL })
        }
    } catch (error) {

        dispatch({
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            type: USER_UPDATE_PROFILE_FAIL,
        })
    }
}




export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    document.location.href = "/login"
}