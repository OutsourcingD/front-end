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
import { ReviewDetailDto } from "../dto/ReviewDetailDto";

function Main() {
  const settings = {
    infinite: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
  };
  const [imageList, setImageList] = React.useState<ImageDto[]>([]);
  const [recommendReviews, setRecommendReviews] = React.useState<RecommendedReviewDto[]>([]);
  const [reviewList, setReviewList] = React.useState<ReviewResponseDto[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [isSearch, setIsSearch] = React.useState(false); // 검색 여부 [true: 검색, false: 검색x]
  const [searchValue, setSearchValue] = React.useState("");
  const navigate = useNavigate();
  const [reviewDetail, setReviewDetail] = React.useState<ReviewDetailDto[]>([]); // 검색 여부 [true: 검색, false: 검색x

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setIsSearch(true);
    setPage(1);
  };

  const handleSearchResult = (value: ReviewResponseDto[]) => {
    setReviewList(value);
    setTotalPages(value[0].totalPages);
  };

  const getBanners = async () => {
    //배너 이미지 가져오기    
    await axios({
      method: 'get', // or 'post', 'put', etc.
      url: `${process.env.REACT_APP_SERVER_URL}/banner?location=1`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      }
    }).then((res) => {
      setImageList(res.data);
    });
  };

  const getRecommendedReviews = async () => {
    await axios({
      method: 'get', // or 'post', 'put', etc.
      url: `${process.env.REACT_APP_SERVER_URL}/review/recommendation`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      }
    }).then((res) => {
      setRecommendReviews(res.data);
    });
  };

  const getReviewList = async () => {
    await axios({
      method: 'get', // or 'post', 'put', etc.
      url: `${process.env.REACT_APP_SERVER_URL}/review?pages=${page - 1}`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      }
    }).then((res) => {
      setReviewList(res.data);

      setTotalPages(res.data[0].totalPages);
    });
  };

  const getSearchReviewList = async () => {
    await axios({
      method: 'get', // or 'post', 'put', etc.
      url: `${process.env.REACT_APP_SERVER_URL}/review/search?query=${searchValue}&pages=${page - 1}`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      }
    }).then((res) => {
      setReviewList(res.data);

      setTotalPages(res.data[0].totalPages);
    });
  };

  const makeReviewButtonClick = () => {
    navigate("/review/make")
  };

  const handleReview = (id: number) => {
    console.log("id: ", id);
    axios({
      method: 'get', // or 'post', 'put', etc.
      url: `${process.env.REACT_APP_SERVER_URL}/review/detail?reviewId=${id}`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
      }
    }).then((res) => {
      setReviewDetail(res.data);
    });
  };

  const handleRecommendReview = () => {
    /* 추천 후기 페이지로 이동 후 useEffect에서 axios 요청 */
  };

  useEffect(() => {
    getBanners();
    getRecommendedReviews();
    !isSearch ? getReviewList() : getSearchReviewList();
  },[page]);

  return (
    <div className="main">
      {/* 광고 섹션 */}
      <div className="advertisement">
        <Slider {...settings}>
          {
            imageList.map((image, index) => {
              return (
                <img key={image.bannerId} src={image.bannerImg} alt={image.hospital_name} id="advertisement_img" />
              );
            })
          }
        </Slider>
      </div>
      {/* 카테고리 섹션 */}
      <div className="mainBody">
        <Category />
      </div>
      {/* 후기 섹션 */}
      <div className="recommend_review">
        <div className="recommend_div">
          <div className="recommend_text_div">
            <p id="recommended_title">8월 2주차 커뮤니티 추천 후기 글</p>
            <p id="week_text">이번주 가장 조회수가 많은 후기 글 보러가기</p>
          </div>
          <div className="hotDiv">
            <img id="hot" src="hot.png" alt="추천 후기" />
          </div>
          <div className="moreDiv" onClick={() => navigate("/recommend/review/all")}>
            <p id="more_text">더보기</p>
          </div>
        </div>
      </div>
      {/* 후기 요약 정보 */}
      <div className="review_div">
        <Review
          reviewTitle={recommendReviews[0]?.title}
          reviewDescription={recommendReviews[0]?.content.substring(0, 57) + "..."}
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
          reviewDescription={recommendReviews[1]?.content.substring(0, 57) + "..."}
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
        <Search page={page} onSearch={handleSearch} onSearchResult={handleSearchResult}/>
        <div className="filter_div">
          <img src="filter.png" alt="filter" id="filter" />
        </div>
      </div>
      {/*d 후기 리스트 섹션 */}
      <div className="review_list_div">
        {reviewList.map((review, index) => {
          return (
            <div key={"des" + index} className="review_item_div" onClick={() => handleReview(review.reviewId)}>
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
      </div>
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
      {/* 후기 만들기 floating button */}
      <div className="make_review_button_div" onClick={makeReviewButtonClick}>
        <GoPencil color="white" id="pencil" />
      </div>
    </div>
  );
}

export default Main;
