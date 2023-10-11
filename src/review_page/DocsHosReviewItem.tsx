import React from "react";
import { DoctorReviewDto } from "../components/DoctorReviewDto";
import "./DocsHosReviewItem.css";
import { useNavigate } from "react-router-dom";

interface Props {
    dto: DoctorReviewDto;
    type: number;
}

const DocsHosReviewItem = (props: Props) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if(props.type === 0)
            navigate(`/doctor/detail?doctorId=${props.dto.id}`);
        else
            navigate(`/hospital/detail?hospitalId=${props.dto.id}`);
    }

    return (
        <div className="docs_hos_review_item_div" onClick={() => handleNavigate()}>
            <div className="docs_hos_review_item_left_div">
                <div className="docs_profile_div">
                    <img src={props.dto.profile} alt="" id="docs_profile" />
                </div>
                <div className="docs_info_div">
                    <div className="docs_name_div">
                        <p id="docs_name">{props.dto.doctorName}</p>
                        {props.dto.doctorName !== props.dto.hospitalName ? <p id="docs_hos_name">{props.dto.hospitalName}</p> : null}
                    </div>
                    <div className="docs_review_number_div">
                        <p id="docs_review_number">{props.dto.totalElements} reviews</p>
                    </div>
                </div>
            </div>
            <div className="docs_hos_review_item_right_div">
                {
                    props.dto.partList.map((part) => {
                        return (
                            <div className="docs_hos_category_div">
                                <p id="docs_hos_category">{part}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default DocsHosReviewItem;