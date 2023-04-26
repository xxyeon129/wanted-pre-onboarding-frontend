import { useState } from "react";
import styled from "styled-components";

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
    <TodoItemLiStyle>
      {editMode ? (
        <form onSubmit={handleTodoSubmit}>
          <TodoItemContainerStyle>
            <InputContainerStyle>
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
            </InputContainerStyle>
            <BtnContainerStyle>
              <button data-testid="submit-button" type="submit">
                제출
              </button>
              <button
                data-testid="cancel-button"
                onClick={() => {
                  setEditTodo(todo.todo);
                  setEditCheck(todo.isCompleted);
                  setEditMode(false);
                }}
              >
                취소
              </button>
            </BtnContainerStyle>
          </TodoItemContainerStyle>
        </form>
      ) : (
        <TodoItemContainerStyle>
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
          <BtnContainerStyle>
            <button data-testid="modify-button" onClick={() => setEditMode(true)}>
              수정
            </button>
            <button data-testid="delete-button" onClick={() => deleteTodo(todo.id)}>
              삭제
            </button>
          </BtnContainerStyle>
        </TodoItemContainerStyle>
      )}
    </TodoItemLiStyle>
  );
}

const TodoItemLiStyle = styled.li`
  border-radius: 5px;
  box-shadow: 1px 2px 5px 1px gainsboro;
  padding: 1rem;
  margin-top: 1rem;
  background: white;

  input[type="checkbox"] {
    margin-right: 0.5rem;
    :hover {
      cursor: pointer;
    }
  }

  input[type="text"] {
    outline: none;
    border: none;
    border-bottom: 2px solid #9ea9cc;

    :focus {
      border-bottom: 2px solid #3981f6;
    }
  }
`;

const TodoItemContainerStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BtnContainerStyle = styled.div`
  button {
    background-color: #d0d4e1;
    border-radius: 5px;
    padding: 0.5rem;

    :hover {
      cursor: pointer;
      transition: 0.5s;
      background-color: #3981f6;
      color: white;
    }
  }
  button + button {
    margin-left: 0.3rem;
  }
`;

const InputContainerStyle = styled.div`
  /* 코드 가독성을 위해 div 태그에 styled-components 적용 */
`;
