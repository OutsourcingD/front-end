import React from "react";
import "./MyCommentItem.css";

interface MyCommentItemProps {
    title: string;
}

const MyCommentItem = (props: MyCommentItemProps) => {
    return (
        <div className="mycomment_div">
            <p id="my_comment_title">{props.title}</p>
        </div>
    );
}

export default MyCommentItem;