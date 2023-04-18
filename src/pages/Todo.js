import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import { TodoAPI } from "../API/ServerAPI";
import styled from "styled-components";

export default function Todo() {
    // 입력 input, 입력한 To Do List 관련 상태
    const [inputTodo, setInputTodo] = useState("");
    const [todoList, setTodoList] = useState([]);

    // To Do List 표시
    const getTodo = async () => {
        try {
            const res = await TodoAPI.getTodo();
            setTodoList(res.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    // To Do 추가
    const createTodo = async (event) => {
        event.preventDefault();

        try {
            await TodoAPI.createTodo(inputTodo);
            setInputTodo("");
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    // To Do 수정
    const updateTodo = async (id, updatedTodo, updatedCheck) => {
        try {
            const res = await TodoAPI.updateTodo(id, updatedTodo, updatedCheck);
            const newTodoList = todoList.map((todo) =>
                todo.id === id ? res.data : todo
            );
            setTodoList(newTodoList);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    // To Do 삭제
    const deleteTodo = async (id) => {
        try {
            await TodoAPI.deleteTodo(id);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    // To Do List 렌더링 업데이트
    useEffect(() => {
        getTodo();
    }, [todoList]);

    return (
        <TodoStyle>
            <p>To Do List</p>
            <form onSubmit={createTodo} id="addTodoForm">
                <input
                    data-testid="new-todo-input"
                    placeholder="새로운 할 일을 입력해주세요."
                    onChange={(event) => setInputTodo(event.target.value)}
                    value={inputTodo}
                />
                <button data-testid="new-todo-add-button" type="submit">
                    Add
                </button>
            </form>
            <TodoItemStyle>
                {todoList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </TodoItemStyle>
        </TodoStyle>
    );
}

const TodoStyle = styled.div`
    width: 27rem;
    background-color: #fbfbff;
    border-radius: 20px;
    padding: 0 3rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    /* 가운데 정렬 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* To Do List 타이틀 */
    p {
        font-size: 2rem;
        font-weight: bold;
        color: #23315d;
        padding-top: 4rem;
        padding-bottom: 1rem;
    }

    /* To Do 추가 input, button */
    #addTodoForm {
        display: flex;
        justify-content: space-between;
        padding-bottom: 2rem;

        > input {
            border: 2px solid #9ea9cc;
            border-radius: 5px;
            padding: 0.5rem;
            width: 17.5rem;

            :focus {
                border-color: #3981f6;
            }
        }

        > button {
            background-color: #3981f6;
            color: white;
            font-weight: bold;
            padding: 0.7rem;
            border-radius: 5px;
            :hover {
                cursor: pointer;
                transition: 0.5s;
                background-color: #23315d;
            }
        }
    }
`;

const TodoItemStyle = styled.ul`
    padding-bottom: 4rem;
`;
