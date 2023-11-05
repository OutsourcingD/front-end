import React from "react";
import "./DoctorPostAdd.css";
import PartCategory from "../review_page/PartCategory";
import Wysiwyg from "./ContentInput";
import Breast from "../part/Breast";
import Countouring from "../part/Countouring";
import Eyes from "../part/Eyes";
import FatGrafting from "../part/FatGrafting";
import Lifting from "../part/Lifting";
import Liposuction from "../part/Liposuction";
import Nose from "../part/Nose";
import Skin from "../part/Skin";
import axios from "axios"
import { DoctorPostAddDto } from "../dto/DoctorPostAddDto";
import { title } from "process";

interface DoctorInfoAddProps {
    isAddClicked: boolean;
    setIsAddClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const DoctorPostAdd: React.FC<DoctorInfoAddProps> = ({isAddClicked,setIsAddClicked}) => {
    const [images, setImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );
    const [prevImages, setPrevImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );
    const [profileFiles, setProfileFiles] = React.useState<File[]>([]); // 파일 객체를 위한 상태
    const fileInputs = React.useRef<HTMLInputElement[]>([]);
    const [items, setItems] = React.useState([1]);
    const [breastClicked,setBreastClicked] = React.useState(false);
    const [countouringClicked,setCountouringClicked] = React.useState(false);
    const [eyesClicked,setEyesClicked] = React.useState(false);
    const [fatGraftingClicked,setFatGraftingClicked] = React.useState(false);
    const [liftingClicked,setLiftingClicked] = React.useState(false);
    const [liposuctionClicked,setLiposuctionClicked] = React.useState(false);
    const [noseClicked,setNoseClicked] = React.useState(false);
    const [skinClicked,setSkinClicked] = React.useState(false);

    const [title,setTitle] = React.useState("");
    const [doctorName,setDoctorName] = React.useState("");
    const [description,setDescription] = React.useState("");

    const onDoctorPostAdd = () => {
        let part = "";

        if (breastClicked) {
            part = part + 'breast'+' ';
        }
        if (countouringClicked) {
            part = part + 'countouring'+' ';
        }
        if (eyesClicked) {
            part = part + 'eyes'+' ';
        }
        if (fatGraftingClicked) {
            part = part + 'fatgrafting'+' ';
        }
        if (liftingClicked) {
            part = part + 'lifting'+' ';
        }
        if (liposuctionClicked) {
            part = part + 'liposuction'+ ' ';
        }
        if (noseClicked) {
            part = part + 'nose'+' ';
        }
        if (skinClicked) {
            part = part  + 'skin'+' ';
        }

        const DoctorPostAddDto: DoctorPostAddDto = {
            type: 1,
            title: title,
            name: doctorName,
            part: part,
            introduction: description,
            postImageList: profileFiles
        };

        axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/api/admin/post/add`,
            data: DoctorPostAddDto,
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
    const addButtonClick = () => {
        if (items.length < 10) {
            setItems((prev) => [...prev, prev.length + 1]);
        } else {
            alert("Exceeding the maximum number : 10")
        }
    };

    if (!isAddClicked) {
        return null;
    }

    return (
        <div className="doctor_info_add_div">
            <div className="doctor_info_add_part_container">
                <p id="doctor_info_add_name_title">Name</p>
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
            <div className="doctor_info_add_part_container">
                <p id="doctor_info_add_name_title">Part</p>
                <div style={{ width: "300px" }}>
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
                </div>
                </div>
            </div>
            <div className="doctor_info_add_part_container">
                <p id="doctor_info_add_name_title">Title</p>
                <div className="doctor_info_add_title_form_div">
                    <form id="doctor_info_add_form">
                        <input
                            id="doctor_info_add_name_input"
                            placeholder="Please enter title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </form>
                </div>
            </div>
            <div className="doctor_info_add_part_container">
                <p id="doctor_info_add_name_title">Description</p>
                <div className="doctor_info_add_des_form_div">
                    <form id="doctor_info_add_form">
                        <input
                            id="doctor_info_add_name_input"
                            placeholder="Please enter description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </form>
                </div>
            </div>
            <div className="doctor_info_add_picture_div">
                <p id="doctor_info_add_name_title">Add picture</p>
                <p id="doctor_info_add_warn">Maximum: 10</p>
                {/* 사진 */}
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
                <div className="banner_buttons_div">
                        <div className="banner_cancel_button_div">
                            <p id="banner_cancel_text" onClick={() => {setIsAddClicked(false);}}>cancel</p>
                         </div>
                        <div className="banner_save_button_div">
                            <p id="banner_save_text" onClick={() => onDoctorPostAdd()}>save</p>
                        </div>
                    </div>
                <div className="doctor_add_page_wysiwyg_div">
                    
                </div>
            </div>
        </div>
    );
};
export default DoctorPostAdd;
