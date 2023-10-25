import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HospitalDetailDto } from "../dto/HospitalDetailDto";
import "./HospitalDetailPage.css";
import Slider from "react-slick";
import Pagination from "react-js-pagination";
import Footer from "../bottom/Footer";
import { HospitalReviewDto } from "../dto/HospitalReviewDto";
import { useNavigate } from "react-router-dom";
import "../doctor/DoctorDetailPage.css";

function HospitalDetailPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [hospitalDetail, setHospitalDetail] =
        React.useState<HospitalDetailDto | null>(null);
    const [hospitalReviewList, setHospitalReview] =
        React.useState<HospitalReviewDto[]>([]);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const navigate = useNavigate();

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

    const handleReview = (reviewId: number) => {
        navigate(`/review?reviewId=${reviewId}`);
    };

    useEffect(() => {
        const hospitalId = queryParams.get("hospitalId");

        console.log(hospitalId);

        /* hospital detail */
        axios({
            method: "get", // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/api/hospital/detail?postId=${hospitalId}`,
        }).then((res) => {
            setHospitalDetail(res.data);
        }).catch((err) => {
            alert(`Contact to developer. ${err.response.status}`);
                navigate("/");        
        });

        // 연관 후기
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/hospital/review?hospitalId=${hospitalId}&pages=${page - 1}`,
        }).then((res) => {
            setHospitalReview(res.data);
        }).catch((err) => {
            alert(`Contact to developer. ${err.response.status}`);
                navigate("/");          
        });
    }, []);

    return (
        <div className="hospital_detail_div">
            <div className="hospital_detail_wrapper">
                <div className="tags_div">
                    {hospitalDetail?.partList.map((part) => {
                        return (
                            <div className="tag_div" key={part}>
                                <p id="tag">{part}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="hospital_detail_title_div">
                    <p id="hospital_detail_title">{hospitalDetail?.title}</p>
                    <p id="hospital_detail_description">{hospitalDetail?.introduction}</p>
                </div>
                <div className="review_detail_image_div">
                    <Slider {...settings}>
                        {hospitalDetail?.imageList.map((image) => {
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
                            __html: hospitalDetail?.content || "",
                        }}
                    />
                </div>
                <div className="hospital_detail_content_title">
                    <p className="hospital_detail_content_text">병원 정보</p>
                    <hr className="hospital_detail_content_line"/>
                </div>
                <div className="hospital_detail_hospital_info_div">
                    <div className="hospital_info_profile_div">
                        <img
                            src={hospitalDetail?.mainImage}
                            alt={hospitalDetail?.hospitalName}
                            id="hospital_profile_picture"
                        />
                    </div>
                    <div className="hospital_info_profile_text_div">
                        <p id="hospital_info_name">{hospitalDetail?.hospitalName}</p>
                        <p id="hospital_info_location">
                            {hospitalDetail?.location}
                        </p>
                    </div>
                    <div className="hospital_info_avg_div">
                        <p>{hospitalDetail?.avgRage}</p>
                    </div>
                </div>
                <div className="hospital_review_title">
                    <p className="hospital_review_text">연관 후기</p>
                    <hr className="hospital_review_line"/>
                </div>
                <div className="hospital_review_div">
                    {hospitalReviewList.length !== 0 ? hospitalReviewList.map((item) => {
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
                                                {
                                                    item.partList.map(
                                                        (part, index) => {
                                                            return (
                                                                index === item.partList.length - 1 ? part : part + ", "
                                                            );
                                                        }
                                                    )
                                                }
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
                    }) : <p>연관 후기 없음....</p>}
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

export default HospitalDetailPage;
