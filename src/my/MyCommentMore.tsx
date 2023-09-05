import React from "react";
import "./MyCommentMore.css";
import MyCommentItem from "./MyCommentItem";

function MyRecommendReview() {
  const my_review_list = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];

  return (
    <div className="my_recommend_review_div">
      <div className="my_recommend_review_header">
        <p id="my_recommend_review_title">나의 댓글</p>
      </div>
      <div className="my_review_item_list_div">
        {my_review_list.map((item, index) => {
          return (
            <div key={index}>
              <MyCommentItem />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyRecommendReview;
