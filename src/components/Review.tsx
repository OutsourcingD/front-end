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
}

const  Review : React.FC<ReviewProps> = (props: ReviewProps) => {
  return ( 
        <div className="review_main">
            { /* 이미지 섹션 */}
            <div className="review_image_div">
                <img src="https://cdn.mhnse.com/news/photo/202305/183305_183232_222.jpg" alt="review_image" id="review_image"/>
                <div className="review_text_div_">
                    <p id="review_title">아름다운 성형외과</p>
                    <p id="description">아름다운성형외과 OOO원장님께 코, 윤곽,입술필러,쌍커풀 했어요. 3개월차 후기입니다. 2023년 1월..</p>
                </div>
                <div className="review_text_div">
                    <p id="review_title">아름다운 성형외과</p>
                    <p id="description">아름다운성형외과 OOO원장님께 코, 윤곽,입술필러,쌍커풀 했어요. 3개월차 후기입니다. 2023년 1월..</p>
                </div>
            </div>
            { /* 병원 정보 섹션 */}
            <div className="hospital_info_div">
                {/* 정보 및 평점 섹션 */}
                <div className="hospital_rate_info_div">
                    <p id="hospital_name">아름다운 성형외과</p>
                    <div className="rate_start_div">
                        <AiOutlineStar size="5%" color="#F8CE3D"/>
                        <p id="hospital_rate">3.5</p>
                        <p id="surgery_part">코+윤곽+입술필러+쌍꺼풀</p>
                        <p id="doctor_name">김철수 원장님</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Review;