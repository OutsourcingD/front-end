import React from "react";
import "./InfoEditComponent.css";
import PartCategory from "../review_page/PartCategory";
import axios from "axios";

interface InfoEditProp {
    isHopitalInfoEditClicked : boolean;
    setIsHospitalInfoEditClicked: (value:boolean) => void;
}

const HospitalInfoEditComponent:React.FC<InfoEditProp> = ({isHopitalInfoEditClicked,setIsHospitalInfoEditClicked}) => {
    const [category,setCategory] = React.useState<number>(0);

    const [images,setImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );

    const [prevImages, setPrevImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );

    const [profileFiles, setProfileFiles] = React.useState<File[]>([]); 
    const fileInputs = React.useRef<HTMLInputElement[]>([]);

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

    if (!isHopitalInfoEditClicked) {
        return null;
    }

    return (
        <div className="banner_detail_page_div">
        <div className="banner_edit_category_div">
            <p id="banner_main_text">Category</p>
            <div className="banner_sub_div">
                <div className="banner_sub_category_div">
                    <img
                        src="/checkbox_pupple.png"
                        alt=""
                        id = "banner_edit_category_checkbox"
                    />
                </div>
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
                            />
                        </form>
                    </div>

                    <p id="banner_main_text">Name</p>
                    <div className="banner_link_add_form_div">
                        <form id = "banner_link_add_form">
                            <input
                                id ="banner_link_add_input"
                                placeholder="Enter the name of the hospital"
                            />
                        </form>
                    </div>
                </div>
        </div>

        <div className="doctor_info_add_part_container">
                <p id="doctor_info_add_name_title">Part</p>
                <div style={{ width: "300px" }}>
                    <PartCategory />
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
                <p id="banner_cancel_text" onClick={() => {setIsHospitalInfoEditClicked(false);}}>cancel</p>
            </div>
            <div className="banner_save_button_div">
                <p id="banner_save_text">save</p>
            </div>
        </div>
    </div>
    );
}

export default HospitalInfoEditComponent;