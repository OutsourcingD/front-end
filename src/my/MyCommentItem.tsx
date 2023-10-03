import React from "react";
import "./MyCommentItem.css";
import { useNavigate } from "react-router-dom";

interface MyCommentItemProps {
    title: string;
    reviewId: number;
}

const MyCommentItem = (props: MyCommentItemProps) => {
    const navigate = useNavigate();

    const onClick = (id: number) => {
        navigate(`/review?reviewId=${id}`);
    }

    return (
        <div className="mycomment_div" onClick={() => onClick(props.reviewId)}>
            <p id="my_comment_title">{props.title}</p>
        </div>
    );
}

export default MyCommentItem;