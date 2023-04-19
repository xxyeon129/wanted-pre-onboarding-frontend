import { useState } from "react";
import { authAPI } from "../API/ServerAPI";
import Auth from "../components/Auth";
import * as Style from "../components/style/TemplateStyle";
import { Link } from "react-router-dom";

export default function Signin() {
    // 이메일, 비밀번호 상태
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 로그인
    const handleSigninSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await authAPI.signin(email, password);
            localStorage.setItem("loginToken", res.data.access_token);
            alert("로그인에 성공하셨습니다.\nToDo List 페이지로 이동합니다.");
            window.location.reload();
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <Style.Wrapper>
            <h1>Login</h1>
            <Auth
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                submit={handleSigninSubmit}
                btnText={"로그인"}
            />
            <div id="signup">
                회원이 아니신가요? <Link to="/signup">회원가입</Link>
            </div>
        </Style.Wrapper>
    );
}
