import axios from "axios";

// Server URL
const url = process.env.REACT_APP_SERVER_URL;
// access token
const access_token = localStorage.getItem("loginToken");

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

// To Do
export const TodoAPI = {
    getTodo() {
        return axios.get(`${url}/todos`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
    },
    createTodo(todo) {
        return axios.post(
            `${url}/todos`,
            { todo },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            }
        );
    },
    updateTodo(id, todo, isCompleted) {
        return axios.put(
            `${url}/todos/${id}`,
            { todo, isCompleted },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            }
        );
    },
    deleteTodo(id) {
        axios.delete(`${url}/todos/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
    },
};
