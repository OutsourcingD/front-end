import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../hospital/HospitalDetailPage.css";
import Slider from "react-slick";
import Pagination from "react-js-pagination";
import Footer from "../bottom/Footer";
import { DoctorDetailDto } from "../dto/DoctorDetailDto";

function DoctorDetailPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [doctorDetail, setDoctorDetail] =
        React.useState<DoctorDetailDto | null>(null);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const items = [1, 2, 3, 4, 5, 6, 7, 8];

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

        /* hospital detail */
        axios({
            method: "get", // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/doctor/detail?postId=${doctorId}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setDoctorDetail(res.data);
        });
    }, []);

    useEffect(() => {
      doctorDetail === null
            ? console.log("hello")
            : console.log("병원 후기 없음");
    }, [doctorDetail]);

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
                    <p id="hospital_detail_description">소개글</p>
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
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        marginTop: "1%",
                        marginBottom: "3%",
                    }}
                >
                    <p style={{ flex: "1" }}>병원 정보</p>
                    <hr
                        style={{
                            flex: "10",
                            border: "none",
                            borderTop: "1px solid #D4D4D4",
                        }}
                    />
                </div>
                <div className="hospital_detail_hospital_info_div">
                    <div className="hospital_info_profile_div">
                        <img
                            src="/hospital_profile.png"
                            alt="da"
                            id="hospital_profile_picture"
                        />
                    </div>
                    <div className="hospital_info_profile_text_div">
                        <p id="hospital_info_name">아이디 성형외과</p>
                        <p id="hospital_info_location">
                            서울시 역삼동 OO동 00-00
                        </p>
                    </div>
                    <div className="hospital_info_avg_div">
                        <p>0</p>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        marginTop: "8.7px",
                        marginBottom: "10px",
                    }}
                >
                    <p style={{width: "79px" }}>연관 후기</p>
                    <hr
                        style={{
                            width: "785px",
                            border: "none",
                            borderTop: "1px solid #D4D4D4",
                        }}
                    />
                </div>
                <div className="hospital_review_div">
                    {items.map((item) => {
                        return (
                            <div className="hospital_detail_page_review_item">
                                <div className="hospital_detail_page_review_list_left_div">
                                    <div className="hospital_detail_page_review_list_title_div">
                                        <p id="hospital_detail_review_title">
                                            아름다운 성형외과에서 윤곽수술 받은
                                            3개월차 후기
                                        </p>
                                        <p id="hospital_detail_review_date">
                                            2023.08.23
                                        </p>
                                    </div>
                                    <div className="hospital_detail_page_review_list_doctor_info_div">
                                        <div className="hospital_detail_page_review_list_doctor_info_left">
                                            <p id="hospital_detail_review_index_title">
                                                원장님
                                            </p>
                                            <p id="hospital_detail_review_index_data">
                                                김철수 원장님
                                            </p>
                                        </div>
                                        <div className="hospital_detail_page_review_list_doctor_info_right">
                                            <p id="hospital_detail_review_index_title">
                                                부위
                                            </p>
                                            <p id="hospital_detail_review_index_data">
                                                윤곽 수술
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
                                            2,302
                                        </p>
                                    </div>
                                    <div className="hospital_detail_review_info">
                                        <img
                                            src="/chat.png"
                                            alt=""
                                            id="hospital_detail_commend"
                                        />
                                        <p id="hospital_detail_review_info_data">
                                            138
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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
