import React from "react";
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const navigate = useNavigate();

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const pwdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  }

  const loginHandler = () => {
    emailRegEx.test(email) ? alert("로그인") : alert("이메일 형식이 올바르지 않습니다.");
  }

  const signUpHandler = () => {
    navigate("/signup");
  }

  return (
    <div className="login_container">
      <div className="login_wrapper">
        <div className="login_item_div">
          <p id="login_item_title">로그인</p>
        </div>
        <div className="login_id_input_div">
          <form>
            <input
              id="login_id_input"
              placeholder="아이디"
              type="email"
              value={email}
              onChange={emailHandler}
            />
          </form>
        </div>
        <div className="pwd_id_input_div">
          <form>
            <input
              id="login_pwd_input"
              placeholder="비밀번호"
              type="password"
              value={pwd}
              onChange={pwdHandler}
            />
          </form>
        </div>
        <div className="login_button_item_div" onClick={loginHandler}>
            <p id="login_item_text">Login</p>
        </div>
        <div className="login_more_div">
            <p id="find_id" onClick={() => navigate('/login/find')}>아이디 찾기 / 비밀번호 찾기</p>
            <p id="sign_up" onClick={signUpHandler}>회원가입</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
