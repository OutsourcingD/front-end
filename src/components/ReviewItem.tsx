import React from "react";
import "./ReviewItem.css";

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
                        <p id="review_item_title">아름다운 성형외과에서 김철수 원장님게 윤곽수술 받았어요 (성형 3개월차 후기)</p>
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
                <div className="index_name_div">
                    <p>병원</p>
                    <p>원장</p>
                    <p>부위</p>
                </div>
                <div className="info_div">
                    <p>아름다운 성형외과</p>
                    <p>김철수 원장님</p>
                    <p>윤곽수술</p>
                </div>
                <div className="watch_div">
                    <div className="view_div">
                        <div className="view_image_div">
                            <img src="view.png" alt="view" />
                        </div>
                        <p>2,302</p>
                    </div>
                </div>
                <div className="comment_div">
                    <div>
                        <div className="comment_image_div">
                            <img src="comment.png" alt="comment" />
                        </div>
                        <p>238</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewItem;