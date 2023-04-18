import { useState, useEffect, useRef } from "react";

export default function Auth({
    email,
    setEmail,
    password,
    setPassword,
    submit,
    btnText,
}) {
    // 유효성 검사 관련 상태
    const [validationEmail, setValidationEmail] = useState(false);
    const [validationPW, setValidationPW] = useState(false);

    // 이메일 포커싱
    const emailRef = useRef("");

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

    // 렌더링 시 이메일 자동 포커싱
    useEffect(() => {
        emailRef.current.focus();
    }, []);

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

    return (
        <form onSubmit={submit}>
            <div>
                <div id="email">
                    <label htmlFor="email">이메일</label>
                    <input
                        data-testid="email-input"
                        type="email"
                        ref={emailRef}
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
                    {btnText}
                </button>
            </div>
        </form>
    );
}
