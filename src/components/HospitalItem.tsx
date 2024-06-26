import React, { useEffect } from "react";
import "./HospitalItem.css";
import { HospitalResponseDto } from "../dto/HospitalResponseDto";
import { useNavigate } from "react-router-dom";

const HospitalItem = (props: HospitalResponseDto) => {
    const firstImage = props.hospitalImg && props.hospitalImg !== null ? props.hospitalImg : null;
    const navigate = useNavigate();

    const onClick = (id: number) => {
        navigate(`/hospital/detail?hospitalId=${id}`);
    }

    return (
        <div className="hospital_item_container" onClick={() => onClick(props.postId)}>
            <div className="hospital_item_wrapper">
                {firstImage && <img src={firstImage} alt={props.name} id="hospital_item" />}
            </div>
            <div className="hospital_info_div">
                <p id="hospital_name_info">{props.name}</p>
                <p id="hospital_hospital">{props.location}</p>
            </div>
        </div>
    );
}

export default HospitalItem;