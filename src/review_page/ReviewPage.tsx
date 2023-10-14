import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ReviewPage.css";
import axios from "axios";
import { ReviewDetailDto } from "../dto/ReviewDetailDto";
import Slider from "react-slick";
import Footer from "../bottom/Footer";

function ReviewPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [reviewDetail, setReviewDetail] =
    React.useState<ReviewDetailDto | null>(null); // 검색 여부 [true: 검색, false: 검색x
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    afterChange: (current: React.SetStateAction<number>) => setCurrentSlide(current)
  };
  const navigate = useNavigate();

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
            <p id="post_edit_button">edit</p>
            <p id="post_delete_button">delete</p>
          </div>
        </div>
        <div className="review_page_hr_div">
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
          <p id="first_review_title">1st review</p>
          <p id="review_created_at">{reviewDetail?.createdAt}</p>
        </div>
        <div className="review_first_detail_div">
          <div dangerouslySetInnerHTML={{__html: reviewDetail?.content || '' }}/>
        </div>
        <div className="review_info">
          <p>tag</p>
        </div>
        <div className="review_page_review_info_div">
          <p id="review_page_review_info_text">review info</p>
          <hr id="review_page_review_hr" />
        </div>
        <div className="review_comment">

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReviewPage;
