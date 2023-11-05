import React, { useEffect } from "react";
import Wysiwyg from "../components/ContentInput";
import PartCategory from "./PartCategory";
import { DoctorNameResponseDto } from "../dto/DoctorNameResponseDto";
import axios from "axios";
import { HospitalNameResponseDto } from "../dto/HospitalNameResponseDto";
import "./MakeReviewPage.css";
import { useNavigate } from "react-router-dom";

function MakeReviewItem() {
    const [isHospitalEtc, setIsHospitalEtc] = React.useState<boolean>(false);
    const [isDoctorEtc, setIsDoctorEtc] = React.useState<boolean>(false);
    const [etcHospital, setEtcHospital] = React.useState<string>("");
    const [etcDoctor, setEtcDoctor] = React.useState<string>("");
    const [doctorInfo, setDoctorInfo] =
        React.useState<DoctorNameResponseDto[]>();
    const [hospitalInfo, setHospitalInfo] =
        React.useState<HospitalNameResponseDto[]>();
    const navigate = useNavigate();

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
            url: `/api/hospital/all`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setHospitalInfo(res.data);
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

        //의사 정보 가져오기
        axios({
            method: "get", // or 'post', 'put', etc.
            url: `/api/doctor/all`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setDoctorInfo(res.data);
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
        <>
            <div className="make_review_sub_title">
                <p id="make_review_sub_title_text">Title</p>
                <div className="make_review_category_input">
                    <form id="make_review_form">
                        <input
                            type="text"
                            id="make_review_input"
                            placeholder="Enter a title."
                        />
                    </form>
                </div>
            </div>
            {/* part */}
            <div className="make_review_part_div">
                <p id="make_review_sub_title_text">Parts</p>
                <div className="part_category">
                    <PartCategory />
                </div>
            </div>
            {/* 병원 */}
            <div className="make_review_hospital_div">
                <div className="make_review_title_header_div">
                    <p id="make_review_sub_title_text">Hospital</p>
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
                                    <option
                                        key={hospital.hospitalId}
                                        value={hospital.hospitalId}
                                    >
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
                            <form
                                id="etc_input_form"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <input
                                    value={etcHospital}
                                    placeholder="Direct input"
                                    onChange={inputEtcHospital}
                                    id="etc_input"
                                />
                            </form>
                        </div>
                    ) : null}
                </div>
                <div className="make_review_hospital_body_div">
                    <div>
                        <p id="start_rate_title">Choose a horoscope</p>
                        <p id="start_rate_sub_title">
                        How was the surgery with the doctor?
                        </p>
                    </div>
                    <div className="start_rate_div">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <p
                                style={{
                                    marginRight: "3%",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Counseling
                            </p>
                            <div className="star_rate_wrapper">
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <p
                                style={{
                                    marginRight: "3%",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                postoperative care
                            </p>
                            <div className="star_rate_wrapper">
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="start_rate_div">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <p
                                style={{
                                    marginRight: "3%",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                surgical satisfaction
                            </p>
                            <div className="star_rate_wrapper">
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <p
                                style={{
                                    marginRight: "3%",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Dr's manner
                            </p>
                            <div className="star_rate_wrapper">
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="start_rate_div">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <p
                                style={{
                                    marginRight: "3%",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                English communication
                            </p>
                            <div className="star_rate_wrapper">
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
            {/* 원장 */}
            <div className="make_review_hospital_div">
                <div className="make_review_title_header_div">
                    <p id="make_review_sub_title_text">Doctor</p>
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
                                    <option
                                        key={doctor.doctorId}
                                        value={doctor.doctorId}
                                    >
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
                            <form
                                id="etc_input_form"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <input
                                    value={etcDoctor}
                                    placeholder="Direct input"
                                    onChange={inputEtcDoctor}
                                    id="etc_input"
                                />
                            </form>
                        </div>
                    ) : null}
                </div>
                <div className="make_review_hospital_body_div">
                    <div>
                        <p id="start_rate_title">Choose a horoscope</p>
                        <p id="start_rate_sub_title">
                        How was the surgery with the doctor?
                        </p>
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
                                Counseling
                            </p>
                            <div className="star_rate_wrapper">
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
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
                                postoperative care
                            </p>
                            <div className="star_rate_wrapper">
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
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
                                Surgerical Satisfaction
                            </p>
                            <div className="star_rate_wrapper">
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
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
                                Dr's manner
                            </p>
                            <div className="star_rate_wrapper">
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
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
                                English communication
                            </p>
                            <div className="star_rate_wrapper">
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                                <img
                                    src="/star_empty.png"
                                    alt=""
                                    id="star_rate"
                                />
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
            {/* 사진 */}
            <div className="make_review_picture_div">
                <p id="make_review_sub_title_text">Add Picture</p>
                <p id="make_review_add_picture_warning">
                    Max 10 pictures
                </p>
            </div>
            <div className="make_review_pictures_div">
                {
                    <div className="make_review_add_picture_wrapper">
                        <div className="make_review_add_picture_div">
                            <div className="add_picture_wrapper">
                                <img
                                    src="/add_picture.png"
                                    alt=""
                                    id="make_review_picture"
                                />
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
                            <p
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                week
                            </p>
                        </div>
                    </div>
                }
                <div className="add_picture_button">
                    <div className="add_picture_plus_div">
                        <img
                            src="/add_picture_plus.png"
                            alt=""
                            id="add_picture_plus"
                        />
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default MakeReviewItem;
