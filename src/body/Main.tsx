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
  const [recommendReviews, setRecommendReviews] = React.useState<RecommendedReviewDto[]>([]);

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

  useEffect(() => {
    getBanners();
    getRecommendedReviews();
  },[]);

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
          reviewTitle={recommendReviews[0]?.title}
          reviewDescription={recommendReviews[0]?.content}
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
          reviewDescription={recommendReviews[1]?.content}
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
        <Search />
        <div className="filter_div">
          <img src="filter.png" alt="filter" id="filter" />
        </div>
      </div>
      {/*d 후기 리스트 섹션 */}
      <div className="review_list_div">
        {reviewList.map((review, index) => {
          return (
            <div key={"des" + index} className="review_item_div">
              <ReviewItem />
            </div>
          );
        })}
      </div>
      {/* 후기 만들기 floating button */}
      <div className="make_review_button_div">
        <GoPencil color="white" id="pencil" />
      </div>
    </div>
  );
}

export default Main;
