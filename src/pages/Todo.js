export default function Todo() {
    return (
        <div>
            Add Todo
            <input data-testid="new-todo-input" />
            <button data-testid="new-todo-add-button">추가</button>
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
