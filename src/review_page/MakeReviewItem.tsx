import React, { useEffect } from "react";
import Wysiwyg from "../components/ContentInput";
import PartCategory from "./PartCategory";
import { DoctorNameResponseDto } from "../dto/DoctorNameResponseDto";
import axios from "axios";
import { HospitalNameResponseDto } from "../dto/HospitalNameResponseDto";
import "./MakeReviewPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import StarRate from "../components/StarRate";
import DrStarRate from "../components/DrStarRate copy";

interface ReviewAddRequestDto {
    afterCare: number;
    consultingQuality: number;
    content: string;
    doctorId: number;
    doctorManner: number;
    employeeManner: number;
    englishCommunication: number;
    facilirty: number;
    hospitalId: number;
    hospitalName: string;
    location: string;
    part: string;
    price: number;
    resultSatisfy: number;
    reviewImageList: File[];
    summary: string;
    system: number;
    tittle: string;
    doctorName: string;
}

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
    const [title, setTitle] = React.useState("");
    const [items, setItems] = React.useState([1]);
    const [images, setImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );
    const fileInputs = React.useRef<HTMLInputElement[]>([]);
    const [prevImages, setPrevImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );
    const [profileFiles, setProfileFiles] = React.useState<File[]>([]); // 파일 객체를 위한 상태
    const [selected, setSelected] = React.useState("week");

    const [dr_manner, setDr_manner] = React.useState(0);
    const [english_communication, setEnglish_communication] = React.useState(1);
    const [hcRating, setHcRating] = React.useState(0);
    const [hpRating, setHpRating] = React.useState(0);
    const [hsRating, setHsRating] = React.useState(0);
    const [hdRating, setHdRating] = React.useState(0);
    const [heRating, setHeRating] = React.useState(0);
    const [dcRating, setdcRating] = React.useState(0);
    const [dpRating, setdpRating] = React.useState(0);
    const [dsRating, setdsRating] = React.useState(0);
    const [doctorId, setDoctorId] = React.useState(0);
    const [hospitalId, setHospitalId] = React.useState(0);
    const [hospitalName, setHospitalName] = React.useState("");
    const [doctorName, setDoctorName] = React.useState("");

    const [parts, setParts] = React.useState("");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const addReview = () => {
        const requestDto : ReviewAddRequestDto = {
            afterCare: hcRating,
            consultingQuality: hpRating,
            content: "",
            doctorId: doctorId,
            doctorManner: dr_manner,
            employeeManner: hsRating,
            englishCommunication: heRating,
            facilirty: hdRating,
            hospitalId: hospitalId,
            hospitalName: hospitalName,
            location: "",
            part: parts,
            price: 0,
            resultSatisfy: dsRating,
            reviewImageList: profileFiles,
            summary: "",
            system: english_communication,
            tittle: title,
            doctorName: doctorName
        };

        axios({
            method: "post", // or 'post', 'put', etc.
            url: `/api/review`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "multipart/form-data",
            },
            data: requestDto
        }).then((res) => {
            navigate(`/`);
        }).catch((err) => {
            console.log("add review error: " + err);
            navigate(`/`);
        });
    }

    const selectHospital = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setHospitalId(0);
        setHospitalName(e.target.value);
    };

    const selectDoctor = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDoctorId(0);
        setDoctorName(e.target.value);
    };

    const inputEtcHospital = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEtcHospital(e.target.value);
    };

    const inputEtcDoctor = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEtcDoctor(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const saveImgFile = (index: number) => {
        if (
            fileInputs.current[0] === null ||
            fileInputs.current[0].files === null
        ) {
            setImages(prevImages[0]); // 파일 선택이 없거나 취소된 경우 이전 사진으로 복원
            return;
        }
        const file = fileInputs.current[0].files[0];
        const reader = new FileReader();

        if (!(file instanceof Blob)) {
            setImages(prevImages); // 파일 선택이 없거나 취소된 경우 이전 사진으로 복원
            return;
        }

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (
                fileInputs.current[index] !== null &&
                fileInputs.current[index]?.files !== null &&
                typeof reader.result === "string"
            ) {
                setPrevImages((prevImages) => {
                    const newPrevImages = [...prevImages];
                    newPrevImages[index] = reader.result; // 현재 image 상태를 prevImage에 저장합니다.
                    return newPrevImages;
                });

                setImages((images) => {
                    const newImages = [...images];
                    newImages[index] = reader.result;
                    return newImages;
                });

                setProfileFiles((prevProfileFiles) => {
                    const newProfileFiles = [...prevProfileFiles];
                    if (file) {
                        // If the file exists
                        newProfileFiles[index] = file;
                    }
                    return newProfileFiles;
                });
            }
        };
    };

    const addButtonClick = () => {
        if (items.length < 10) {
            setItems((prev) => [...prev, prev.length + 1]);
        } else {
            alert("Exceeding the maximum number : 10");
        }
    };

    useEffect(() => {
        //병원 정보 가져오기
        axios({
            method: "get", // or 'post', 'put', etc.
            url: `/api/hospital/all`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((res) => {
                setHospitalInfo(res.data);
            })
            .catch((err) => {
                if (
                    err.response.status === 401 ||
                    err.response.status === 403
                ) {
                    alert("This is not admin ID.");
                    navigate("/login");
                } else {
                    //alert(`Contact to developer. ${err.response.status}`);
                }
            });

        //의사 정보 가져오기
        axios({
            method: "get", // or 'post', 'put', etc.
            url: `/api/doctor/all`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((res) => {
                setDoctorInfo(res.data);
            })
            .catch((err) => {
                if (
                    err.response.status === 401 ||
                    err.response.status === 403
                ) {
                    alert("This is not admin ID.");
                    navigate("/login");
                } else {
                    //alert(`Contact to developer. ${err.response.status}`);
                }
            });
    }, []);

    return (
        <>
            <div className="make_review_sub_title">
                <p id="make_review_sub_title_text">Title</p>
                <div className="make_review_category_input">
                    <form id="make_review_form" onSubmit={onSubmit}>
                        <input
                            type="text"
                            id="make_review_input"
                            placeholder="Enter a title."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </form>
                </div>
            </div>
            {/* part */}
            <div className="make_review_part_div">
                <p id="make_review_sub_title_text">Parts</p>
                <div className="part_category">
                    <PartCategory changePart={setParts}/>
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
                        <div style={{ display: "flex", flexDirection: "row", width: "300px" }}>
                            <p
                                style={{
                                    marginRight: "3%",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Counseling
                            </p>
                            <div className="star_rate_wrapper">
                                <select
                                    id="period_select"
                                    onChange={(e) =>
                                        setHcRating(Number(e.target.value))
                                    }
                                >
                                    <option key="score" value="score">
                                        score
                                    </option>
                                    <option key="one" value="1">
                                        1
                                    </option>
                                    <option key="two" value="2">
                                        2
                                    </option>
                                    <option key="three" value="3">
                                        3
                                    </option>
                                    <option key="four" value="4">
                                        4
                                    </option>
                                    <option key="five" value="5">
                                        5
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", width: "300px" }}>
                            <p
                                style={{
                                    marginRight: "3%",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                postoperative care
                            </p>
                            <div className="star_rate_wrapper">
                                <select
                                    id="period_select"
                                    onChange={(e) =>
                                        setHpRating(Number(e.target.value))
                                    }
                                >
                                    <option key="score" value="score">
                                        score
                                    </option>
                                    <option key="one" value="1">
                                        1
                                    </option>
                                    <option key="two" value="2">
                                        2
                                    </option>
                                    <option key="three" value="3">
                                        3
                                    </option>
                                    <option key="four" value="4">
                                        4
                                    </option>
                                    <option key="five" value="5">
                                        5
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="start_rate_div">
                        <div style={{ display: "flex", flexDirection: "row", width: "300px" }}>
                            <p
                                style={{
                                    marginRight: "3%",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                surgical satisfaction
                            </p>
                            <div className="star_rate_wrapper">
                                <select
                                    id="period_select"
                                    onChange={(e) =>
                                        setHsRating(Number(e.target.value))
                                    }
                                >
                                    <option key="score" value="score">
                                        score
                                    </option>
                                    <option key="one" value="1">
                                        1
                                    </option>
                                    <option key="two" value="2">
                                        2
                                    </option>
                                    <option key="three" value="3">
                                        3
                                    </option>
                                    <option key="four" value="4">
                                        4
                                    </option>
                                    <option key="five" value="5">
                                        5
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", width: "300px" }}>
                            <p
                                style={{
                                    marginRight: "3%",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Dr's manner
                            </p>
                            <div className="star_rate_wrapper">
                                <select
                                    id="period_select"
                                    onChange={(e) =>
                                        setHdRating(Number(e.target.value))
                                    }
                                >
                                    <option key="score" value="score">
                                        score
                                    </option>
                                    <option key="one" value="1">
                                        1
                                    </option>
                                    <option key="two" value="2">
                                        2
                                    </option>
                                    <option key="three" value="3">
                                        3
                                    </option>
                                    <option key="four" value="4">
                                        4
                                    </option>
                                    <option key="five" value="5">
                                        5
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="start_rate_div">
                        <div style={{ display: "flex", flexDirection: "row", width: "300px" }}>
                            <p
                                style={{
                                    marginRight: "3%",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                English communication
                            </p>
                            <div className="star_rate_wrapper">
                                <select
                                    id="period_select"
                                    onChange={(e) =>
                                        setHeRating(Number(e.target.value))
                                    }
                                >
                                    <option key="score" value="score">
                                        score
                                    </option>
                                    <option key="one" value="1">
                                        1
                                    </option>
                                    <option key="two" value="2">
                                        2
                                    </option>
                                    <option key="three" value="3">
                                        3
                                    </option>
                                    <option key="four" value="4">
                                        4
                                    </option>
                                    <option key="five" value="5">
                                        5
                                    </option>
                                </select>
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
                        <div style={{ display: "flex", flexDirection: "row", width: "300px" }}>
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
                                <select
                                    id="period_select"
                                    onChange={(e) =>
                                        setdcRating(Number(e.target.value))
                                    }
                                >
                                    <option key="score" value="score">
                                        score
                                    </option>
                                    <option key="one" value="1">
                                        1
                                    </option>
                                    <option key="two" value="2">
                                        2
                                    </option>
                                    <option key="three" value="3">
                                        3
                                    </option>
                                    <option key="four" value="4">
                                        4
                                    </option>
                                    <option key="five" value="5">
                                        5
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", width: "300px" }}>
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
                                <select
                                    id="period_select"
                                    onChange={(e) =>
                                        setdpRating(Number(e.target.value))
                                    }
                                >
                                    <option key="score" value="score">
                                        score
                                    </option>
                                    <option key="one" value="1">
                                        1
                                    </option>
                                    <option key="two" value="2">
                                        2
                                    </option>
                                    <option key="three" value="3">
                                        3
                                    </option>
                                    <option key="four" value="4">
                                        4
                                    </option>
                                    <option key="five" value="5">
                                        5
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="start_rate_div">
                        <div style={{ display: "flex", flexDirection: "row", width: "300px" }}>
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
                                <select
                                    id="period_select"
                                    onChange={(e) =>
                                        setdsRating(Number(e.target.value))
                                    }
                                >
                                    <option key="score" value="score">
                                        score
                                    </option>
                                    <option key="one" value="1">
                                        1
                                    </option>
                                    <option key="two" value="2">
                                        2
                                    </option>
                                    <option key="three" value="3">
                                        3
                                    </option>
                                    <option key="four" value="4">
                                        4
                                    </option>
                                    <option key="five" value="5">
                                        5
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", width: "300px" }}>
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
                                <select
                                    id="period_select"
                                    onChange={(e) =>
                                        setDr_manner(Number(e.target.value))
                                    }
                                >
                                    <option key="score" value="score">
                                        score
                                    </option>
                                    <option key="one" value="1">
                                        1
                                    </option>
                                    <option key="two" value="2">
                                        2
                                    </option>
                                    <option key="three" value="3">
                                        3
                                    </option>
                                    <option key="four" value="4">
                                        4
                                    </option>
                                    <option key="five" value="5">
                                        5
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="start_rate_div">
                        <div style={{ display: "flex", flexDirection: "row", width: "300px" }}>
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
                                <select
                                    id="period_select"
                                    onChange={(e) =>
                                        setEnglish_communication(Number(e.target.value))
                                    }
                                >
                                    <option key="score" value="score">
                                        score
                                    </option>
                                    <option key="one" value="1">
                                        1
                                    </option>
                                    <option key="two" value="2">
                                        2
                                    </option>
                                    <option key="three" value="3">
                                        3
                                    </option>
                                    <option key="four" value="4">
                                        4
                                    </option>
                                    <option key="five" value="5">
                                        5
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
            {/* 사진 */}
            <div className="make_review_picture_div">
                <p id="make_review_sub_title_text">Add Picture</p>
                <p id="make_review_add_picture_warning">Max 10 pictures</p>
            </div>
            <div className="make_review_pictures_div">
                <div className="make_review_add_picture_box">
                    {items.map((item, index) => {
                        return (
                            <div className="make_review_add_picture_wrapper">
                                <div className="make_review_add_picture_div">
                                    <div className="add_hospital_picture_wrapper">
                                        <img
                                            src={images[index]}
                                            alt=""
                                            id="add_hospital_info_make_review_picture"
                                            onClick={() => {
                                                fileInputs.current[
                                                    index
                                                ]?.click();
                                            }}
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="signup_input"
                                            name="profile"
                                            style={{ display: "none" }}
                                            onChange={() => saveImgFile(index)}
                                            ref={(el) => {
                                                if (el)
                                                    fileInputs.current[index] =
                                                        el;
                                            }}
                                        ></input>
                                    </div>
                                </div>
                                <div className="make_review_picture_input_div">
                                    <select
                                        id="period_select"
                                        onChange={(e) =>
                                            setSelected(e.target.value)
                                        }
                                    >
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
                                        <option
                                            key="before-after"
                                            value="before-after"
                                        >
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
                                        {selected !== "period"
                                            ? selected
                                            : "week"}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <div className="add_picture_button">
                        <div
                            className="add_picture_plus_div"
                            onClick={addButtonClick}
                        >
                            <img
                                src="/add_picture_plus.png"
                                alt=""
                                id="add_picture_plus"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MakeReviewItem;
