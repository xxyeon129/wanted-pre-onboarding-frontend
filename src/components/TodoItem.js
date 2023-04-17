import { useState } from "react";

export default function TodoItem({ todo, updateTodo, deleteTodo }) {
    // 수정 모드 관련 상태
    const [editMode, setEditMode] = useState(false);
    const [editTodo, setEditTodo] = useState(todo.todo);
    const [editCheck, setEditCheck] = useState(todo.isCompleted);

    // 수정 모드 제출 버튼 클릭 시 이벤트 (내용 업데이트, 수정모드 비활성화)
    const handleTodoSubmit = (event) => {
        event.preventDefault();
        updateTodo(todo.id, editTodo, editCheck);
        setEditMode(false);
    };

    return (
        <li>
            {editMode ? (
                <form onSubmit={handleTodoSubmit}>
                    <input
                        type="checkbox"
                        checked={editCheck}
                        onChange={() => setEditCheck(!editCheck)}
                    />
                    <input
                        data-testid="modify-input"
                        type="text"
                        value={editTodo}
                        onChange={(event) => setEditTodo(event.target.value)}
                    />
                    <button data-testid="submit-button" type="submit">
                        제출
                    </button>
                    <button
                        data-testid="cancel-button"
                        onClick={() => setEditMode(false)}
                    >
                        취소
                    </button>
                </form>
            ) : (
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={editCheck}
                            onChange={() => {
                                setEditCheck(!editCheck);
                                updateTodo(todo.id, editTodo, !editCheck);
                            }}
                        />
                        <span>{todo.todo}</span>
                    </label>
                    <button
                        data-testid="modify-button"
                        onClick={() => setEditMode(true)}
                    >
                        수정
                    </button>
                    <button
                        data-testid="delete-button"
                        onClick={() => deleteTodo(todo.id)}
                    >
                        삭제
                    </button>
                </div>
            )}
        </li>
    );
}
