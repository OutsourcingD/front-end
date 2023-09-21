import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./DoctorDetailPage.css";
import Slider from "react-slick";
import Pagination from "react-js-pagination";
import { DoctorDetailDto } from "../dto/DoctorDetailDto";

function DoctorDetailPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [doctorDetail, setDoctorDetail] = React.useState<DoctorDetailDto | null>(null);
  const [hospitalReview, setHospitalReview] = React.useState<DoctorDetailDto | null>(null);
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
  }

  useEffect(() => {
    const hospitalId = queryParams.get("doctorId");

    /* hospital detail */
    axios({
        method: "get", // or 'post', 'put', etc.
        url: `${process.env.REACT_APP_SERVER_URL}/doctor/detail?postId=${hospitalId}`,
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
    }).then((res) => {
        setDoctorDetail(res.data);
    });
  }, []);

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
            <p id="hospital_detail_title">{doctorDetail?.postId}</p>
            <p id="hospital_detail_description">{doctorDetail?.introduction}</p>
        </div>
        <div className="review_detail_image_div">
          <Slider {...settings}>
            {
              doctorDetail?.imageVo.map((image) => {
                return(
                  <>
                    <div className="hopital_detail_image_item_div" key={image.imageId}>
                        <img src={image.url} alt="" id="hopital_detail_img" />
                    </div>
                  </>
                );
              })
            }
          </Slider>
        </div>
        <div className="hospital_detail_content_div">
            <div id="hospital_detail_content" dangerouslySetInnerHTML={{__html: doctorDetail?.content || ""}}/>
        </div>
        <div style={{display: "flex", flexDirection: "row", width: "100%", marginTop: "1%", marginBottom: "3%"}}>
          <p style={{flex: "1"}}>병원 정보</p>
          <hr style={{flex: "10", border: "none", borderTop: "1px solid #D4D4D4"}}/>
        </div>
        <div className="hospital_detail_hospital_info_div">
            <div className="hospital_info_profile_div">
                <img src="/hospital_profile.png" alt="da" id="hospital_profile_picture" />
            </div>
            <div className="hospital_info_profile_text_div">
                <p id="hospital_info_name">아이디 성형외과</p>
                <p id="hospital_info_location">{doctorDetail?.location}</p>
            </div>
            <div className="hospital_info_avg_div">
                <p>0</p>
            </div>
        </div>
        <div style={{display: "flex", flexDirection: "row", width: "100%", marginTop: "1%", marginBottom: "3%"}}>
          <p style={{flex: "1"}}>연관 후기</p>
          <hr style={{flex: "10", border: "none", borderTop: "1px solid #D4D4D4"}}/>
        </div>
        <div className="hospital_review_div">
            <div>

            </div>
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
    </div>
  );
}

export default DoctorDetailPage;
