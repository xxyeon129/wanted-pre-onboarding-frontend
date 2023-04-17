import { useState, useEffect } from "react";
import { authAPI } from "../API/ServerAPI";

export default function Signin() {
    // 이메일, 비밀번호
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 유효성 검사 관련 상태
    const [validationEmail, setValidationEmail] = useState(false);
    const [validationPW, setValidationPW] = useState(false);

    // 이메일 입력
    const handleInputEmail = (event) => {
        const inputEmail = event.target.value;
        setEmail(inputEmail);
    };

    // 비밀번호 입력
    const handleInputPW = (event) => {
        const inputPassword = event.target.value;
        setPassword(inputPassword);
    };

    // 유효성 검사에 따른 버튼 disabled 조건 변경
    useEffect(() => {
        if (email.includes("@")) {
            setValidationEmail(true);
        } else {
            setValidationEmail(false);
        }

        if (password.length >= 8) {
            setValidationPW(true);
        } else {
            setValidationPW(false);
        }
    }, [email, password]);

    // 로그인
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await authAPI.signin(email, password);
            console.log(res);
            localStorage.setItem("loginToken", res.data.access_token);
            alert("로그인에 성공하셨습니다.\nToDo List 페이지로 이동합니다.");
            window.location.reload();
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div id="email">
                    <label htmlFor="email">이메일</label>
                    <input
                        data-testid="email-input"
                        type="email"
                        placeholder="이메일을 입력해주세요."
                        onChange={handleInputEmail}
                    />
                </div>
                <div id="password">
                    <label>비밀번호</label>
                    <input
                        data-testid="password-input"
                        type="password"
                        placeholder="비밀번호를 8자 이상 입력해주세요."
                        onChange={handleInputPW}
                    />
                </div>
                <button
                    data-testid="signup-button"
                    type="submit"
                    disabled={!(validationEmail && validationPW)}
                >
                    로그인
                </button>
            </div>
        </form>
    );
}
