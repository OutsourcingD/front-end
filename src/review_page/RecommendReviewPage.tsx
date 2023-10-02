import React, { useEffect } from "react";
import Category from "../components/Category";
import Search from "../components/Search";
import Pagination from "react-js-pagination";
import "./RecommendReviewPage.css";
import { ReviewResponseDto } from "../dto/ReviewDto";
import ReviewItem from "../components/ReviewItem";
import axios from "axios";
import Footer from "../bottom/Footer";
import { getISOWeek } from "date-fns";
import { GoPencil } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { DocsHosDto } from "../dto/DocsHosDto";
import DocsHosReviewItem from "./DocsHosReviewItem";

function RecommendReviewPage() {
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [recommendReviewItems, setRecommendReviewItems] = React.useState<
        ReviewResponseDto[]
    >([]);
    const [isSearch, setIsSearch] = React.useState(false); // 검색 여부 [true: 검색, false: 검색x]
    const [searchValue, setSearchValue] = React.useState("");
    const [category, setCategory] = React.useState(0);
    const [month, setMonth] = React.useState(0);
    const [week, setWeek] = React.useState(0);
    const navigate = useNavigate();
    const [docHosReviewList, setDocHosReviewList] = React.useState<
        DocsHosDto[]
    >([]); // 의사, 병원 후기 리스트

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    };
    
    const onCategory = (value: number) => {
        setCategory(value);
    };

    const handleSearch = (value: string) => {
        setSearchValue(value);
        setIsSearch(true);
        setPage(1);
    };

    const handleSearchResult = (value: ReviewResponseDto[]) => {
        setRecommendReviewItems(value);
        setTotalPages(value[0] !== undefined ? value[0].totalPages : 1);
    };

    const getRecommendReviewList = async () => {
        await axios({
            method: "get", // or 'post', 'put', etc.
            url: `${
                process.env.REACT_APP_SERVER_URL
            }/review/recommendation/search?pages=${page - 1}&query=${searchValue}&part=${category}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setRecommendReviewItems(res.data);
            setTotalPages(res.data[0].totalPages);
        });
    };

    const handleCategory = async () => {
        setSearchValue(" ");
        if(category < 9) {
        await axios({
            method: "get", // or 'post', 'put', etc.
            url: `${
                process.env.REACT_APP_SERVER_URL
            }/review/recommendation/search?pages=${0}&query=${" "}&part=${category}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setRecommendReviewItems(res.data);
            setTotalPages(res.data[0].totalPages);
        });
    } else {
        await axios({
            method: "get", // or 'post', 'put', etc.
            url: `${
                process.env.REACT_APP_SERVER_URL
            }/review/recommendation/doc-hos?type=${category}&query=${" "}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setDocHosReviewList(res.data);
        });
    }
    };

    const makeReviewButtonClick = () => {
        navigate("/review/make");
    };

    const handleReview = (reviewId: number) => {
        navigate(`/review?reviewId=${reviewId}`);
    }

    const onDoctorSearchResult = (value: DocsHosDto[]) => {
        setDocHosReviewList(value);
    }

    useEffect(() => {
        getRecommendReviewList();
    }, [page]);

    useEffect(() => {
        handleCategory();
        setPage(1);
        setSearchValue("");
    }, [category]);

    useEffect(() => {
        const today = new Date();
        const monthNumber = today.getMonth() + 1; // JavaScript에서 월은 0부터 시작하므로, 실제 월을 얻기 위해선 +1을 해야 합니다.

        setMonth(monthNumber);

        // 해당 달의 첫 날과 오늘 날짜 사이에 있는 주 수 계산
        let firstDayOfTheMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );
        let weekOfFirstDay = getISOWeek(firstDayOfTheMonth);
        let currentWeek = getISOWeek(today);

        let weekNumberOfMonth = currentWeek - weekOfFirstDay + 1;

        setWeek(weekNumberOfMonth);

        localStorage.removeItem("selected");
    }, []);

    return (
        <div className="recommend_all_div">
            <div className="recommend_all_page_title_div">
                <p id="recommend_all_page_title">{month}월 {week}주차 커뮤니티 추천 후기글</p>
                <div className="hot_div">
                    <img id="hot_image" src="/hot.png" alt="추천 후기" />
                </div>
            </div>
            <Category onCategory={onCategory} />
            <div className="search_div">
                <Search
                    parent={1}
                    page={page}
                    onSearch={handleSearch}
                    onSearchResult={handleSearchResult}
                    onDoctorSearchResult={onDoctorSearchResult}
                    category={category}
                />
            </div>
            <div className="review_list_div">
                {
                    category < 9 ?
                recommendReviewItems.map((review, index) => {
                    return (
                        <div
                            key={"des" + index}
                            className="review_item_div"
                            onClick={() => handleReview(review.reviewId)}
                        >
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
                }) : docHosReviewList.map((review, index) => {
                    return <DocsHosReviewItem key={review.id} {...review} />;
                })}
            </div>
            <Pagination
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={totalPages * 10}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
            />
            {/* 후기 만들기 floating button */}
            <div
                className="make_review_button_div"
                onClick={makeReviewButtonClick}
            >
                <GoPencil color="white" id="pencil" />
            </div>
            <Footer />
        </div>
    );
}

export default RecommendReviewPage;
