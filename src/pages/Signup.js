import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../API/ServerAPI";

export default function Signup() {
    // 이메일, 비밀번호 상태
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 유효성 검사 관련 상태
    const [validationEmail, setValidationEmail] = useState(false);
    const [validationPW, setValidationPW] = useState(false);

    // 페이지 이동
    const navigate = useNavigate();

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

    // 회원가입
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await authAPI.signup(email, password);
            alert("회원가입에 성공하셨습니다.\n로그인 페이지로 이동합니다.");
            navigate("/signin");
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
                    회원가입
                </button>
            </div>
        </form>
    );
}
