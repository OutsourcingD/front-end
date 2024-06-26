import React, { useState, useEffect, useRef } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../bottom/Footer";

function SignUp() {
    const [duplicated, setDuplicated] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRepassword] = useState("");
    const [code, setCode] = useState("");
    const [verified, setVerified] = useState(false);
    const [nickname, setNickname] = useState("");
    const [codeVerified, setCodeVerified] = useState(0);
    const [name, setName] = useState("");
    const [count, setCount] = useState(120);
    const [phone_number, setPhoneNumber] = useState("");
    const [gender, setGender] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const navagate = useNavigate();
    const [image, setImage] = useState("/person.png");
    const [prevImage, setPrevImage] = useState("/person.png");
    const [profileFile, setProfileFile] = useState<File | null>(null); // 파일 객체를 위한 상태
    const emailRegEx =
        /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    const fileInput = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

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

    const pushCode = async (email: string) => {
        await axios
            .post(
                '/api/email/signup-verification',
                {
                    email: email,
                }
            )
            .then((res) => {
                localStorage.setItem("code", res.data);
            }).catch((err) => {
                alert(`Contact to developer. ${err.response.status}`);  
            });

        setCount(120);
        setVerified(true);
        setCountDown();
    };

    const setCountDown = () => {
        const id = setInterval(() => {
            if (count === 0 || codeVerified) {
                clearInterval(id); // 타이머 멈추기
                return;
            }
            setCount((count) => count - 1);
        }, 1000);

        setIntervalId(id); // intervalId 상태 업데이트
    };

    useEffect(() => {
        // codeVerified 값 변경시 타이머 멈추기
        if (codeVerified && intervalId !== null) {
            clearInterval(intervalId);
            setIntervalId(null);
            setCount(120); // 초기 카운트값으로 재설정 (필요시)
            localStorage.removeItem("code");
        }
    }, [codeVerified]);

    const checkMailCode = async (code: string) => {
        await axios
            .post('/api/email/signup/verify', {
                code: code,
            })
            .then((res) => {
                res.data && count >= 0
                    ? setCodeVerified(1)
                    : setCodeVerified(2);
            })
            .catch((err) => {
                alert(`Contact to developer. ${err.response.status}`);
            });
    };

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const checkDuplicatedNickname = async (nickname: string) => {
        await axios
            .get(
                `/api/non-member/check-duplicated?name=${nickname}`,
            )
            .then((res) => {
                setDuplicated(res.data ? 2 : 1);
            })
            .catch((err) => {
                alert(`Contact to developer. ${err.response.status}`);
            });
    };

    const signUp = async () => {
        if (
            duplicated === 1 &&
            password === rePassword &&
            verified &&
            codeVerified
        ) {
            const formData = new FormData();

            if (profileFile !== null) formData.append("profile", profileFile);
            formData.append("userId", email);
            formData.append("password", password);
            formData.append("name", name);
            formData.append("nickname", nickname);
            formData.append("phoneNumber", phone_number);
            formData.append("gender", gender.toString());

            await axios
                .post(
                    '/api/login/member',
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((res) => {
                    localStorage.setItem("access_token", res.data.accessToken);
                    localStorage.setItem(
                        "refresh_token",
                        res.data.refreshToken
                    );
                    localStorage.setItem("user_id", res.data.memberId);
                    localStorage.setItem("profile", res.data.name);
                    navagate("/");
                })
                .catch((err) => {
                    alert(`Contact to developer. ${err.response.status}`);
                });
        } else {
            alert("필수 정보를 입력하세요.");
        }
    };

    const saveImgFile = () => {
        if (fileInput.current === null || fileInput.current.files === null) {
            setImage(prevImage); // 파일 선택이 없거나 취소된 경우 이전 사진으로 복원
            return;
        }
        const file = fileInput.current.files[0];
        const reader = new FileReader();

        if (!(file instanceof Blob)) {
            setImage(prevImage); // 파일 선택이 없거나 취소된 경우 이전 사진으로 복원
            return;
        }

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (
                fileInput.current !== null &&
                fileInput.current.files !== null &&
                typeof reader.result === "string"
            ) {
                setPrevImage(reader.result); // 현재 image 상태를 prevImage에 저장합니다.
                setImage(reader.result);

                const profile = fileInput.current.files[0];

                setProfileFile(profile);
            }
        };
    };

    return (
        <div className="signup_div">
            <div className="signup_wrapper">
                <div className="signup_title_div">
                    <p id="signup_title">Sign up</p>
                </div>
                {/* 프로필 이미지 입력 */}
                <div className="signup_input_div">
                    <img src="/camera.png" alt="" id="camera_img" />
                    <img
                        src={image}
                        alt="profile"
                        id="profile_input_img"
                        onClick={() => {
                            fileInput.current?.click();
                        }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        id="signup_input"
                        name="profile"
                        style={{ display: "none" }}
                        onChange={saveImgFile}
                        ref={fileInput}
                    ></input>
                </div>
                {/* id 입력 섹션 */}
                <div className="signup_email_div">
                    <div className="signup_email_title_div">
                        <p id="signup_email_title">email</p>
                        <p id="essential">*</p>
                        {verified ? (
                            <p id="email_verified">verified</p>
                        ) : null}
                    </div>
                    <div className="email_form_container">
                        <div className="email_form_div">
                            <form onSubmit={sendEmail} id="sign_up_form">
                                <input
                                    id="signup_email_input"
                                    placeholder="Enter your email"
                                    type="email"
                                    value={email}
                                    onChange={emailHandler}
                                />
                            </form>
                            <p id="word_num">{email.length}/30</p>
                        </div>
                        {emailRegEx.test(email) ? (
                            <div
                                className="sign_up_active_button_div"
                                onClick={() => pushCode(email)}
                            >
                                <p id="verify_active_button_text">push</p>
                            </div>
                        ) : (
                            <div className="sign_up_button_div">
                                <p id="verify_button_text">push</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* 인증번호 입력 섹션 */}
                <div className="signup_email_div">
                    <div className="signup_email_title_div">
                        <p id="signup_email_title">Verified code</p>
                        <p id="essential">*</p>
                        {codeVerified === 1 ? (
                            <p id="email_verified">verified.</p>
                        ) : null}
                        {codeVerified === 2 ? (
                            <p id="email_verified">
                                Enter authentication again.
                            </p>
                        ) : null}
                    </div>
                    <div className="email_form_container">
                        <div className="email_form_div">
                            <form onSubmit={sendEmail} id="sign_up_form">
                                <input
                                    id="signup_email_input"
                                    placeholder="Enter an authentication code"
                                    type="text"
                                    value={code}
                                    onChange={codeHandler}
                                />
                            </form>
                            {verified ? (
                                <p id="count_time">
                                    {codeVerified !== 1
                                        ? `${Math.floor(count / 60)}:${String(
                                              count % 60
                                          ).padStart(2, "0")}`
                                        : null}
                                </p>
                            ) : null}
                        </div>
                        {code.length >= 6 ? (
                            <div
                                className="sign_up_active_button_div"
                                onClick={() => checkMailCode(code)}
                            >
                                <p id="verify_active_button_text">verify</p>
                            </div>
                        ) : (
                            <div className="sign_up_button_div">
                                <p id="verify_button_text">verify</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* 비밀번호 입력 섹션 */}
                <div className="signup_email_div">
                    <div className="signup_email_title_div">
                        <p id="signup_email_title">password</p>
                        <p id="essential">*</p>
                        {password.length >= 8 && password.length <= 16 ? (
                            <p id="email_verified">
                                available.
                            </p>
                        ) : null}
                    </div>
                    <div className="email_form_container">
                        <div className="email_form_div">
                            <form onSubmit={sendEmail} id="sign_up_form">
                                <input
                                    id="signup_email_input"
                                    placeholder="Enter a password of 8 to 16."
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
                        <p id="signup_email_title">Check Password</p>
                        <p id="essential">*</p>
                        {rePassword !== password ? (
                            <p id="password_verified">
                                password mismatch.
                            </p>
                        ) : null}
                    </div>
                    <div className="email_form_container">
                        <div className="email_form_div">
                            <form onSubmit={sendEmail} id="sign_up_form">
                                <input
                                    id="signup_email_input"
                                    placeholder="Enter your password again"
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
                        <p id="signup_email_title">Nickname</p>
                        <p id="essential">*</p>
                        {duplicated === 1 ? (
                            <p id="email_verified">available nickname.</p>
                        ) : null}
                        {duplicated === 2 ? (
                            <p id="password_verified">duplicated nickname.</p>
                        ) : null}
                    </div>
                    <div className="email_form_container">
                        <div className="email_form_div">
                            <form onSubmit={sendEmail} id="sign_up_form">
                                <input
                                    id="signup_email_input"
                                    placeholder="Enter your nickname"
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
                                onClick={() =>
                                    checkDuplicatedNickname(nickname)
                                }
                            >
                                <p id="verify_active_button_text">check</p>
                            </div>
                        ) : (
                            <div className="sign_up_button_div">
                                <p id="verify_button_text">Check</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* 이름 입력 섹션 */}
                <div className="signup_email_div">
                    <div className="signup_email_title_div">
                        <p id="signup_email_title">Name</p>
                    </div>
                    <div className="email_form_container">
                        <div className="email_form_div">
                            <form onSubmit={sendEmail} id="sign_up_form">
                                <input
                                    id="signup_email_input"
                                    placeholder="Enter your name"
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
                        <p id="signup_email_title">Phone number</p>
                    </div>
                    <div className="email_form_container">
                        <div className="email_form_div">
                            <form onSubmit={sendEmail} id="sign_up_form">
                                <input
                                    id="signup_email_input"
                                    placeholder="Enter your phone number"
                                    type="text"
                                    value={phone_number}
                                    onChange={phoneNumberHandler}
                                />
                            </form>
                        </div>
                    </div>
                </div>
                {/* 성별 입력 섹션 */}
                <p id="signup_email_title">Gender</p>
                <div className="gender_div">
                    {gender === 1 ? (
                        <div
                            className="gender_button_click_div"
                            onClick={() => setGender(0)}
                        >
                            <img
                                src="/male_pupple.png"
                                alt="male"
                                id="gender_button"
                            />
                        </div>
                    ) : (
                        <div
                            className="gender_button_div"
                            onClick={() => setGender(1)}
                        >
                            <img
                                src="/male.png"
                                alt="male"
                                id="gender_button"
                            />
                        </div>
                    )}
                    {gender === 2 ? (
                        <div
                            className="gender_button_click_div"
                            onClick={() => setGender(0)}
                        >
                            <img
                                src="/female_pupple.png"
                                alt="female"
                                id="gender_button"
                            />
                        </div>
                    ) : (
                        <div
                            className="gender_button_div"
                            onClick={() => setGender(2)}
                        >
                            <img
                                src="/female.png"
                                alt="female"
                                id="gender_button"
                            />
                        </div>
                    )}
                </div>
                <div className="signup_button_div" onClick={signUp}>
                    <p id="signup_button_text">agree and signup</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SignUp;
