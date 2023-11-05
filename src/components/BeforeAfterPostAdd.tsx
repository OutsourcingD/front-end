import React from "react";
import Wysiwyg from "./ContentInput";
import './BeforeAfterPostAdd.css';
import Breast from "../part/Breast";
import Countouring from "../part/Countouring";
import Eyes from "../part/Eyes";
import FatGrafting from "../part/FatGrafting";
import Lifting from "../part/Lifting";
import Liposuction from "../part/Liposuction";
import Nose from "../part/Nose";
import Skin from "../part/Skin";
import { BeforeAfterAddDto } from "../dto/BeforeAfterAddDto";
import axios from 'axios';

interface BeforeAfterAddProps {
    isAddClicked: boolean;
    setIsAddClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const BeforeAfterPostAdd: React.FC<BeforeAfterAddProps> = ({isAddClicked,setIsAddClicked}) => {
    const [images, setImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );
    const [prevImages, setPrevImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );
    const [profileFiles, setProfileFiles] = React.useState<File[]>([]); // 파일 객체를 위한 상태
    const fileInputs = React.useRef<HTMLInputElement[]>([]);
    const [items, setItems] = React.useState([1,2]);
    const [breastClicked,setBreastClicked] = React.useState(false);
    const [countouringClicked,setCountouringClicked] = React.useState(false);
    const [eyesClicked,setEyesClicked] = React.useState(false);
    const [fatGraftingClicked,setFatGraftingClicked] = React.useState(false);
    const [liftingClicked,setLiftingClicked] = React.useState(false);
    const [liposuctionClicked,setLiposuctionClicked] = React.useState(false);
    const [noseClicked,setNoseClicked] = React.useState(false);
    const [skinClicked,setSkinClicked] = React.useState(false);
    const [beforeAfterPeriod ,setBeforeAfterPeriod] = React.useState<string[]>([]);

    const [doctorName,setDoctorName] = React.useState("");
    const [hospitalName,setHospitalName] = React.useState("");

    const onBeforeAfterPostAdd = () => {
        let part = [];

        if (breastClicked) {
            part.push('breast');
        }
        if (countouringClicked) {
            part.push('countouring');
        }
        if (eyesClicked) {
            part.push('eyes');
        }
        if (fatGraftingClicked) {
            part.push('fatgrafting');
        }
        if (liftingClicked) {
            part.push('lifting');

        }
        if (liposuctionClicked) {
            part.push('liposuction');
        }
        if (noseClicked) {
            part.push('nose');
        }
        if (skinClicked) {
            part.push('skin');
        }

        const BeforeAfterAddDto: BeforeAfterAddDto = {
            doctorId: 0,
            hospitalId: 0,
            doctorName: doctorName,
            hospitalName: hospitalName,
            beforeImage: [profileFiles[0]],
            afterImage: [profileFiles[1]],
            part: part,
            beforeAfterPeriod: beforeAfterPeriod
        }

        axios({
            method: "post",
            url: `/api/admin/before-after`,
            data: BeforeAfterAddDto,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                "Content-Type": "multipart/form-data"
            }    
        }).then((res) => {
            alert("Success");
        }).catch((err) => {
            if (err.response.status === 401 || err.response.status === 403) {
                alert("This id is not admin id.");
            }
            else 
            {
                alert("Contact to developer." + err.response.status)
            }
        });
    }
 
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

    if (!isAddClicked) {
        return null;
    }

    return (
        <div className="doctor_info_add_div">
            <div className="doctor_info_add_part_container">
                <p id="doctor_info_add_name_title">Hospital</p>
                <div className="doctor_info_add_title_form_div">
                    <form id="doctor_info_add_form">
                        <input
                            id="doctor_info_add_name_input"
                            placeholder="Please enter hospital name"
                            onChange={(e) => setHospitalName(e.target.value)}
                        />
                    </form>
                </div>
                
                <p id="doctor_info_add_name_title">Doctor</p>
                <div className="doctor_info_add_title_form_div">
                    <form id="doctor_info_add_form">
                        <input
                            id="doctor_info_add_name_input"
                            placeholder="Please enter doctor name"
                            onChange={(e) => setDoctorName(e.target.value)}
                        />
                    </form>
                </div>
            </div>

            <div className="doctor_info_add_picture_div">
                <p id="doctor_info_add_name_title">Add picture</p>
                <p id="doctor_info_add_warn">Maximum: 2</p>

                <div>
                    <div className="part_category_div">
                    <div onClick={() => setBreastClicked(breastClicked => !breastClicked)}>
                    <Breast />
                    </div>
                    <div onClick={() => setCountouringClicked(countouringClicked => !countouringClicked)}>
                    <Countouring />
                    </div>
                    <div onClick={() => setEyesClicked(eyesClicked => !eyesClicked)}>
                    <Eyes />
                    </div>
                    <div onClick={() => setFatGraftingClicked(fatGraftingClicked => !fatGraftingClicked)}>
                    <FatGrafting />
                    </div>
                    <div onClick={() => setLiftingClicked(liftingClicked => !liftingClicked)}>
                    <Lifting />
                    </div>
                    <div onClick={() => setLiposuctionClicked(liposuctionClicked => !liposuctionClicked)}>
                    <Liposuction />
                    </div>
                    <div onClick={() => setNoseClicked(noseClicked => !noseClicked)}>
                    <Nose />
                    </div>
                    <div onClick={() => setSkinClicked(skinClicked => !skinClicked)}>
                    <Skin />
                    </div>
                    <div className="surgery-period-input-wrapper" style={{display: 'inline-block'}}>
                                        <input
                                            type="text"
                                            placeholder="duration period"
                                            className="surgery-period"
                                            onChange={(e) => setBeforeAfterPeriod([e.target.value])}
                                        />
                                    </div>
                        </div>
                    </div>
                
                <div className="make_info_pictures_div">
                    {items.map((item, index) => {
                        return (
                            <div className="make_review_add_picture_wrapper">
                                <div className="make_review_add_picture_div">
                                    <div className="add_doctor_picture_wrapper">
                                        <img
                                            src={images[index]}
                                            alt=""
                                            id="add_doctor_info_make_review_picture"
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
                            </div>
                        );
                    })}
                </div>
                <div className="banner_buttons_div">
                        <div className="banner_cancel_button_div">
                            <p id="banner_cancel_text" onClick={() => {setIsAddClicked(false);}}>cancel</p>
                         </div>
                        <div className="banner_save_button_div">
                            <p id="banner_save_text" onClick={() => onBeforeAfterPostAdd()}>save</p>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default BeforeAfterPostAdd;