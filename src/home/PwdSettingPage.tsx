import React from "react";
import "./PwdSettingPage.css"

function PwdSettingPage() {
  return (
    <div className="pwd_setting_div">
        <div className="pwd_setting_info">
            <p id="pwd_setting_title">Please reset your password.</p>
        </div>
        <div className="pwd_setting_input_div">
            <p id="pwd_setting_pwd_input_div">password</p>
            <form id="setting_pwd_input_form">
                <input type="password" placeholder="Please enter a password of 8 to 16 characters." id="pwd_setting_pwd_input" />
            </form>
        </div>
        <div className="pwd_setting_input_div">
            <p id="pwd_setting_pwd_input_div">password</p>
            <form id="setting_pwd_input_form">
                <input type="password" placeholder="Enter password again." id="pwd_setting_pwd_input" />
            </form>
        </div>
        <div className="pwd_setting_check_button_div">
            <div className="pwd_setting_check_button">
                <p id="pwd_setting_check_button">OK</p>
            </div>
        </div>
    </div>
  );
}

export default PwdSettingPage;
