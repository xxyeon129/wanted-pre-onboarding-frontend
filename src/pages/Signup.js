import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../API/ServerAPI";
import Auth from "../components/Auth";
import * as Style from "../components/style/TemplateStyle";

export default function Signup() {
  // 이메일, 비밀번호 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 페이지 이동
  const navigate = useNavigate();

  // 회원가입
  const handleSignupSubmit = async (event) => {
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
    <Style.Wrapper>
      <h1>Sign up</h1>
      <Auth
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        submit={handleSignupSubmit}
        btnText={"회원가입"}
      />
    </Style.Wrapper>
  );
}
