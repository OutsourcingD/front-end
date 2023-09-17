import React, { useEffect } from "react";
import "./MakeReviewPage.css";
import PartCategory from "./PartCategory";
import axios from "axios";
import { HospitalNameResponseDto } from "../dto/HospitalNameResponseDto";
import { DoctorNameResponseDto } from "../dto/DoctorNameResponseDto";
import HospitalStarRate from "../components/HospitalStarRate";
import DoctorStarRate from "../components/DoctorStarRate";

interface ReviewProps {
  checkBox: boolean;
}

const MakeReviewPage = ({ checkBox }: ReviewProps) => {
  const [isReview, setIsReview] = React.useState<boolean>(false);
  const [hospitalInfo, setHospitalInfo] =
    React.useState<HospitalNameResponseDto[]>();
  const [isHospitalEtc, setIsHospitalEtc] = React.useState<boolean>(false);
  const [isDoctorEtc, setIsDoctorEtc] = React.useState<boolean>(false);
  const [etcHospital, setEtcHospital] = React.useState<string>("");
  const [etcDoctor, setEtcDoctor] = React.useState<string>("");
  const [doctorInfo, setDoctorInfo] = React.useState<DoctorNameResponseDto[]>();

  const handleReview = (review: boolean) => {
    setIsReview(review);
  };

  const selectHospital = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "etc") {
      setIsHospitalEtc(true);
    } else {
      setIsHospitalEtc(false);
    }
  };

  const selectDoctor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "etc") {
      setIsDoctorEtc(true);
    } else {
      setIsDoctorEtc(false);
    }
  };

  const inputEtcHospital = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEtcHospital(e.target.value);
  };

  const inputEtcDoctor = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEtcDoctor(e.target.value);
  };

  useEffect(() => {
    //병원 정보 가져오기
    axios({
      method: "get", // or 'post', 'put', etc.
      url: `${process.env.REACT_APP_SERVER_URL}/hospital/all`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    }).then((res) => {
      setHospitalInfo(res.data);
    });

    //의사 정보 가져오기
    axios({
      method: "get", // or 'post', 'put', etc.
      url: `${process.env.REACT_APP_SERVER_URL}/doctor/all`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    }).then((res) => {
      setDoctorInfo(res.data);
    });
  }, []);

  return (
    <div className="review_page_div">
      {/* header */}
      <div className="make_review_title_div">
        <p id="make_review_title">후기 작성</p>
        <div className="apply_review_button_div">
          <p id="apply_review_text">apply</p>
        </div>
      </div>
      {/* category */}
      <div className="make_review_category_div">
        <p id="make_review_category_text">카테고리</p>
        <div className="check_box">
          <div className="checkbox_container">
            {isReview ? (
              <img
                src="/checkbox.png"
                alt=""
                id="checkbox"
                onClick={() => handleReview(!isReview)}
              />
            ) : (
              <img src="/checkbox_pupple.png" alt="" id="checkbox" />
            )}
          </div>
          <p id="checkbox_label">리뷰</p>
        </div>
        <div className="check_box">
          <div className="before_checkbox_container">
            {!isReview ? (
              <img
                src="/checkbox.png"
                alt=""
                id="checkbox"
                onClick={() => handleReview(!isReview)}
              />
            ) : (
              <img src="/checkbox_pupple.png" alt="" id="checkbox_pupple" />
            )}
          </div>
          <p id="checkbox_label">전후 사진 리뷰</p>
        </div>
      </div>
      <div className="make_review_sub_title">
        <p id="make_review_sub_title_text">제목</p>
        <div className="make_review_category_input">
          <form id="make_review_form">
            <input
              type="text"
              id="make_review_input"
              placeholder="제목을 입력하세요."
            />
          </form>
        </div>
      </div>
      {/* part */}
      <div className="make_review_part_div">
        <p id="make_review_sub_title_text">부위</p>
        <div className="part_category">
          <PartCategory />
        </div>
      </div>
      {/* 병원 */}
      <div className="make_review_hospital_div">
        <div className="make_review_title_header_div">
          <p id="make_review_sub_title_text">병원</p>
          <div className="doctor_dropbox">
            <select
              id="select"
              defaultValue="hospital"
              onChange={selectHospital}
            >
              <option key="hospital" value="hospital">
                hospital
              </option>
              {hospitalInfo?.map((hospital) => {
                return (
                  <option key={hospital.hospitalId} value={hospital.hospitalId}>
                    {hospital.hospitalName}
                  </option>
                );
              })}
              <option key="etc" value="etc">
                etc
              </option>
            </select>
          </div>
          {isHospitalEtc ? (
            <div className="etc_input_div">
              <form id="etc_input_form" onSubmit={(e) => e.preventDefault()}>
                <input
                  value={etcHospital}
                  placeholder="직접 입력"
                  onChange={inputEtcHospital}
                  id="etc_input"
                />
              </form>
            </div>
          ) : null}
          <div className="total_star_div">
            <p id="total_star_title">총별점</p>
          </div>
          <DoctorStarRate/>
        </div>
        <div className="make_review_hospital_body_div">
          <div>
            <p id="start_rate_title">별점을 선택해주세요</p>
            <p id="start_rate_sub_title">원장님과의 수술은 어떠셨나요?</p>
          </div>
          <div>

          </div>
          <div>

          </div>
        </div>
      </div>
      {/* 원장 */}
      <div className="make_review_part_div">
      <div className="make_review_title_header_div">
          <p id="make_review_sub_title_text">원장</p>
          <div className="doctor_dropbox">
            <select
              id="select_doctor"
              defaultValue="doctor"
              onChange={selectDoctor}
            >
              <option key="doctor" value="doctor">
                doctor
              </option>
              {doctorInfo?.map((doctor) => {
                return (
                  <option key={doctor.doctorId} value={doctor.doctorId}>
                    {doctor.doctorName}
                  </option>
                );
              })}
              <option key="etc" value="etc">
                etc
              </option>
            </select>
          </div>
          {isDoctorEtc ? (
            <div className="etc_input_div">
              <form id="etc_input_form" onSubmit={(e) => e.preventDefault()}>
                <input
                  value={etcDoctor}
                  placeholder="직접 입력"
                  onChange={inputEtcDoctor}
                  id="etc_input"
                />
              </form>
            </div>
          ) : null}
          <div className="total_star_div">
            <p id="total_star_title">총별점</p>
          </div>
          <HospitalStarRate />
        </div>
      </div>
      {/* 사진 */}
      <div className="make_review_part_div">
        <p id="make_review_sub_title_text">사진</p>
      </div>
    </div>
  );
};

export default MakeReviewPage;
