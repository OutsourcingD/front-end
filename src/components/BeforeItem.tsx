import React from "react";
import "./BeforeItem.css";
import { BeforeAfterResponseDto } from "../dto/BeforeAfterResponseDto";
import { BeforeDto } from "../dto/BeforeDetailDto";
import axios from "axios";

interface BeforeItemProps {
    item: BeforeAfterResponseDto;
    onClick: (id: number) => void;
}

const BeforeItem = (props: BeforeItemProps) => {
    const onClick = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
        event.stopPropagation(); // Add this line
        props.onClick(id);
    };

    return (
        <div className="before_item_div_" onClick={(event) => onClick(event, props.item.id)}>
            <div className="before_img_div">
                <img id="before_img" src={props.item.beforeAfterVo.beforeImg} alt=""/>
                <div className="review_text_div_">
                    <p id="before_title">{props.item.beforeAfterVo.beforeAfterPeriod} before</p>
                </div>
                <div className="review_text_div">
                    <p id="before_title">{props.item.beforeAfterVo.beforeAfterPeriod} Before</p>
                </div>
            </div>
            <div className="after_img_div">
                <img id="after_img" src={props.item.beforeAfterVo.afterImg} alt="" />
                <div className="review_text_div_">
                    <p id="before_title">{props.item.beforeAfterVo.beforeAfterPeriod} After</p>
                </div>
                <div className="review_text_div">
                    <p id="before_title">{props.item.beforeAfterVo.beforeAfterPeriod} After</p>
                </div>
            </div>
        </div>
    );
}

export default BeforeItem;