import React from "react";
import "./HospitalItem.css";

function HospitalItem() {
    return (
        <div className="hospital_item_container">
            <div className="hospital_item_wrapper">
                <img src="https://biz.chosun.com/resizer/kg1q6G9cABxpOlhDZRZF155nc0Q=/530x832/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/KCARQYWRWX4Q4NOTBDJIQUWAJE.jpg" alt="doctor" id="doctor_item" />
            </div>
            <div className="hospital_info_div">
                <p id="hospital_name_info">아름다운 성형외과</p>
                <p id="hospital_hospital">서울시 역삼동 성형외과 전문의</p>
            </div>
        </div>
    );
}

export default HospitalItem;