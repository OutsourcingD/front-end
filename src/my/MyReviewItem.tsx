import React from "react";
import "./MyReviewItem.css"; 
import { useNavigate } from "react-router-dom";

interface MyReviewItemProps {
    date: string;
    title: string;
    reviewId: number;
}

const MyReviewItem : React.FC<MyReviewItemProps> = (props: MyReviewItemProps) => {
    const navigate = useNavigate();

    const onClick = (id: number) => {
        navigate(`/review?reviewId=${id}`);    
    }
    
    return (
        <div className="myreview_div" onClick={() => onClick(props.reviewId)}>
            <p id="my_review_title">{props.title}</p>
            <p id="my_review_date">{props.date}</p>
        </div>
    );
}

export default MyReviewItem;