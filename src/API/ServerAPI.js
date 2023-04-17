import axios from "axios";

// Server URL
const url = process.env.REACT_APP_SERVER_URL;

// 회원가입, 로그인
export const authAPI = {
    signup(email, password) {
        const userData = { email, password };
        return axios.post(`${url}/auth/signup`, userData);
    },
    signin(email, password) {
        const loginData = { email, password };
        return axios.post(`${url}/auth/signin`, loginData);
    },
};
