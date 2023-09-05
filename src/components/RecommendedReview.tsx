import React from "react";
import "./RecommendedReview.css";
import Category from "./Category";
import Search from "./Search";
import DropBox from "./DropBox";
import ReviewItem from "./ReviewItem";

function RecommendedReview() {
  const reviewList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="recommed_div">
      <div className="recommend_title_div">
        <p id="recommend_title">8월 2주차 커뮤니티 추천 후기글</p>
        <div className="hot_div">
          <img src="/hot.png" alt="hot" id="hot" />
        </div>
      </div>
      <Category />
      <div className="dropbox_div">
        <p>Doctors</p>
        <DropBox />
      </div>
      <div className="search_div">
        <Search />
      </div>
      {/*d 후기 리스트 섹션 */}
      <div className="review_list_div">
        {
          reviewList.map((review, index) => {
            return (
                <div className="review_item_div">
                  <ReviewItem 
                    key={review + index}
                  />
                </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default RecommendedReview;