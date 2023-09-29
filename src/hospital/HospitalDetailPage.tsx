import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HospitalDetailDto } from "../dto/HospitalDetailDto";
import "./HospitalDetailPage.css";
import Slider from "react-slick";
import Pagination from "react-js-pagination";
import Footer from "../bottom/Footer";

function HospitalDetailPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [hospitalDetail, setHospitalDetail] =
        React.useState<HospitalDetailDto | null>(null);
    const [hospitalReviewList, setHospitalReview] =
        React.useState<HospitalDetailDto[]>([]);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

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
        const hospitalId = queryParams.get("hospitalId");

        console.log(hospitalId);

        /* hospital detail */
        axios({
            method: "get", // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/hospital/detail?postId=${hospitalId}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setHospitalDetail(res.data);
        });

        // 연관 후기
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/hospital/review?hospitalId=${hospitalId}&pages=${page - 1}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setHospitalReview(res.data);
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
                            src="https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800"
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
                    {hospitalReviewList.length !== 0 ? hospitalReviewList.map((item) => {
                        return (
                            <div className="hospital_detail_page_review_item">
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
                                                {hospitalDetail?.hospitalName} 원장님
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
