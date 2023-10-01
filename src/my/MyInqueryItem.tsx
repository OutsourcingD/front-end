import React from "react";
import "./MyInqueryItem.css";
import { MyInqueryDto } from "../dto/MyInqueryDto";

const MyInqueryItem = (props: MyInqueryDto) => {
    return (
        <div className="my_inquery_div">
            <p id="my_inquery_title">{props.content}</p>
            <p id="is_recieved">{props.answer !== null ? "답변 완료" : "답변 대기 중"}</p>
        </div>
    );
}

export default MyInqueryItem;