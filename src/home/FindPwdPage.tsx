import React from "react";
import "./FindPwdPage.css"
import axios from "axios";
import { FindIdDto } from "../dto/FindIdDto";

interface FindPwdProps {
    setResult: (result: FindIdDto) => void;
}

const FindPwdPage = (props: FindPwdProps) => {
    const [email, setEmail] = React.useState<string>("");
    const [count, setCount] = React.useState<number>(120);
    const [verified, setVerified] = React.useState<boolean>(false);
    const [codeVerified, setCodeVerified] = React.useState<number>(0);
    const [code, setCode] = React.useState<string>("");
    const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(
        null
    );
    const countRef = React.useRef(count);

    const pushCode = async (email: string) => {
        if (email === "") {
            alert("Please enter your email.");
        } else {
            await axios
                .post(
                    `${process.env.REACT_APP_SERVER_URL}/email/send-verification`,
                    {
                        email: email,
                    }
                )
                .then((res) => {
                    localStorage.setItem("code", res.data);
                    setCount(120);
                    setVerified(true);
                    setCodeVerified(1);
                    setCountDown();
                    console.log(res.data);
                })
                .catch((err) => {
                    if (err.response.status === 404) alert("Not found email");
                    else alert(`Contact to developer. ${err.response.status}`);
                });
        }
    };

    const setCountDown = () => {
        const id = setInterval(() => {
            if (countRef.current === 0 || codeVerified === 2) {
                clearInterval(id); // 타이머 멈추기
                return;
            }
            setCount((prevCount) => prevCount - 1);
            countRef.current = countRef.current - 1; // 이 부분 추가
        }, 1000);

        setIntervalId(id); // intervalId 상태 업데이트
    };

    const verifyCode = async (code: string) => {
        if (codeVerified === 0) {
            alert("Please push code.");
            return;
        }

        if (code.length === 6 && count < 120 && count > 0) {
            setCodeVerified(2);
            axios({
                method: "post",
                url: `${process.env.REACT_APP_SERVER_URL}/email/verify`,
                data: {
                    code: code,
                },
            })
                .then((res) => {
                    props.setResult(res.data);
                })
                .catch((err) => {
                    if (err.response.status === 404) alert("Not found email");
                    else alert(`Contact to developer. ${err.response.status}`);
                });
        } else if(count <= 0) {
            alert("Please push code.");
            return;
        }
        else {
            alert("Please enter 6 digits of the authentication number.");
            return;
        }
    };

    React.useEffect(() => {
        if (codeVerified === 2 && intervalId !== null) {
            clearInterval(intervalId);
            setIntervalId(null);
            setCount(120); // 초기 카운트값으로 재설정
            countRef.current = 120; // useRef도 초기화
            localStorage.removeItem("code");
        }

        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, [codeVerified]);

    return (
        <>
            <div className="find_page_email_input_div">
                <p id="find_id_page_input_title">Email</p>
                <div className="find_page_email_container">
                    <div className="find_page_email_form_div">
                        <form id="find_page_email_form">
                            <input
                                id="find_id_page_email_input"
                                placeholder="Enter an email."
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </form>
                    </div>
                    <div
                        className="find_page_email_push_button_div"
                        onClick={() => pushCode(email)}
                    >
                        <p id="find_page_email_push_button_text">push code</p>
                    </div>
                </div>
            </div>
            <div className="find_page_email_code_div">
                <p id="find_id_page_input_title">Authentication code</p>
                <div className="find_page_email_container">
                    <div className="find_page_verify_code_form_div">
                        <form id="find_page_email_form">
                            <input
                                id="find_id_page_email_input"
                                placeholder="Enter 6 digits of the authentication number."
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </form>
                        {verified ? (
                            <p id="find_page_count_time">
                                {codeVerified === 1
                                    ? `${Math.floor(count / 60)}:${String(
                                          count % 60
                                      ).padStart(2, "0")}`
                                    : null}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className="find_page_verify_code_button_div">
                <div
                    className="find_page_email_push_button_div"
                    onClick={() => verifyCode(code)}
                >
                    <p id="find_page_code_verify_button_text">verify code</p>
                </div>
            </div>
        </>
    );
}

export default FindPwdPage;
