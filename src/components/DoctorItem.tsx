import React from "react";
import "./DoctorItem.css";

function DoctorItem() {
    return (
        <div className="doctor_item_container">
            <div className="doctor_item_wrapper">
                <img src="https://biz.chosun.com/resizer/kg1q6G9cABxpOlhDZRZF155nc0Q=/530x832/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/KCARQYWRWX4Q4NOTBDJIQUWAJE.jpg" alt="doctor" id="doctor_item" />
            </div>
            <div className="doctor_info_div">
                <p id="doctor_name_info">박소현</p>
                <p id="doctors_hospital">아름다운 성형외과</p>
            </div>
        </div>
    );
}

export default DoctorItem;