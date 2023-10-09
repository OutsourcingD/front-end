import React, { useEffect } from "react";
import "./ReviewItem.css";
import { ReviewResponseDto } from "../dto/ReviewDto";

const ReviewItem = (props: ReviewResponseDto) => {    
    return (
        <div className="review_item">
            {/* 왼쪽 섹션 */}
            <div className="left_review_item">
                {/* 프로필 섹션 */}
                <div className="profile_div">
                    <img
                        src={props.profile}
                        alt="profile"
                        id="review_list_profile"
                    />
                </div>
                {/* 제목, 이름, 날짜 */}
                <div className="title_div">
                    <div className="review_item_title_div">
                        <p id="review_item_title">{props.title}</p>
                    </div>
                    <div className="review_user_div">
                        <p id="review_user">{props.nickname}</p>
                    </div>
                    <div className="review_date_div">
                        <p id="review_date">{props.createdAt}</p>
                    </div>
                </div>
            </div>
            {/* 목차, 내용, 조회수, 댓글 수 */}
            <div className="right_item_div">
                <div className="review_item_index_div">
                    <div className="index_hospital_div">
                        <div className="hospital_name_div">
                            <p id="index_hospital_name">병원</p>
                        </div>
                        <div className="hospital_name_data">
                            <p id="review_hospital_info">
                                {props.hospitalName}
                            </p>
                        </div>
                    </div>
                    <div className="index_hospital_div">
                        <div className="hospital_name_div">
                            <p id="index_hospital_name">원장님</p>
                        </div>
                        <div className="hospital_name_data">
                            <p id="review_doctor_info">{props.doctorName}</p>
                        </div>
                    </div>
                    <div className="index_hospital_div">
                        <div className="hospital_name_div">
                            <p id="index_hospital_name">부위</p>
                        </div>
                        <div className="hospital_name_data">
                            <p id="review_part_info">
                                {props.part?.length !== 0 &&
                                props.part?.length > 1
                                    ? props.part[0] + "..."
                                    : props.part[0]}
                            </p>
                        </div>
                    </div>
                </div>
                {/* 조회수 */}
                <div className="view_info">
                    <div className="view_div">
                        <img src="/Show.png" alt="" id="view_icon" />
                    </div>
                    <div className="view_info_div">
                        <p id="view_number">{props.viewCount}</p>
                    </div>
                </div>
                {/* 댓글 수 */}
                <div className="comment_div">
                    <div className="comment_image_div">
                        <img src="/Chat.png" alt="" id="comment_icon" />
                    </div>
                    <div className="view_info_div">
                        <p id="comment_number">{props.commentCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
