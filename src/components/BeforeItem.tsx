import React from "react";
import "./BeforeItem.css";
import { BeforeAfterResponseDto } from "../dto/BeforeAfterResponseDto";

const BeforeItem = (props: BeforeAfterResponseDto) => {
    return (
        <div className="before_item_div_">
            <div className="before_img_div">
                <img id="before_img" src={props.beforeAfterVo.beforeImg} alt=""/>
                <div className="review_text_div_">
                    <p id="before_title">{props.beforeAfterVo.beforeAfterPeriod} before</p>
                </div>
                <div className="review_text_div">
                    <p id="before_title">{props.beforeAfterVo.beforeAfterPeriod} Before</p>
                </div>
            </div>
            <div className="after_img_div">
                <img id="after_img" src={props.beforeAfterVo.afterImg} alt="" />
                <div className="review_text_div_">
                    <p id="before_title">{props.beforeAfterVo.beforeAfterPeriod} After</p>
                </div>
                <div className="review_text_div">
                    <p id="before_title">{props.beforeAfterVo.beforeAfterPeriod} After</p>
                </div>
            </div>
        </div>
    );
}

export default BeforeItem;