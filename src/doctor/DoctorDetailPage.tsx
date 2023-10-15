import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../hospital/HospitalDetailPage.css";
import Slider from "react-slick";
import Pagination from "react-js-pagination";
import Footer from "../bottom/Footer";
import { DoctorDetailDto } from "../dto/DoctorDetailDto";
import { DoctorReviewDto } from "../dto/DoctorReview";
import "./DoctorDetailPage.css";

function DoctorDetailPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [doctorDetail, setDoctorDetail] =
        React.useState<DoctorDetailDto | null>(null);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [doctorReviews, setDoctorReviews] = React.useState<DoctorReviewDto[]>(
        []
    );
    const navigate = useNavigate();

    const handleReview = (reviewId: number) => {
        navigate(`/review?reviewId=${reviewId}`);
    };

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
    };

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    };

    useEffect(() => {
        const doctorId = queryParams.get("doctorId");

        /* doctor detail */
        axios({
            method: "get", // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/doctor/detail?postId=${doctorId}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setDoctorDetail(res.data);
        });

        /* hospital detail */
        axios({
            method: "get", // or 'post', 'put', etc.
            url: `${
                process.env.REACT_APP_SERVER_URL
            }/doctor/review?doctorId=${doctorId}&pages=${page - 1}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setDoctorReviews(res.data);
            setTotalPages(res.data.length !== 0 ? res.data[0].totalPages : 1);
        });
    }, []);

    useEffect(() => {
        console.log(doctorReviews)
    }, [doctorReviews]);

    return (
        <div className="hospital_detail_div">
            <div className="hospital_detail_wrapper">
                <div className="tags_div">
                    {doctorDetail?.partList.map((part) => {
                        return (
                            <div className="tag_div" key={part}>
                                <p id="tag">{part}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="hospital_detail_title_div">
                    <p id="hospital_detail_title">{doctorDetail?.doctorName}</p>
                    <p id="hospital_detail_description">
                        {doctorDetail?.introduction}
                    </p>
                </div>
                <div className="review_detail_image_div">
                    <Slider {...settings}>
                        {doctorDetail?.imageVo.map((image) => {
                            return (
                                <>
                                    <div
                                        className="hopital_detail_image_item_div"
                                        key={image.imageId}
                                    >
                                        <img
                                            src={image.url}
                                            alt=""
                                            id="hopital_detail_img"
                                        />
                                    </div>
                                </>
                            );
                        })}
                    </Slider>
                </div>
                <div className="hospital_detail_content_div">
                    <div
                        id="hospital_detail_content"
                        dangerouslySetInnerHTML={{
                            __html: doctorDetail?.content || "",
                        }}
                    />
                </div>
                <div className="hospital_detail_content_title">
                    <p className="hospital_detail_content_text">원장 정보</p>
                    <hr className="hospital_detail_content_line"/>
                </div>
                <div className="hospital_detail_hospital_info_div">
                    <div className="hospital_info_profile_div">
                        <img
                            src={doctorDetail?.mainImage}
                            alt="da"
                            id="hospital_profile_picture"
                        />
                    </div>
                    <div className="hospital_info_profile_text_div">
                        <p id="hospital_info_name">
                            {doctorDetail?.doctorName}
                        </p>
                        <p id="hospital_info_location">
                            {doctorDetail?.location}
                        </p>
                    </div>
                    <div className="hospital_info_avg_div">
                        <p>{doctorDetail?.avgRate}</p>
                    </div>
                </div>
                <div className="hospital_review_title">
                    <p className="hospital_review_text">연관 후기</p>
                    <hr className="hospital_review_line"/>
                </div>
                <div className="hospital_review_div">
                    {doctorReviews.length === 0 ? (
                        <p>연관 후기 없음....</p>
                    ) : (
                        doctorReviews.map((item) => {
                            return (
                                <div className="hospital_detail_page_review_item" onClick={() => handleReview(item.reviewId)}>
                                    <div className="hospital_detail_page_review_list_left_div">
                                        <div className="hospital_detail_page_review_list_title_div">
                                            <p id="hospital_detail_review_title">
                                                {item.title}
                                            </p>
                                            <p id="hospital_detail_review_date">
                                                {item.createdAt}
                                            </p>
                                        </div>
                                        <div className="hospital_detail_page_review_list_doctor_info_div">
                                            <div className="hospital_detail_page_review_list_doctor_info_left">
                                                <p id="hospital_detail_review_index_title">
                                                    원장님
                                                </p>
                                                <p id="hospital_detail_review_index_data">
                                                    {item.doctorName} 원장님
                                                </p>
                                            </div>
                                            <div className="hospital_detail_page_review_list_doctor_info_right">
                                                <p id="hospital_detail_review_index_title">
                                                    부위
                                                </p>
                                                <p id="hospital_detail_review_index_data">
                                                    {item.partList.map(
                                                        (part, index) => {
                                                            return index ===
                                                                item.partList
                                                                    .length -
                                                                    1
                                                                ? part
                                                                : part + ", ";
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hospital_detail_page_review_list_right_div">
                                        <div className="hospital_detail_review_info">
                                            <img
                                                src="/view.png"
                                                alt=""
                                                id="hospital_detail_view"
                                            />
                                            <p id="hospital_detail_review_info_data">
                                                {item.viewCount}
                                            </p>
                                        </div>
                                        <div className="hospital_detail_review_info">
                                            <img
                                                src="/chat.png"
                                                alt=""
                                                id="hospital_detail_commend"
                                            />
                                            <p id="hospital_detail_review_info_data">
                                                {item.commentCount}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
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
            </div>
            <Footer />
        </div>
    );
}

export default DoctorDetailPage;
