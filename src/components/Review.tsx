import React from "react";
import "./Review.css";
import { AiOutlineStar } from "react-icons/ai";
import axios from "axios";

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

const onClick = (id: number) => {
    axios({
        method: 'get', // or 'post', 'put', etc.
        url: `${process.env.REACT_APP_SERVER_URL}/review/detail?reviewId=${id}`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
        }
      }).then((res) => {
        console.log("추천 후기", res.data);
      });
}

const  Review : React.FC<ReviewProps> = (props: ReviewProps) => {
  return ( 
        <div className="review_main" onClick={() => onClick(props.reviewId)}>
            { /* 이미지 섹션 */}
            <div className="review_image_div">
                <img src={props.imageUrl} alt={props.imageAlt} id="review_image"/>
                <div className="review_text_div_">
                    <p id="review_title">{props.reviewTitle}</p>
                    <p id="description">{props.reviewDescription}</p>
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