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
import { RecommendReviewDto } from "../dto/ReviewDto";

function Main() {
  const reviewList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const settings = {
    infinite: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
  };
  const [imageList, setImageList] = React.useState<ImageDto[]>([]);
  const [reviews, setReviews] = React.useState<RecommendReviewDto[]>([]);

  const getBanners = async () => {
    //배너 이미지 가져오기
    const storedImages = localStorage.getItem("image_dto");
    
    if (storedImages === null) {
      await axios({
        method: 'get', // or 'post', 'put', etc.
        url: `${process.env.REACT_APP_SERVER_URL}/banner?location=1`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
        }
      }).then((res) => {
        localStorage.setItem("image_dto", JSON.stringify(res.data));
        setImageList(res.data);
      });
    } else {
      setImageList(JSON.parse(storedImages));
    }
  };

  const getReviews = async () => {
    //배너 이미지 가져오기
    const storedReviews = localStorage.getItem("review_dto");
    
    if (storedReviews === null) {
      await axios({
        method: 'get', // or 'post', 'put', etc.
        url: `${process.env.REACT_APP_SERVER_URL}/review?pages=0`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
        }
      }).then((res) => {
        localStorage.setItem("review_dto", JSON.stringify(res.data));
        setReviews(res.data);
      });
    } else {
      setReviews(JSON.parse(storedReviews));
    }
  };

  useEffect(() => {
    getBanners();
    getReviews();
  },[]);

  useEffect(() => {
    console.log(imageList);
    console.log(reviews);
  }, [imageList, reviews]);

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
          <div className="moreDiv">
            <p id="more_text">더보기</p>
          </div>
        </div>
      </div>
      {/* 후기 요약 정보 */}
      <div className="review_div">
        <Review
          reviewTitle="후기 제목"
          reviewDescription="후기 내용"
          reviewImage="후기 이미지"
          hospitalName="병원 이름"
          totalRate={4.5}
          part={["가슴", "코"]}
        />
        <Review
          reviewTitle="후기 제목"
          reviewDescription="후기 내용"
          reviewImage="후기 이미지"
          hospitalName="병원 이름"
          totalRate={4.5}
          part={["가슴", "코"]}
        />
      </div>
      {/* 검색 섹션 */}
      <div className="search_div">
        <Search />
        <div className="filter_div">
          <img src="filter.png" alt="filter" id="filter" />
        </div>
      </div>
      {/*d 후기 리스트 섹션 */}
      <div className="review_list_div">
        {reviewList.map((review, index) => {
          return (
            <div className="review_item_div">
              <ReviewItem key={review + index} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
