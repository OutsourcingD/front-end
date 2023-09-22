import React from "react";
import "./IdInfoPage.css"

function IdInfoPage() {
  return (
    <div className="id_result_div">
        <div className="id_result_text_div">
            <p style={{fontSize: "15px"}}>입력하신 정보와 일치하는 아이디입니다.</p>
            <div style={{display: "flex", flexDirection: "row", marginTop: "7%"}}>
                <p style={{fontSize: "15px"}}>아이디 :</p>
                <p style={{fontSize: "18px", fontWeight: "700"}}>Kimchulsoo@gmail.com</p>
            </div>
            <div style={{display: "flex", flexDirection: "row", marginTop: "2%"}}>
                <p>가입일 : </p>
                <p>2018. 10. 33</p>
            </div>
            <div className="id_result_button_div" style={{display: "flex", flexDirection: "row", marginTop: "15%"}}>
                <div className="id_result_ok_button">
                    <p style={{fontSize: "15px", fontWeight: "700", color: "white"}}>OK</p>
                </div>
                <div className="id_result_pwd_button">
                    <p style={{fontSize: "15px", fontWeight: "700", color: "#888888"}}>Find PWD</p>
                </div>
            </div>
        </div>
        <div>

        </div>
    </div>
  );
}

export default IdInfoPage;
