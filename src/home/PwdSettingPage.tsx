import React from "react";
import "./PwdSettingPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface PwdSettingPageProps {
    userId: string;
}

function PwdSettingPage(props: PwdSettingPageProps) {
    const [pwd, setPwd] = React.useState<string>("");
    const [pwdCheck, setPwdCheck] = React.useState<string>("");
    const navigate = useNavigate();

    const onClick = () => {
        if (pwd === pwdCheck) {
            axios({
                method: "post",
                url: `${process.env.REACT_APP_SERVER_URL}/email/password/change`,
                data: {
                    newPassword: pwd,
                    userId: props.userId,
                },
            }).then((res) => {
                alert("Password reset complete.");
                navigate("/login");
            }).catch((err) => {
                alert(`Contact to developer. ${err.response.status}`);
            })
        }
        else {
            alert("Please check password.");
        }
    }

    return (
        <div className="pwd_setting_div">
            <div className="pwd_setting_info">
                <p id="pwd_setting_title">Please reset your password.</p>
            </div>
            <div className="pwd_setting_input_div">
                <p id="pwd_setting_pwd_input_div">password</p>
                <form id="setting_pwd_input_form">
                    <input
                        type="password"
                        placeholder="Please enter a password of 8 to 16 characters."
                        id="pwd_setting_pwd_input"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                    />
                </form>
            </div>
            <div className="pwd_setting_input_div">
                <p id="pwd_setting_pwd_input_div">password</p>
                <form id="setting_pwd_input_form">
                    <input
                        type="password"
                        placeholder="Enter password again."
                        id="pwd_setting_pwd_input"
                        value={pwdCheck}
                        onChange={(e) => setPwdCheck(e.target.value)}
                    />
                </form>
            </div>
            <div className="pwd_setting_check_button_div">
                <div className="pwd_setting_check_button" onClick={onClick}>
                    <p id="pwd_setting_check_button">OK</p>
                </div>
            </div>
        </div>
    );
}

export default PwdSettingPage;
