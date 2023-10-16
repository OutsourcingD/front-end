import React from "react";
import "./DoctorPostAdd.css";
import PartCategory from "../review_page/PartCategory";
import Wysiwyg from "./ContentInput";

interface DoctorInfoAddProps {
    isAddClicked: boolean;
}

const DoctorPostAdd: React.FC<DoctorInfoAddProps> = ({isAddClicked}) => {
    const [images, setImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );
    const [prevImages, setPrevImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );
    const [profileFiles, setProfileFiles] = React.useState<File[]>([]); // 파일 객체를 위한 상태
    const fileInputs = React.useRef<HTMLInputElement[]>([]);
    const [items, setItems] = React.useState([1]);

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
        }
    };

    if (!isAddClicked) {
        return null;
    }

    return (
        <div className="doctor_info_add_div">
            <div className="doctor_info_add_name_div">
                <p id="doctor_info_add_name_title">name</p>
                <div className="doctor_info_add_name_form_div">
                    <form id="doctor_info_add_name_form">
                        <input
                            id="doctor_info_add_name_input"
                            placeholder="Please enter doctor name"
                        />
                    </form>
                </div>
            </div>
            <div className="doctor_info_add_part_container">
                <p id="doctor_info_add_name_title">Part</p>
                <div style={{ width: "300px" }}>
                    <PartCategory />
                </div>
            </div>
            <div className="doctor_info_add_part_container">
                <p id="doctor_info_add_name_title">Title</p>
                <div className="doctor_info_add_title_form_div">
                    <form id="doctor_info_add_form">
                        <input
                            id="doctor_info_add_name_input"
                            placeholder="Please enter title"
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
                <div className="doctor_add_page_wysiwyg_div">
                    <Wysiwyg />
                </div>
            </div>
        </div>
    );
};
export default DoctorPostAdd;
