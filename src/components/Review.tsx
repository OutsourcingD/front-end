import React from "react";
import "./Review.css";
import { AiOutlineStar } from "react-icons/ai";

interface ReviewProps {
    reviewTitle: string;
    reviewDescription: string;
    reviewImage: string;
    hospitalName: string;
    totalRate: number;
    part: string[];
    doctorName: string;
    imageUrl: string;
    imageAlt: string;
    imageId: number;
    reviewId: number;
}

const  Review : React.FC<ReviewProps> = (props: ReviewProps) => {
  return ( 
        <div className="review_main">
            { /* 이미지 섹션 */}
            <div className="review_image_div">
                <img src={props.imageUrl} alt={props.imageAlt} id="review_image"/>
                <div className="review_text_div_">
                    <p id="review_title">{props.reviewTitle}</p>
                    <p id="description">{props.reviewDescription?.substring(0, 57)}</p>
                </div>
                <div className="review_text_div">
                    <p id="review_title">{props.reviewTitle}</p>
                    <p id="description">{props.reviewDescription}</p>
                </div>
            </div>
            { /* 병원 정보 섹션 */}
            <div className="hospital_info_div">
                {/* 정보 및 평점 섹션 */}
                <div className="hospital_rate_info_div">
                    <p id="hospital_name">{props.hospitalName}</p>
                    <div className="rate_start_div">
                        <AiOutlineStar size="5%" color="#F8CE3D"/>
                        <p id="hospital_rate">{props.totalRate}</p>
                        <p id="surgery_part">{props.part?.join(" + ")}</p>
                        <p id="doctor_name">{props.doctorName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Review;