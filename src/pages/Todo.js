import axios from "axios";
import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";

export default function Todo() {
    // 입력 input, 입력한 To Do List 관련 상태
    const [inputTodo, setInputTodo] = useState("");
    const [todoList, setTodoList] = useState([]);

    // API
    const url = process.env.REACT_APP_SERVER_URL;
    // access token
    const access_token = localStorage.getItem("loginToken");

    // To Do List 렌더링
    const getTodo = () => {
        axios
            .get(`${url}/todos`, {
                headers: { Authorization: `Bearer ${access_token}` },
            })
            .then((res) => setTodoList(res.data));
    };

    // To Do 추가
    const createTodo = (event) => {
        event.preventDefault();

        axios
            .post(
                `${url}/todos`,
                { todo: inputTodo },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(() => setInputTodo(""))
            .catch((error) => alert(error.response.data.message));
    };

    // To Do 수정
    const updateTodo = (id, updatedTodo, updatedCheck) => {
        axios
            .put(
                `${url}/todos/${id}`,
                { todo: updatedTodo, isCompleted: updatedCheck },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                const newTodoList = todoList.map((todo) =>
                    todo.id === id ? res.data : todo
                );
                setTodoList(newTodoList);
            })
            .catch((error) => alert(error.response.data.message));
    };

    // To Do 삭제
    const deleteTodo = (id) => {
        axios
            .delete(`${url}/todos/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .catch((error) => alert(error.response.data.message));
    };

    useEffect(() => {
        getTodo();
    }, [todoList]);

    return (
        <div>
            Add Todo
            <form onSubmit={createTodo}>
                <input
                    data-testid="new-todo-input"
                    placeholder="새로운 할 일을 입력해주세요."
                    onChange={(event) => setInputTodo(event.target.value)}
                    value={inputTodo}
                />
                <button data-testid="new-todo-add-button" type="submit">
                    추가
                </button>
            </form>
            <ul>
                {todoList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
}
