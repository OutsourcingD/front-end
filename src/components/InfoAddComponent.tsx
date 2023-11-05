import React from "react";
import "./InfoEditComponent.css";
import PartCategory from "../review_page/PartCategory";
import axios from "axios";
import { AdminDoctorAddRequestDto } from "../dto/AdminDoctorAddRequestDto";
import { AdminHospitalAddRequestDto } from "../dto/AdminHospitalAddRequestDto";
import Breast from "../part/Breast";
import Countouring from "../part/Countouring";
import Eyes from "../part/Eyes";
import FatGrafting from "../part/FatGrafting";
import Lifting from "../part/Lifting";
import Liposuction from "../part/Liposuction";
import Nose from "../part/Nose";
import Skin from "../part/Skin";

interface InfoAddProp {
    isInfoAddClicked : boolean;
    setIsInfoAddClicked: (value:boolean) => void;
}

const InfoAddComponent:React.FC<InfoAddProp> = ({isInfoAddClicked,setIsInfoAddClicked}) => {
    const [category,setCategory] = React.useState<number>(0);

    const [doctorName, setDoctorName] = React.useState("");
    const [hospitalName, setHospitalName] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [breastClicked,setBreastClicked] = React.useState(false);
    const [countouringClicked,setCountouringClicked] = React.useState(false);
    const [eyesClicked,setEyesClicked] = React.useState(false);
    const [fatGraftingClicked,setFatGraftingClicked] = React.useState(false);
    const [liftingClicked,setLiftingClicked] = React.useState(false);
    const [liposuctionClicked,setLiposuctionClicked] = React.useState(false);
    const [noseClicked,setNoseClicked] = React.useState(false);
    const [skinClicked,setSkinClicked] = React.useState(false);

    const [images,setImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );

    const [prevImages, setPrevImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );

    const [profileFiles, setProfileFiles] = React.useState<File[]>([]); 
    const fileInputs = React.useRef<HTMLInputElement[]>([]);

    const onDoctorAdd = () => {
        let part = ""

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

        const AdminDoctorAddRequestDto: AdminDoctorAddRequestDto = {
            doctorName: doctorName,
            location: location,
            description: description,
            part: part,
            mainImage: profileFiles[0]
        };

        axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/api/admin/doctor/add`,
            data: AdminDoctorAddRequestDto,
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

    const onHospitalAdd = () => {
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

        const AdminHospitalAddRequestDto: AdminHospitalAddRequestDto = {
            hospitalName: hospitalName,
            location: location,
            description: description,
            part: part,
            mainImage: profileFiles[0]
        };

        axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/api/admin/hospital/add`,
            data: AdminHospitalAddRequestDto,
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

    if (!isInfoAddClicked) {
        return null;
    }

    return (
        <div className="banner_detail_page_div">
        <div className="banner_edit_category_div">
            <p id="banner_main_text">Category</p>
            <div className="banner_sub_div">
                <div className="banner_sub_category_div">
                    {category === 0 ? (
                        <img
                            src="/checkbox_pupple.png"
                            alt=""
                            id = "banner_edit_category_checkbox"
                        />
                    ) : (
                        <img
                            src="/checkbox.png"
                            alt=""
                            id ="banner_edit_category_checkbox_pupple"
                            onClick={() => setCategory(0)}
                        />
                    )}
                </div>
                <p id="banner_sub_text">
                    doctor
                </p>
            </div>
            <div className="banner_sub_div">
                {category === 1 ? (
                        <img
                            src="/checkbox_pupple.png"
                            alt=""
                            id = "banner_edit_category_checkbox"
                        />
                    ) : (
                        <img
                            src="/checkbox.png"
                            alt=""
                            id ="banner_edit_category_checkbox_pupple"
                            onClick={() => setCategory(1)}
                        />
                )}
                <p id="banner_sub_text">
                    hospital
                </p>
            </div>
        </div>

        <div className="banner_link_add_container">
                <div className="banner_link_add_div">
                    <p id="banner_main_text">Location</p>
                    <div className="banner_link_add_form_div">
                        <form id = "banner_link_add_form">
                            <input
                                id ="banner_link_add_input"
                                 placeholder="Enter the address of hospital"
                                 onChange={(e) => setLocation(e.target.value)}
                            />
                        </form>
                    </div>

                    <p id="banner_main_text">Name</p>
                    <div className="banner_link_add_form_div">
                        <form id = "banner_link_add_form">
                            <input
                                id ="banner_link_add_input"
                                placeholder="Enter the name of the hospital or doctor"
                                onChange={(e) => category === 0 ? setDoctorName(e.target.value) : setHospitalName(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
        </div>

        <div className="banner_link_add_container">
                <div className="banner_link_add_div">
                    <p id="banner_main_text">Description</p>
                    <div className="banner_link_add_form_div">
                        <form id = "description_add_form">
                            <input
                                id ="banner_link_add_input"
                                placeholder="Enter the description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </form>
                    </div>
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


        <div className="banner_edit_category_div">
            <p id="banner_main_text">Main Image</p>
        </div>
        <div className="banner_add_picture_wrapper">
                    <img
                        src={images[0]}
                        alt=""
                        id="banner_add_picture"
                        onClick={()=> {
                            fileInputs.current[
                                0
                            ]?.click();
                        }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        id="signup_input"
                        name="profile"
                        style={{ display:"none" }}
                        onChange={() => saveImgFile(0)}
                        ref={(el) => {
                            if (el) {
                                fileInputs.current[0] = el;
                            }
                        }}
                    />
                </div>

        <div className="banner_buttons_div">
            <div className="banner_cancel_button_div">
                <p id="banner_cancel_text" onClick={() => {setIsInfoAddClicked(false);}}>cancel</p>
            </div>
            <div className="banner_save_button_div">
                <p id="banner_save_text" onClick={async () => {
                    if (category ===0) {
                       onDoctorAdd();
                    } else {
                        onHospitalAdd();
                    }
                }}>save</p>
            </div>
        </div>
    </div>
    );
}

export default InfoAddComponent;