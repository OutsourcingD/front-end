import React from "react";
import "./MyPage.css";
import MyReviewItem from "./MyReviewItem";
import MyCommentItem from "./MyCommentItem";
import MyInqueryItem from "./MyInqueryItem";
import Footer from "../bottom/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BannerDto } from "../dto/BannerDto";
import Slider from "react-slick";
import { MyReviewDto } from "../dto/MyReviewDto";
import { MyCommentDto } from "../dto/MyCommentDto";
import { MyInqueryDto } from "../dto/MyInqueryDto";

function MyPage() {
    const [banners, setBanners] = React.useState<BannerDto[]>([]);
    const [myReviewItems, setMyReviewItems] = React.useState<MyReviewDto[]>([]);
    const [myCommentItems, setMyCommentItems] = React.useState<MyCommentDto[]>([]);
    const [myInqueryItems, setMyInqueryItems] = React.useState<MyInqueryDto[]>([]);
    const navigate = useNavigate();
    const settings = {
        infinite: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    React.useEffect(() => {
        //banner api
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/banner?location=3`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setBanners(res.data);
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/");
            }          
        });

        //my review api
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/review/my?pages=0`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setMyReviewItems(res.data);
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/");
            }          
        });

        //my comment api
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/comment/my`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
          setMyCommentItems(res.data);
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/");
            }          
        });
        
        //my inquery api
        axios({
          method: "get",
          url: `${process.env.REACT_APP_SERVER_URL}/inquiry`,
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          },
        }).then((res) => {
          setMyInqueryItems(res.data);
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/");
            }          
        });
    }, []);


    return (
        <div className="mypage_div">
            {/* mypage 상단 */}
            <div className="mypage_title_div">
                <div className="mypage_title_left_div">
                    <div className="mypage_name_div">
                        <p id="mypage_name">김철수</p>
                    </div>
                    <div className="modify_mypage_button_div">
                        <p id="mypage_sir">님</p>
                        <img
                            src="/setting1.png"
                            alt="setting"
                            id="mypage_setting_button"
                            onClick={() => navigate(`/mypage/info?id=${localStorage.getItem("user_id")}`)}
                        />
                    </div>
                </div>
                <div className="mypage_title_right_div">
                    <div
                        className="write_review_button"
                        onClick={() => navigate(`/review/make?id=${localStorage.getItem("user_id")}`)}
                    >
                        <img
                            src="/write_review.png"
                            alt="write_review"
                            id="write_review"
                        />
                    </div>
                </div>
            </div>
            {/* 마이페이지 본문 */}
            <div className="mypage_body">
                <div className="mypage_review_div">
                    <div className="mypage_review_header_div">
                        <p id="my_page_sub_title">나의 후기</p>
                        <p
                            id="my_page_more"
                            onClick={() => navigate(`/mypage/review/more?id=${localStorage.getItem("user_id")}`)}
                        >
                            더보기
                        </p>
                    </div>
                    <div className="my_review_items_div">
                        {myReviewItems.map((item, index) => {
                            return index < 4 ? (
                                <div key={index}>
                                    <MyReviewItem
                                        reviewId={item.reviewId}
                                        title={item.title}
                                        date={item.createdAt}
                                    />
                                </div>
                            ) : null;
                        })}
                    </div>
                </div>
                {/* 나의 댓글 */}
                <div className="mypage_comment_div">
                    {/* 나의 댓글 헤더 부분 */}
                    <div className="mypage_review_header_div">
                        <p id="my_page_sub_title">나의 댓글</p>
                        <p
                            id="my_page_more"
                            onClick={() => navigate(`/mypage/comment/more?id=${localStorage.getItem("user_id")}`)}
                        >
                            더보기
                        </p>
                    </div>
                    <div className="my_review_items_div">
                        {myCommentItems.map((item, index) => (
                          index < 4 ?
                          <div key={index}>
                            <MyCommentItem title={item.content} reviewId={item.reviewId}/>
                          </div>
                          :null
                        ))}
                    </div>
                </div>
                {/* 나의 문의 */}
                <div className="mypage_inquery_div">
                    {/* 나의 문의 내역 헤더 부분 */}
                    <div className="mypage_review_header_div">
                        <p id="my_page_sub_title">나의 문의 내역</p>
                        <p
                            id="my_page_more"
                            onClick={() => navigate(`/mypage/inquery/more?id=${localStorage.getItem("user_id")}`)}
                        >
                            더보기
                        </p>
                    </div>
                    <div className="my_review_items_div">
                        {myInqueryItems.map((item, index) => {
                            return (
                              index < 4 ?
                                <div key={index}>
                                    <MyInqueryItem {...item} />
                                </div>
                                : null
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* promotion */}
            <div className="mypage_bottom">
                <div className="mypage_inquery_div">
                    <p id="my_page_sub_title">Special Promotion</p>
                </div>
                <div className="promotion_div">
                    <Slider {...settings}>
                        {banners.map((banner) => {
                            return (
                                <div
                                    key={banner.bannerId}
                                    className="ad_item_div"
                                >
                                    <a
                                        href={banner.bannerLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ outline: "none" }}
                                    >
                                        <img
                                            key={banner.bannerId}
                                            src={banner.bannerImg}
                                            alt={banner.hospital_name}
                                            id="mypage_advertisement_img"
                                        />
                                    </a>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MyPage;
