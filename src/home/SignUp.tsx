import React, { useState } from "react";
import "./SignUp.css";

function SignUp() {
  const [duplicated, setDuplicated] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [nickname, setNickname] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [name, setName] = useState("");
  const [count, setCount] = useState(120);
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(0);
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const codeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);

  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const repasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepassword(e.target.value);
  };

  const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const pushCode = () => {
    setVerified(true);
    setCountDown();
  };

  const setCountDown = () => {
    setInterval(() => {
      if(count === 0 || codeVerified) {
        console.log('error')
        return;
      }
      setCount((count) => count - 1);
    }, 1000);
  };

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <div className="signup_div">
      <div className="signup_wrapper">
        <div className="signup_title_div">
          <p id="signup_title">회원 정보를 입력해주세요</p>
        </div>
        {/* id 입력 섹션 */}
        <div className="signup_email_div">
          <div className="signup_email_title_div">
            <p id="signup_email_title">이메일</p>
            <p id="essential">*</p>
            {verified ? <p id="email_verified">인증되었습니다.</p> : null}
          </div>
          <div className="email_form_container">
            <div className="email_form_div">
              <form onSubmit={sendEmail}>
                <input
                  id="signup_email_input"
                  placeholder="이메일을 입력해주세요"
                  type="email"
                  value={email}
                  onChange={emailHandler}
                />
              </form>
              <p id="word_num">{email.length}/30</p>
            </div>
            {emailRegEx.test(email) ? (
              <div className="sign_up_active_button_div" onClick={pushCode}>
                <p id="verify_active_button_text">메일 인증</p>
              </div>
            ) : (
              <div className="sign_up_button_div">
                <p id="verify_button_text">메일 인증</p>
              </div>
            )}
          </div>
        </div>
        {/* 인증번호 입력 섹션 */}
        <div className="signup_email_div">
          <div className="signup_email_title_div">
            <p id="signup_email_title">인증번호</p>
            <p id="essential">*</p>
            {codeVerified ? <p id="email_verified">인증되었습니다.</p> : null}
          </div>
          <div className="email_form_container">
            <div className="email_form_div">
              <form onSubmit={sendEmail}>
                <input
                  id="signup_email_input"
                  placeholder="인증번호를 입력해주세요"
                  type="text"
                  value={code}
                  onChange={codeHandler}
                />
              </form>
              {verified ? (
                <p id="count_time">
                  {!codeVerified ? `${Math.floor(count / 60)}:${String(count % 60).padStart(2, "0")}` : null}
                </p>
              ) : null}
            </div>
            {code.length >= 6 ? (
              <div
                className="sign_up_active_button_div"
                onClick={() => setCodeVerified(true)}
              >
                <p id="verify_active_button_text">인증 확인</p>
              </div>
            ) : (
              <div className="sign_up_button_div">
                <p id="verify_button_text">인증 확인</p>
              </div>
            )}
          </div>
        </div>
        {/* 비밀번호 입력 섹션 */}
        <div className="signup_email_div">
          <div className="signup_email_title_div">
            <p id="signup_email_title">비밀번호</p>
            <p id="essential">*</p>
            {password.length >= 8 && password.length <= 16 ? (
              <p id="email_verified">사용가능한 비밀번호 입니다.</p>
            ) : null}
          </div>
          <div className="email_form_container">
            <div className="email_form_div">
              <form onSubmit={sendEmail}>
                <input
                  id="signup_email_input"
                  placeholder="8~16글자의 비밀번호를 입력해주세요"
                  type="password"
                  value={password}
                  onChange={passwordHandler}
                />
              </form>
            </div>
          </div>
        </div>
        {/* 비밀번호 재입력 섹션 */}
        <div className="signup_email_div">
          <div className="signup_email_title_div">
            <p id="signup_email_title">비밀번호 확인</p>
            <p id="essential">*</p>
            {rePassword !== password ? (
              <p id="password_verified">비밀번호가 일치하지 않습니다.</p>
            ) : null}
          </div>
          <div className="email_form_container">
            <div className="email_form_div">
              <form onSubmit={sendEmail}>
                <input
                  id="signup_email_input"
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  value={rePassword}
                  onChange={repasswordHandler}
                />
              </form>
            </div>
          </div>
        </div>
        {/* 닉네임 입력 섹션 */}
        <div className="signup_email_div">
          <div className="signup_email_title_div">
            <p id="signup_email_title">닉네임</p>
            <p id="essential">*</p>
            {duplicated === 1 ?<p id="email_verified">사용 가능한 닉네임입니다.</p> : null}
            {duplicated === 2 ? <p id="password_verified">중복된 닉네임입니다.</p> : null}
          </div>
          <div className="email_form_container">
            <div className="email_form_div">
              <form onSubmit={sendEmail}>
                <input
                  id="signup_email_input"
                  placeholder="닉네임을 입력해주세요"
                  type="text"
                  value={nickname}
                  onChange={nicknameHandler}
                />
              </form>
              <p id="word_num">{nickname.length}/30</p>
            </div>
            {nickname.length >= 2 && nickname.length <= 10 ? (
              <div
                className="sign_up_active_button_div"
                onClick={() => setDuplicated(2)}
              >
                <p id="verify_active_button_text">중복 확인</p>
              </div>
            ) : (
              <div className="sign_up_button_div">
                <p id="verify_button_text">중복 확인</p>
              </div>
            )}
          </div>
        </div>
        {/* 이름 입력 섹션 */}
        <div className="signup_email_div">
          <div className="signup_email_title_div">
            <p id="signup_email_title">이름</p>
          </div>
          <div className="email_form_container">
            <div className="email_form_div">
              <form onSubmit={sendEmail}>
                <input
                  id="signup_email_input"
                  placeholder="이름을 입력해주세요"
                  type="text"
                  value={name}
                  onChange={nameHandler}
                />
              </form>
              <p id="word_num">{nickname.length}/15</p>
            </div>
          </div>
        </div>
        {/* 전화번호 입력 섹션 */}
        <div className="signup_email_div">
          <div className="signup_email_title_div">
            <p id="signup_email_title">전화번호</p>
          </div>
          <div className="email_form_container">
            <div className="email_form_div">
              <form onSubmit={sendEmail}>
                <input
                  id="signup_email_input"
                  placeholder="전화번호를 입력해주세요"
                  type="text"
                  value={phone_number}
                  onChange={phoneNumberHandler}
                />
              </form>
            </div>
          </div>
        </div>
        {/* 성별 입력 섹션 */}
        <p id="signup_email_title">성별</p>
        <div className="gender_div">
            {
                gender === 1 ?
                <div className="gender_button_click_div" onClick={() => setGender(0)}>
                    <img src="/male_pupple.png" alt="male" id="gender_button" />
                </div>
                : 
                <div className="gender_button_div" onClick={() => setGender(1)}>
                    <img src="/male.png" alt="male" id="gender_button" />
                </div>
            }
            {
                gender === 2 ?
                <div className="gender_button_click_div" onClick={() => setGender(0)}>
                    <img src="/female_pupple.png" alt="female" id="gender_button" />
                </div>
                :
                <div className="gender_button_div" onClick={() => setGender(2)}>
                    <img src="/female.png" alt="female" id="gender_button"/>
                </div>
            }
        </div>
        <div className="signup_button_div">
            <p id="signup_button_text">agree and signup</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
