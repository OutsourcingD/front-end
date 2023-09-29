import React from "react";
import { DoctorReviewDto } from "../components/DoctorReviewDto";
import "./DocsHosReviewItem.css";

const DocsHosReviewItem = (props: DoctorReviewDto) => {
    return (
        <div className="docs_hos_review_item_div">
            <div className="docs_hos_review_item_left_div">
                <div className="docs_profile_div">
                    <img src={props.profile} alt="" id="docs_profile" />
                </div>
                <div className="docs_info_div">
                    <div className="docs_name_div">
                        <p id="docs_name">{props.doctorName}</p>
                        {props.doctorName !== props.hospitalName ? <p id="docs_hos_name">{props.hospitalName}</p> : null}
                    </div>
                    <div className="docs_review_number_div">
                        <p id="docs_review_number">{props.totalElements} reviews</p>
                    </div>
                </div>
            </div>
            <div className="docs_hos_review_item_right_div">
                {
                    props.partList.map((part) => {
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