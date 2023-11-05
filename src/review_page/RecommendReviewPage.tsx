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
    const [month, setMonth] = React.useState("");
    const [week, setWeek] = React.useState("");
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
            url: `/api/review/recommendation/search?pages=${page - 1}&query=${searchValue}&part=${category}`,
        }).then((res) => {
            setRecommendReviewItems(res.data);
            setTotalPages(res.data[0].totalPages);
        }).catch((err) => {
            console.log("get recommend review list", err);
        });
    };

    const handleCategory = async () => {
        setSearchValue(" ");
        if(category < 9) {
        await axios({
            method: "get", // or 'post', 'put', etc.
            url: `/api/review/recommendation/search?pages=${0}&query=${" "}&part=${category}`,
        }).then((res) => {
            setRecommendReviewItems(res.data);
            setTotalPages(res.data.length === 0 ? 1 : res.data[0].totalPages);
        }).catch((err) => {
            console.log("handle category", err)
        });
    } else {
        await axios({
            method: "get", // or 'post', 'put', etc.
            url: `/api/review/recommendation/doc-hos?type=${category}&query=${" "}`,
        }).then((res) => {
            setDocHosReviewList(res.data);
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                ;
            }          
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

        if(monthNumber === 1)
            setMonth("Jan.");
        else if(monthNumber === 2)
            setMonth("Feb.");
        else if(monthNumber === 3)
            setMonth("Mar.");
        else if(monthNumber === 4)
            setMonth("Apr.");
        else if(monthNumber === 5)
            setMonth("May");
        else if(monthNumber === 6)
            setMonth("Jun.");
        else if(monthNumber === 7)
            setMonth("Jul.");
        else if(monthNumber === 8)
            setMonth("Aug.");
        else if(monthNumber === 9)
            setMonth("Sep.");
        else if(monthNumber === 10)
            setMonth("Oct.");
        else if(monthNumber === 11)
            setMonth("Nov.");
        else if(monthNumber === 12)
            setMonth("Dec.");
        else
            setMonth("Month Error");

        // 해당 달의 첫 날과 오늘 날짜 사이에 있는 주 수 계산
        let firstDayOfTheMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );
        let weekOfFirstDay = getISOWeek(firstDayOfTheMonth);
        let currentWeek = getISOWeek(today);

        let weekNumberOfMonth = currentWeek - weekOfFirstDay + 1;

        if(weekNumberOfMonth === 1) 
            setWeek(weekNumberOfMonth + "st");
        else if(weekNumberOfMonth === 2)
            setWeek(weekNumberOfMonth + "nd");
        else if(weekNumberOfMonth === 3)
            setWeek(weekNumberOfMonth + "rd");
        else
            setWeek(weekNumberOfMonth + "th");
            

    }, []);

    return (
        <div className="recommend_all_div">
            <div>
                <div className="recommend_all_page_title_div">
                    <p id="recommend_all_page_title">Best {month} {week} week review</p>
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
                        return <DocsHosReviewItem key={review.id} dto={review} type={category === 9 ? 0 : 1} />;
                    })}
                </div>
            </div>
            <div className="recommend_page_footer_div">
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
        </div>
    );
}

export default RecommendReviewPage;
