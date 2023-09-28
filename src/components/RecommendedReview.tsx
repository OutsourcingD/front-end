import React, { useEffect, useState } from "react";
import "./RecommendedReview.css";
import Category from "./Category";
import Search from "./Search";
import DropBox from "./DropBox";
import ReviewItem from "./ReviewItem";
import { ReviewResponseDto } from "../dto/ReviewDto";
import axios from "axios";
import Footer from "../bottom/Footer";
import Pagination from "react-js-pagination";

function RecommendedReview() {
    const [reviewList, setReviewList] = React.useState<ReviewResponseDto[]>([]);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(2);
    const [category, setCategory] = React.useState(0);

    const onCategory = (value: number) => {
        setCategory(value);
    };

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    };

    useEffect(() => {
        axios({
            method: "get", // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/review/recommendation/all?pages=0`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setReviewList(res.data);
        });
    }, []);

    return (
        <div className="recommed_div">
            <div className="recommend_title_div">
                <p id="recommend_title">8월 2주차 커뮤니티 추천 후기글</p>
                <div className="hot_div">
                    <img src="/hot.png" alt="hot" id="hot" />
                </div>
            </div>
            <Category 
                onCategory={onCategory}
            />
            <div className="search_div">
                <Search
                    category={category}
                    page={0}
                    onSearch={(value) => console.log("")}
                    onSearchResult={(value) => console.log("")}
                />
            </div>
            {/*d 후기 리스트 섹션 */}
            <div className="review_list_div">
                {reviewList.map((review, index) => {
                    return (
                        <div className="review_item_div">
                            <ReviewItem
                                key={review.reviewId}
                                commentCount={review.commentCount}
                                createdAt={review.createdAt}
                                doctorName={review.doctorName}
                                hospitalName={review.hospitalName}
                                part={review.part}
                                profile={review.profile}
                                reviewId={review.reviewId}
                                title={review.title}
                                viewCount={review.viewCount}
                                likeCount={review.likeCount}
                                nickname={review.nickname}
                                totalPages={review.totalPages}
                            />
                        </div>
                    );
                })}
                {/* pagenation 섹션 */}
                <Pagination
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={totalPages * 10}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={handlePageChange}
                />
            </div>
            <Footer />
        </div>
    );
}

export default RecommendedReview;
