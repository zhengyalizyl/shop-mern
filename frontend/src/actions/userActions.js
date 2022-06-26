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
    USER_UPDATE_PROFILE_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_RESET,
    USER_DELETE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_RESET
} from '../constants/userConstants';

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { data: { data, success } } = await axios.post('/api/users/login', { email, password });
        if (success) {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data))
        } else {
            dispatch({ type: USER_LOGIN_FAIL })
        }

    } catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error
        })
    }
}

export const register = (email, password) => async(dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const { data: { data, success } } = await axios.post('/api/users/register', { email, password });
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
            payload: error
        })
    }
}


export const getUserDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const { data: { success, data } } = await axios.get(`/api/users/${id}`);
        if (success) {
            dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

        } else {
            dispatch({ type: USER_DETAILS_FAIL })
        }
    } catch (error) {

        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error
        })
    }
}
export const updateUserProfile = (user) => async(dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
        const { data: { success, data } } = await axios.put(`/api/users/profile`, user);
        if (success) {

            dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, success: true, payload: data });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

            localStorage.setItem('userInfo', JSON.stringify(data))
        } else {
            dispatch({ type: USER_UPDATE_PROFILE_FAIL })
        }
    } catch (error) {

        dispatch({
            payload: error,
            type: USER_UPDATE_PROFILE_FAIL,
        })
    }
}


export const listUsers = () => async(dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })
        const { data: { success, data } } = await axios.get(`/api/users`);
        if (success) {
            dispatch({ type: USER_LIST_SUCCESS, payload: data });

        } else {
            dispatch({ type: USER_LIST_FAIL })
        }
    } catch (error) {

        dispatch({
            type: USER_LIST_FAIL,
            payload: error
        })
    }
}

export const deleteUser = (id) => async(dispatch) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST })
        const { data: { success } } = await axios.delete(`/api/users/${id}`);
        if (success) {
            dispatch({ type: USER_DELETE_SUCCESS });

        } else {
            dispatch({ type: USER_DELETE_FAIL })
        }
    } catch (error) {

        dispatch({
            type: USER_DELETE_FAIL,
            payload: error
        })
    }
}
export const updateUser = (id, data) => async(dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })
        const { data: { success } } = await axios.put(`/api/users/${id}`, data);
        if (success) {
            dispatch({ type: USER_UPDATE_SUCCESS });

        } else {
            dispatch({ type: USER_UPDATE_FAIL })
        }
    } catch (error) {

        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error
        })
    }
}




export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    document.location.href = "/login"
}