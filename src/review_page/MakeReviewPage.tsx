import React, { useEffect } from "react";
import "./MakeReviewPage.css";
import MakeReviewItem from "./MakeReviewItem";
import MakeBeforeItem from "./MakeBeforeItem";

interface ReviewProps {
  checkBox: boolean;
}

const MakeReviewPage = ({ checkBox }: ReviewProps) => {
  const [isReview, setIsReview] = React.useState<boolean>(false);
  
  const handleReview = (review: boolean) => {
    setIsReview(review);
  };

  return (
    <div className="review_page_div">
      {/* header */}
      <div className="make_review_title_div">
        <p id="make_review_title">후기 작성</p>
        <div className="apply_review_button_div">
          <p id="apply_review_text">apply</p>
        </div>
      </div>
      {/* category */}
      <div className="make_review_category_div">
        <p id="make_review_category_text">카테고리</p>
        <div className="check_box">
          <div className="checkbox_container">
            {isReview ? (
              <img
                src="/checkbox.png"
                alt=""
                id="checkbox"
                onClick={() => handleReview(!isReview)}
              />
            ) : (
              <img src="/checkbox_pupple.png" alt="" id="checkbox" />
            )}
          </div>
          <p id="checkbox_label">리뷰</p>
        </div>
        <div className="check_box">
          <div className="before_checkbox_container">
            {!isReview ? (
              <img
                src="/checkbox.png"
                alt=""
                id="checkbox"
                onClick={() => handleReview(!isReview)}
              />
            ) : (
              <img src="/checkbox_pupple.png" alt="" id="checkbox_pupple" />
            )}
          </div>
          <p id="checkbox_label">전후 사진 리뷰</p>
        </div>
      </div>
      {
        !isReview ? <MakeReviewItem /> : <MakeBeforeItem />
      }
    </div>
  );
};

export default MakeReviewPage;
