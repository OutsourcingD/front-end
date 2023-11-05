import React from "react";
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Footer from "../bottom/Footer";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const emailRegEx =
        /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const navigate = useNavigate();

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const pwdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginHandler();
    };

    const loginHandler = () => {
        emailRegEx.test(email)
            ? axios({
                  method: "post",
                  url: `/api/login`,
                  data: {
                      userId: email,
                      password: pwd,
                  },
              }).then((res) => {
                  localStorage.setItem("access_token", res.data.accessToken);
                  localStorage.setItem("refresh_token", res.data.refreshToken);
                  localStorage.setItem("member_id", res.data.memberId);
                  localStorage.setItem("flvnsfl", res.data.flvnsfl);
                  ;
              }).catch((err) => {
                if(err.response.status === 401 || err.response.status === 403) {
                    alert("Check the ID or Password.");
                }
                else if(err.response.status === 404) {
                    alert("This ID is not exist.");
                }
                else {
                    alert(`Contact to developer. ${err.response.status}`);
                    navigate("/login");
                }        
              })
            : alert("Invalid email format.");
    };

    const signUpHandler = () => {
        navigate("/signup");
    };

    return (
        <div className="login_container">
            <div className="login_wrapper">
                <div className="login_item_div">
                    <p id="login_item_title">Login</p>
                </div>
                <div className="login_id_input_div">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            id="login_id_input"
                            placeholder="Id"
                            type="email"
                            value={email}
                            onChange={emailHandler}
                        />
                    </form>
                </div>
                <div className="pwd_id_input_div">
                    <form onSubmit={onSubmit}>
                        <input
                            id="login_pwd_input"
                            placeholder="Password"
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
                    <p id="find_id" onClick={() => navigate("/login/find")}>
                        Find Id / Pwd
                    </p>
                    <p id="sign_up" onClick={signUpHandler}>
                        Sign up
                    </p>
                </div>
            </div>
            <div style={{ height: "40%" }}></div>
            <Footer />
        </div>
    );
}

export default Login;
