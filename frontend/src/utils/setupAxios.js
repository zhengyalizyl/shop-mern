import axios from "axios";
import toast from "./toast";

function setupAxios(store) {
    const userInfo = store.getState().userLogin.userInfo;
    const token = userInfo ? userInfo.token : null;

    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.interceptors.request.use(function(config) {
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config;
    }, function(error) {
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function(response) {
        return response;
    }, function(error) {
        const message = error.response && error.response.data.message ?
            error.response.data.message :
            error.message

        if (message) {
            toast.error(message);
        }
        return Promise.reject(message);
    });

    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
    axios.defaults.headers.patch['Content-Type'] = 'application/json';
}

export default setupAxios;