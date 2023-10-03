import React from "react";
import "./DoctorItem.css";
import { DoctorResponseDto } from "../dto/DoctorResponseDto";
import { useNavigate } from "react-router-dom";

const DoctorItem = (props : DoctorResponseDto) => {
    const naviagte = useNavigate();

    const onClick = (id: number) => {
        naviagte(`/doctor/detail?doctorId=${id}`);
    }

    return (
        <div className="doctor_item_container" onClick={() => onClick(props.postId)}>
            <div className="doctor_item_wrapper">
                <img src={props.mainImg} alt={props.hospitalName} id="doctor_item" />
            </div>
            <div className="doctor_info_div">
                <p id="doctor_name_info">{props.name}</p>
                <p id="doctors_hospital">{props.hospitalName}</p>
            </div>
        </div>
    );
}

export default DoctorItem;