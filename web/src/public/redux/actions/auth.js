import axios from 'axios';

const IP = "https://iplix.herokuapp.com/user/";

export const login = (user) => ({
    type : 'LOGIN',
    payload : axios.post(IP + 'login', user)
});

export const register = (user) => ({
    type : 'REGISTER',
    payload : axios.post(IP + 'register', user)
});

export const logout = () => ({
    type : 'LOGOUT'
});