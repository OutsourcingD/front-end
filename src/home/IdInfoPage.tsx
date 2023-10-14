import React from "react";
import "./IdInfoPage.css";
import { FindIdDto } from "../dto/FindIdDto";
import { useNavigate } from "react-router-dom";

const IdInfoPage = (props: FindIdDto) => {
    const navigate = useNavigate();

    return (
        <div className="id_result_div">
            <div className="id_result_text_div">
                <p id="id_infomanage_title">
                    The ID matches the information you entered.
                </p>
                <div className="id_infomanage_div">
                    <p id="id_infomanage_id">ID :</p>
                    <p id="id_infomanage_id_data">{props.userId}</p>
                </div>
                <div className="id_infomanage_date_div">
                    <p id="join_date">Join date : </p>
                    <p id="join_date">{props.createdAt}</p>
                </div>
                <div className="id_result_button_div">
                    <div
                        className="id_result_ok_button"
                        onClick={() => navigate("/login")}
                    >
                        <p id="id_result_ok_button_text">OK</p>
                    </div>
                    <div className="id_result_pwd_button" onClick={() => props.revert(false)}>
                        <p id="id_result_pwd_button_text">Find PWD</p>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default IdInfoPage;
