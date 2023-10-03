import React from "react";
import "./MyReviewItem.css"; 
import { useNavigate } from "react-router-dom";

interface MyReviewItemProps {
    date: string;
    title: string;
}

const MyReviewItem : React.FC<MyReviewItemProps> = (props: MyReviewItemProps) => {
    const navigate = useNavigate();

    const onClick = (id: number) => {
        navigate(`/review/${id}`);    
    }
    
    return (
        <div className="myreview_div" >
            <p id="my_review_title">{props.title}</p>
            <p id="my_review_date">{props.date}</p>
        </div>
    );
}

export default MyReviewItem;