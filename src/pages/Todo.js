import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import { TodoAPI } from "../API/ServerAPI";

export default function Todo() {
    // 입력 input, 입력한 To Do List 관련 상태
    const [inputTodo, setInputTodo] = useState("");
    const [todoList, setTodoList] = useState([]);

    // To Do List 렌더링
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
