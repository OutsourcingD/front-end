import React from "react";
import "./DoctorItem.css";
import { DoctorResponseDto } from "../dto/DoctorResponseDto";

const DoctorItem = (props : DoctorResponseDto) => {
    React.useEffect(() => {
        console.log(props.hospitalName);
    }, []);

    return (
        <div className="doctor_item_container">
            <div className="doctor_item_wrapper">
                <img src={props.imageVo.url} alt={props.imageVo.description} id="doctor_item" />
            </div>
            <div className="doctor_info_div">
                <p id="doctor_name_info">{props.doctorName}</p>
                <p id="doctors_hospital">{props.hospitalName}</p>
            </div>
        </div>
    );
}

export default DoctorItem;