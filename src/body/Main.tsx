import React, { useEffect } from "react";
import "./Main.css";
import Category from "../components/Category";
import Review from "../components/Review";
import Search from "../components/Search";
import ReviewItem from "../components/ReviewItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageDto } from "../dto/ImageDto";
import axios from "axios";
import { GoPencil } from "react-icons/go";
import { RecommendedReviewDto } from "../dto/RecommendedReviewDto";
import { ReviewResponseDto } from "../dto/ReviewDto";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import "../Test.css";
import { SearchResponseDto } from "../dto/SearchResultDto";
import { getISOWeek } from "date-fns";
import DocsHosReviewItem from "../review_page/DocsHosReviewItem";
import { DocsHosDto } from "../dto/DocsHosDto";

function Main() {
    const settings = {
        infinite: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };
    const [imageList, setImageList] = React.useState<ImageDto[]>([]);
    const [recommendReviews, setRecommendReviews] = React.useState<
        RecommendedReviewDto[]
    >([]);
    const [reviewList, setReviewList] = React.useState<ReviewResponseDto[]>([]);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [isSearch, setIsSearch] = React.useState(false); // 검색 여부 [true: 검색, false: 검색x]
    const [searchValue, setSearchValue] = React.useState(" ");
    const navigate = useNavigate();
    const [type, setType] = React.useState(0); //0: 날짜 순, 1: 조회수 별, 2: 댓글 수 별
    const [category, setCategory] = React.useState(0); //0: 전체, 1: 지방, 2: 리프팅, 3: 피부, 4: 지방흡입, 5: 유방, 6: 코, 7: 안면, 8: 윤곽, 9: 의사, 10: 병원
    const [week, setWeek] = React.useState(0); //0: 전체, 1: 1주차, 2: 2주차, 3: 3주차, 4: 4주차
    const [month, setMonth] = React.useState(0); //0: 전체, 1: 1월, 2: 2월, 3: 3월, 4: 4월, 5: 5월, 6: 6월, 7: 7월, 8: 8월, 9: 9월, 10: 10월, 11: 11월, 12: 12월
    const [isFilter, setIsFilter] = React.useState(false); // 필터 여부 [true: 필터, false: 필터x
    const [filter, setFilter] = React.useState("filter");
    const [docHosReviewList, setDocHosReviewList] = React.useState<
        DocsHosDto[]
    >([]); // 의사, 병원 후기 리스트

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    };

    const handleSearch = (value: string) => {
        setSearchValue(value);
        setIsSearch(true);
        setPage(1);
    };

    const handleSearchResult = (value: SearchResponseDto[]) => {
        setReviewList(value);
        setTotalPages(value[0] !== undefined ? value[0].totalPages : 1);
    };

    const handleDocHosSearchResult = (value: DocsHosDto[]) => {
        setDocHosReviewList(value);
    };

    const getBanners = async () => {
        //배너 이미지 가져오기
        await axios({
            method: "get", // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/banner?location=1`,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setImageList(res.data);
        }).catch((err) => {
            if(err.response.status === 403 || err.response.status === 401) {
                alert("Please the login.");
                navigate("/login")
            }
            else
            {
                alert("Server Error" + err.response.status);
                navigate("/");
            }
        });
    };

    const getRecommendedReviews = async () => {
        await axios({
            method: "get", // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/review/recommendation`,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setRecommendReviews(res.data);
        }).catch((err) => {
            if(err.response.status === 403 || err.response.status === 401) {
                alert("Please the login.");
                navigate("/login")
            }
            else
            {
                alert("Server Error" + err.response.status);
                navigate("/");
            }
        });
    };

    const getSearchReviewList = async () => {
        if (category < 9) {
            await axios({
                method: "get", // or 'post', 'put', etc.
                url: `${
                    process.env.REACT_APP_SERVER_URL
                }/review/search?type=${type}&query=${searchValue}&category=${category}&pages=${
                    page - 1
                }`,
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                },
            }).then((res) => {
                setReviewList(res.data);

                setTotalPages(res.data[0].totalPages === undefined ? 1 : res.data[0].totalPages);
            }).catch((err) => {
                if(err.response.status === 403 || err.response.status === 401) {
                    alert("Please the login.");
                    navigate("/login")
                }
                else
                {
                    alert("Server Error" + err.response.status);
                    navigate("/");
                }
            });
        } else {
            axios({
                method: "get", // or 'post', 'put', etc.
                url: `${process.env.REACT_APP_SERVER_URL}/review/search/doc-hos?sortType=${type}&type=${category}&query=${searchValue}`,
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                },
            }).then((res) => {
                setDocHosReviewList(res.data);
            }).catch((err) => {
                if(err.response.status === 403 || err.response.status === 401) {
                    alert("Please the login.");
                    navigate("/login")
                }
                else
                {
                    alert("Server Error" + err.response.status);
                    navigate("/");
                }
            });
        }
    };

    const makeReviewButtonClick = () => {
        navigate("/review/make");
    };

    const handleReview = (reviewId: number) => {
        navigate(`/review?reviewId=${reviewId}`);
    };

    const onCategory = (value: number) => {
        setCategory(value);
    };

    const filterHandle = (value: number) => {
        if (value === 0) {
            setType(0);
            setFilter("latest");
        } else if (value === 1) {
            setType(1);
            setFilter("comment");
        } else if (value === 2) {
            setType(2);
            setFilter("view");
        } else {
            alert("필터 에러");
        }
        setIsFilter(false);
    };

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

    useEffect(() => {
        getBanners();
        getRecommendedReviews();
        getSearchReviewList();
    }, [page, type]);

    useEffect(() => {
        setSearchValue(" ");
        setFilter("filter");
        if (category < 9) {
            axios({
                method: "get", // or 'post', 'put', etc.
                url: `${
                    process.env.REACT_APP_SERVER_URL
                }/review/search?type=${0}&query=${" "}&category=${category}&pages=${0
                }`,
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                },
            }).then((res) => {
                setReviewList(res.data);

                setTotalPages(
                    res.data[0] === undefined ? 1 : res.data[0].totalPages
                );
            }).catch((err) => {
                if(err.response.status === 403 || err.response.status === 401) {
                    alert("Please the login.");
                    navigate("/login")
                }
                else
                {
                    alert("Server Error" + err.response.status);
                    navigate("/");
                }
            });
        } else if (9 === category || category === 10) {
            axios({
                method: "get", // or 'post', 'put', etc.
                url: `${process.env.REACT_APP_SERVER_URL}/review/search/doc-hos?sortType=${0}&type=${category}&query=${" "}`,
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                },
            }).then((res) => {
                setDocHosReviewList(res.data);
            }).catch((err) => {
                if(err.response.status === 403 || err.response.status === 401) {
                    alert("Please the login.");
                    navigate("/login")
                }
                else
                {
                    alert("Server Error" + err.response.status);
                    navigate("/");
                }
            });
        } else {
            alert("category error");
        }
    }, [category]);

    return (
        <div className="main">
            {/* 광고 섹션 */}
            <div className="advertisement">
                <Slider {...settings}>
                    {imageList.map((image, index) => {
                        return (
                            <div key={image.bannerId} className="ad_item_div">
                                <a
                                    href={image.bannerLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ outline: "none" }}
                                >
                                    <img
                                        key={image.bannerId}
                                        src={image.bannerImg}
                                        alt={image.hospital_name}
                                        id="advertisement_img"
                                    />
                                </a>
                            </div>
                        );
                    })}
                </Slider>
            </div>
            {/* 카테고리 섹션 */}
            <div className="mainBody">
                <Category onCategory={onCategory} />
            </div>
            {/* 후기 섹션 */}
            <div className="recommend_review">
                <div className="recommend_div">
                    <div className="recommend_text_div">
                        <p id="recommended_title">
                            {month}월 {week}주차 커뮤니티 추천 후기 글
                        </p>
                        <p id="week_text">
                            이번주 가장 조회수가 많은 후기 글 보러가기
                        </p>
                    </div>
                    <div className="hotDiv">
                        <img id="hot" src="hot.png" alt="추천 후기" />
                    </div>
                    <div
                        className="moreDiv"
                        onClick={() => navigate("/recommend/review/all")}
                    >
                        <p id="more_text">더보기</p>
                    </div>
                </div>
            </div>
            {/* 후기 요약 정보 */}
            <div className="review_div">
                <Review
                    reviewTitle={recommendReviews[0]?.title}
                    reviewDescription={
                        recommendReviews[0]?.content.substring(0, 57) + "..."
                    }
                    reviewImage={recommendReviews[0]?.imageVo.url}
                    imageAlt={recommendReviews[0]?.imageVo.description}
                    hospitalName={recommendReviews[0]?.hospitalName}
                    totalRate={recommendReviews[0]?.starRate}
                    part={recommendReviews[0]?.parts}
                    imageUrl={recommendReviews[0]?.imageVo.url}
                    key={recommendReviews[0]?.reviewId}
                    imageId={recommendReviews[0]?.imageVo.imageId}
                    reviewId={recommendReviews[0]?.reviewId}
                    doctorName={recommendReviews[0]?.doctorName}
                />
                <Review
                    reviewTitle={recommendReviews[1]?.title}
                    reviewDescription={
                        recommendReviews[1]?.content.substring(0, 57) + "..."
                    }
                    reviewImage={recommendReviews[1]?.imageVo.url}
                    imageAlt={recommendReviews[1]?.imageVo.description}
                    hospitalName={recommendReviews[1]?.hospitalName}
                    totalRate={recommendReviews[1]?.starRate}
                    part={recommendReviews[1]?.parts}
                    imageUrl={recommendReviews[1]?.imageVo.url}
                    key={recommendReviews[1]?.reviewId}
                    imageId={recommendReviews[1]?.imageVo.imageId}
                    reviewId={recommendReviews[1]?.reviewId}
                    doctorName={recommendReviews[1]?.doctorName}
                />
            </div>
            {/* 검색 섹션 */}
            <div className="search_div">
                <Search
                    parent={0}
                    page={page}
                    onSearch={handleSearch}
                    onSearchResult={handleSearchResult}
                    onDoctorSearchResult={handleDocHosSearchResult}
                    category={category}
                />
                <div
                    className="filter_div"
                    onClick={() => setIsFilter(!isFilter)}
                >
                    <div className="filter_header">
                        <div className="filter_wrapper">
                            <div className="filter_cotainer">
                                <img
                                    src="filter.png"
                                    alt="filter"
                                    id="filter"
                                />
                            </div>
                            <p>{filter}</p>
                        </div>
                        {isFilter ? (
                            <div className="filter_text">
                                <div className="filter_item_div">
                                    <p
                                        id="filter_item1"
                                        onClick={() => filterHandle(0)}
                                    >
                                        latest
                                    </p>
                                    <p
                                        id="filter_item2"
                                        onClick={() => filterHandle(1)}
                                    >
                                        comment
                                    </p>
                                    <p
                                        id="filter_item3"
                                        onClick={() => filterHandle(2)}
                                    >
                                        view
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            {/*d 후기 리스트 섹션 */}
            <div className={category < 9 ? "review_list_div" : "docs_hos_review_list_div"}>
                {category < 9
                    ? reviewList.map((review, index) => {
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
                      })
                    : docHosReviewList.map((review, index) => {
                          return <DocsHosReviewItem key={review.id} {...review} />;
                      })}
            </div>
            {/* pagenation 섹션 */}
            {
                category < 9 ?
                <Pagination
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={totalPages * 10}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={handlePageChange}
                />
                : null
            }
            {/* 후기 만들기 floating button */}
            <div
                className="make_review_button_div"
                onClick={makeReviewButtonClick}
            >
                <GoPencil color="white" id="pencil" />
            </div>
        </div>
    );
}

export default Main;
