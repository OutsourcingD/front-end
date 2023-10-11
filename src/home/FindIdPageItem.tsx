import axios from "axios";
import React from "react";

interface FindIdPageItemProps {
    findId: (email: string) => void;
}

const FindIdPageItem = (props: FindIdPageItemProps) => {
    const [isId, setIsId] = React.useState<boolean>(true);
    const [email, setEmail] = React.useState<string>("");
    const [count, setCount] = React.useState<number>(120);
    const [verified, setVerified] = React.useState<boolean>(false);
    const [codeVerified, setCodeVerified] = React.useState<boolean>(false);
    const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(null);

    const onClick = () => {
        isId ? props.findId(email + "hi") : alert("잘못된 접근입니다.");
    };

    const pushCode = async (email: string) => {
        await axios
            .post(
                `${process.env.REACT_APP_SERVER_URL}/email/signup-verification`,
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

    React.useEffect(() => {
        // codeVerified 값 변경시 타이머 멈추기
        if (codeVerified && intervalId !== null) {
            clearInterval(intervalId);
            setIntervalId(null);
            setCount(120); // 초기 카운트값으로 재설정 (필요시)
            localStorage.removeItem("code");
        }
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
                            />
                        </form>
                    </div>
                    <div className="find_page_email_push_button_div">
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
                                type="email"
                            />
                        </form>
                        <p
                            style={{
                                color: "red",
                                fontSize: "11px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            6:00
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="find_page_verify_code_button_div"
                onClick={() => onClick()}
            >
                <div className="find_page_email_push_button_div">
                    <p id="find_page_code_verify_button_text">verify code</p>
                </div>
            </div>
        </>
    );
};

export default FindIdPageItem;
