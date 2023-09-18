import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ReviewPage.css";
import axios from "axios";
import { ReviewDetailDto } from "../dto/ReviewDetailDto";

function ReviewPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [reviewDetail, setReviewDetail] = React.useState<ReviewDetailDto | null>(null); // 검색 여부 [true: 검색, false: 검색x
    const [isLoading, setIsLoading] = React.useState();

    useEffect(() => {
        const reviewId = queryParams.get('reviewId');

        reviewDetail === null ? 
        axios({
            method: 'get', // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/review/detail?reviewId=${reviewId}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
            }
        }).then((res) => {
            setReviewDetail(res.data);
        }) : console.log("review detail ", reviewDetail);
    }, []);

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