import React from "react";
import "./MyPage.css";
import MyReviewItem from "./MyReviewItem";
import MyCommentItem from "./MyCommentItem";
import MyInqueryItem from "./MyInqueryItem";
import AdItem from "../components/AdItem";

function MyPage() {
  const items = [1, 2, 3, 4];

  return (
    <div className="mypage_div">
      {/* mypage 상단 */}
      <div className="mypage_title_div">
        <div className="mypage_title_left_div">
          <div className="mypage_name_div">
            <p id="mypage_name">김철수</p>
          </div>
          <div className="modify_mypage_button_div">
            <p id="mypage_sir">님</p>
            <img src="/setting1.png" alt="setting" id="mypage_setting_button" />
          </div>
        </div>
        <div className="mypage_title_right_div">
          <div className="write_review_button">
            <img src="/write_review.png" alt="write_review" id="write_review" />
          </div>
        </div>
      </div>
      {/* 마이페이지 본문 */}
      <div className="mypage_body">
        <div className="mypage_review_div">
          <div className="mypage_review_header_div">
            <p id="my_page_sub_title">나의 후기</p>
            <p id="my_page_more">더보기</p>
          </div>
          <div className="my_review_items_div">
            {items.map((item, index) => {
              return (
                <div key={index}>
                  <MyReviewItem
                    title="아름다운 성형외과에서 윤곽수술 받은 3개월차 후기"
                    date={"2023.09.0" + index}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* 나의 댓글 */}
        <div className="mypage_comment_div">
          {/* 나의 댓글 헤더 부분 */}
          <div className="mypage_review_header_div">
            <p id="my_page_sub_title">나의 댓글</p>
            <p id="my_page_more">더보기</p>
          </div>
          <div className="my_review_items_div">
            {items.map((item, index) => {
              return (
                <div key={index}>
                  <MyCommentItem />
                </div>
              );
            })}
          </div>
        </div>
        {/* 나의 문의 */}
        <div className="mypage_inquery_div">
          {/* 나의 문의 내역 헤더 부분 */}
          <div className="mypage_review_header_div">
            <p id="my_page_sub_title">나의 문의 내역</p>
            <p id="my_page_more">더보기</p>
          </div>
          <div className="my_review_items_div">
            {items.map((item, index) => {
              return (
                <div key={index}>
                  <MyInqueryItem />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* promotion */}
      <div className="mypage_bottom">
        <div className="mypage_inquery_div">
          <p id="my_page_sub_title">Special Promotion</p>
        </div>
        <div className="promotion_div">
          <AdItem />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
