import React, { useEffect } from "react";
import "./MakeReviewPage.css";
import PartCategory from "./PartCategory";
import axios from "axios";
import { HospitalNameResponseDto } from "../dto/HospitalNameResponseDto";
import { DoctorNameResponseDto } from "../dto/DoctorNameResponseDto";
import HospitalStarRate from "../components/HospitalStarRate";
import DoctorStarRate from "../components/DoctorStarRate";
import Wysiwyg from "../components/ContentInput";

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
  const [pictureNum, setPictureNum] = React.useState<number[]>([0]);

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
        </div>
        <div className="make_review_hospital_body_div">
          <div>
            <p id="start_rate_title">별점을 선택해주세요</p>
            <p id="start_rate_sub_title">원장님과의 수술은 어떠셨나요?</p>
          </div>
          <div className="start_rate_div">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ marginRight: "3%", whiteSpace: "nowrap" }}>
                상담 퀄리티
              </p>
              <div className="star_rate_wrapper">
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ marginRight: "3%", whiteSpace: "nowrap" }}>
                수술 후 케어
              </p>
              <div className="star_rate_wrapper">
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
              </div>
            </div>
          </div>
          <div className="start_rate_div">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ marginRight: "3%", whiteSpace: "nowrap" }}>
                결과 만족도
              </p>
              <div className="star_rate_wrapper">
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ marginRight: "3%", whiteSpace: "nowrap" }}>
                원장 매너
              </p>
              <div className="star_rate_wrapper">
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
              </div>
            </div>
          </div>
          <div className="start_rate_div">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ marginRight: "3%", whiteSpace: "nowrap" }}>
                영어 소통
              </p>
              <div className="star_rate_wrapper">
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      {/* 원장 */}
      <div className="make_review_hospital_div">
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
        </div>
        <div className="make_review_hospital_body_div">
          <div>
            <p id="start_rate_title">별점을 선택해주세요</p>
            <p id="start_rate_sub_title">원장님과의 수술은 어떠셨나요?</p>
          </div>
          <div className="start_rate_div">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p
                style={{
                  marginRight: "3%",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                상담 퀄리티
              </p>
              <div className="star_rate_wrapper">
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p
                style={{
                  marginRight: "3%",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                수술 후 케어
              </p>
              <div className="star_rate_wrapper">
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
              </div>
            </div>
          </div>
          <div className="start_rate_div">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p
                style={{
                  marginRight: "3%",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                결과 만족도
              </p>
              <div className="star_rate_wrapper">
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p
                style={{
                  marginRight: "3%",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                원장 매너
              </p>
              <div className="star_rate_wrapper">
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
              </div>
            </div>
          </div>
          <div className="start_rate_div">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p
                style={{
                  marginRight: "3%",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                영어 소통
              </p>
              <div className="star_rate_wrapper">
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
                <img src="/star_empty.png" alt="" id="star_rate" />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      {/* 사진 */}
      <div className="make_review_picture_div">
        <p id="make_review_sub_title_text">사진추가</p>
        <p id="make_review_add_picture_warning">
          사진은 최대 10장까지 가능해요
        </p>
      </div>
      <div className="make_review_pictures_div">
        {
          <div className="make_review_add_picture_wrapper">
            <div className="make_review_add_picture_div">
              <div className="add_picture_wrapper">
                <img src="/add_picture.png" alt="" id="make_review_picture" />
              </div>
              <p id="add_picture">add picture</p>
            </div>
            <div className="make_review_picture_input_div">
              <select id="period_select">
                <option key="period" value="period">
                  select period
                </option>
                <option key="week" value="week">
                  week
                </option>
                <option key="month" value="month">
                  month
                </option>
                <option key="year" value="year">
                  year
                </option>
                <option key="before-after" value="before-after">
                  before-after
                </option>
              </select>
              <form className="period_input_form">
                <input
                  type="text"
                  id="period_input"
                  placeholder="Direct input."
                />
              </form>
              <p style={{ display: "flex", alignItems: "center" }}>주</p>
            </div>
          </div>
        }
        <div className="add_picture_button">
          <div className="add_picture_plus_div">
            <img src="/add_picture_plus.png" alt="" id="add_picture_plus" />
          </div>
        </div>
      </div>
      <div className="wysiwyg_div">
        <Wysiwyg />
      </div>
    </div>
  );
};

export default MakeReviewPage;
