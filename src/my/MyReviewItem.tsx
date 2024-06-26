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

        const handleWrite = (event: React.MouseEvent, id: number) => {
            event.stopPropagation();
            navigate(`/review/write?reviewId=${id}`);
        };
        
        return (
            <div className="myreview_div" onClick={() => onClick(props.reviewId)}>
                <div className="nth_container">
                    <p title={props.title} id="my_review_title">{props.title}</p>
                </div>
                <div className="nth_right_div">
                    <div className="nth_button_div" onClick={(event) => handleWrite(event, props.reviewId)}>
                        <p id="nth_text">review</p>
                        <img src="/pen.png" alt="" id="pen"/>
                    </div>
                    <p id="my_review_date">{props.date}</p>
                </div>
            </div>
        );
    }

    export default MyReviewItem;