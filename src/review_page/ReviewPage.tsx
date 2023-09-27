import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ReviewPage.css";
import axios from "axios";
import { ReviewDetailDto } from "../dto/ReviewDetailDto";
import Slider from "react-slick";

function ReviewPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [reviewDetail, setReviewDetail] =
    React.useState<ReviewDetailDto | null>(null); // 검색 여부 [true: 검색, false: 검색x
  const [isLoading, setIsLoading] = React.useState();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    afterChange: (current: React.SetStateAction<number>) => setCurrentSlide(current)
  };

  useEffect(() => {
    const reviewId = queryParams.get("reviewId");

    if (reviewDetail === null) {
      axios({
        method: "get", // or 'post', 'put', etc.
        url: `${process.env.REACT_APP_SERVER_URL}/review/detail?reviewId=${reviewId}`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
      }).then((res) => {
        setReviewDetail(res.data);
      });
    }
  }, []);

  return (
    <div className="review_detail_div">
      <div className="review_detail_wrapper">
        <div className="tags_div">
          {reviewDetail?.partList.map((part) => {
            return (
              <div className="tag_div" key={part}>
                <p id="tag">{part}</p>
              </div>
            );
          })}
        </div>
        <div className="review_detail_title_div">
          <p id="review_detail_title">{reviewDetail?.title}</p>
        </div>
        <div className="profile_edit_div">
          <div className="profile_left_div">
            <div className="profile_info_div">
                <img src={reviewDetail?.profileImgUrl} alt={reviewDetail?.nickname} id="profile_picture" />
            </div>
            <div className="profile_info_text_div">
                <p id="nickname">{reviewDetail?.nickname}</p>
                <p id="date">{reviewDetail?.createdAt}</p>
            </div>
          </div>
          <div className="profile_right_div">
            <p id="post_edit_button">수정</p>
            <p id="post_delete_button">삭제</p>
          </div>
        </div>
        <div style={{width: "696.29px", marginTop: "8px", marginBottom: "14px"}}>
            <hr style={{width: "100%"}}/>
        </div>
        <div className="review_detail_image_div">
          <Slider {...settings}>
            {
              reviewDetail?.imageList.map((image) => {
                return(
                  <>
                    <div className="review_detail_image_item_div" key={image.imageId}>
                        <img src={image.url} alt="" id="review_detail_img" />
                    </div>
                    <div className="review_detail_image_item_description_div">
                      <p id="review_detail_image_number">{image.description}</p>
                    </div>
                  </>
                );
              })
            }
          </Slider>
        </div>
        <div className="review_first_detail">
          <p id="first_review_title">1차 후기</p>
          <p id="review_created_at">{reviewDetail?.createdAt}</p>
        </div>
        <div className="review_first_detail_div">
          <div dangerouslySetInnerHTML={{__html: reviewDetail?.content || '' }}/>
        </div>
        <div className="review_info">
          <p>tag</p>
        </div>
        <div style={{display: "flex", flexDirection: "row", width: "696.29px", marginTop: "10px", marginBottom: "30px"}}>
          <p style={{flex: "1", whiteSpace: "nowrap"}}>리뷰 정보</p>
          <hr style={{flex: "10", border: "none", borderTop: "1px solid #D4D4D4"}}/>
        </div>
        <div className="review_comment">

        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
