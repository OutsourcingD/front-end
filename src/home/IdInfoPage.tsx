import React from "react";
import "./IdInfoPage.css"

function IdInfoPage() {
  return (
    <div className="id_result_div">
        <div className="id_result_text_div">
            <p id="id_infomanage_title">The ID matches the information you entered.</p>
            <div className="id_infomanage_div">
                <p id="id_infomanage_id">ID :</p>
                <p id="id_infomanage_id_data">Kimchulsoo@gmail.com</p>
            </div>
            <div className="id_infomanage_date_div">
                <p id="join_date">Join date : </p>
                <p id="join_date">2018. 10. 33</p>
            </div>
            <div className="id_result_button_div">
                <div className="id_result_ok_button">
                    <p id="id_result_ok_button_text">OK</p>
                </div>
                <div className="id_result_pwd_button">
                    <p id="id_result_pwd_button_text">Find PWD</p>
                </div>
            </div>
        </div>
        <div>

        </div>
    </div>
  );
}

export default IdInfoPage;
