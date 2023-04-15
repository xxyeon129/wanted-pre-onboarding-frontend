import axios from "axios";
import { useState } from "react";

export default function Todo() {
    const [inputTodo, setInputTodo] = useState("");

    // API
    const url = "https://www.pre-onboarding-selection-task.shop";
    // access token
    const access_token = localStorage.getItem("loginToken");

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
            <li>
                <label>
                    <input type="checkbox" />
                    <span>TODO 1</span>
                </label>
                <button data-testid="modify-button">수정</button>
                <button data-testid="delete-button">삭제</button>
            </li>
        </div>
    );
}
