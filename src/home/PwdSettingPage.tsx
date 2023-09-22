import React from "react";
import "./PwdSettingPage.css"

function PwdSettingPage() {
  return (
    <div className="pwd_setting_div">
        <div className="pwd_setting_info">
            <p id="pwd_setting_title">회원님의 비밀번호를 재설정해주세요</p>
        </div>
        <div className="pwd_setting_input_div">
            <p id="pwd_setting_pwd_input_div">비밀번호</p>
            <form id="setting_pwd_input_form">
                <input type="password" placeholder="8~16 글자의 비밀번호를 입력해주세요" id="pwd_setting_pwd_input" />
            </form>
        </div>
        <div className="pwd_setting_input_div">
            <p id="pwd_setting_pwd_input_div">비밀번호 확인</p>
            <form id="setting_pwd_input_form">
                <input type="password" placeholder="비밀번호를 재입력해주세요" id="pwd_setting_pwd_input" />
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
