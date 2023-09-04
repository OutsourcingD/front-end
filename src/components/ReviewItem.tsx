import React from "react";
import "./ReviewItem.css";
import { GrView } from "react-icons/gr";
import { PiChatTeardropDotsLight } from "react-icons/pi";

function ReviewItem() {
  return (
    <div className="review_item">
      {/* 왼쪽 섹션 */}
      <div className="left_review_item">
        {/* 프로필 섹션 */}
        <div className="profile_div">
          <img src="profile.png" alt="profile" />
        </div>
        {/* 제목, 이름, 날짜 */}
        <div className="title_div">
          <div className="review_item_title_div">
            <p id="review_item_title">
              아름다운 성형외과에서 김철수 원장님게 윤곽수술 받았어요 (성형
              3개월차 후기)
            </p>
          </div>
          <div className="review_user_div">
            <p id="review_user">성형으로 이뻐질거야</p>
          </div>
          <div className="review_date_div">
            <p id="review_date">2023.10.22</p>
          </div>
        </div>
      </div>
      {/* 목차, 내용, 조회수, 댓글 수 */}
      <div className="right_item_div">
				<div className="index_div">
					<div className="index_hospital_div">
            <p id="index_hospital_name">병원</p>
            <p id="review_hospital_info">아름다운 성형외과</p>
					</div>
					<div className="index_hospital_div">
            <p id="index_hospital_name">원장님</p>
            <p id="review_doctor_info">김철수 원장님</p>
					</div>
					<div className="index_hospital_div">
            <p id="index_hospital_name">부위</p>
            <p id="review_part_info">윤곽수술</p>
					</div>
				</div>
        {/* 조회수 */}
        <div className="view_info">
          <div className="view_div">
            <GrView id="view_icon"/>
          </div>
          <div className="view_info_div">
            <p id="view_number">2,302</p>
          </div>
        </div>
        {/* 댓글 수 */}
        <div className="comment_div">
          <div className="comment_image_div">
            <PiChatTeardropDotsLight id="comment_icon" />
          </div>
          <div>
          	<p id="comment_number">23</p>     
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;
