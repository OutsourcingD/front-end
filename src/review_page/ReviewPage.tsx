import React from "react";
import { useLocation } from "react-router-dom";
import "./ReviewPage.css";

function ReviewPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const reviewId = queryParams.get('reviewId');

    return (
        <div className="review_detail_div">
            <div className="tag_div">
                <p>tag</p>
            </div>
            <div className="review_detail_title_div">
            <p>tag</p>
            </div>
            <div className="profile_edit_div">
            <p>tag</p>
            </div>
            <div className="review_detail_image_div">
            <p>tag</p>
            </div>
            <div className="review_first_detail">
            <p>tag</p>
            </div>
            <div className="review_nth_detail">
            <p>tag</p>
            </div>
            <div className="review_info">
            <p>tag</p>
            </div>
            <div className="review_comment">

            </div>
        </div>
    );
}

export default ReviewPage;