import React, { useEffect } from "react";
import "./HospitalInfoAdd.css";
import axios from "axios";
import PartCategory from "../review_page/PartCategory";
import PartComponent from "../part/PartComponent";
import { useNavigate } from "react-router-dom";
import Wysiwyg from "./ContentInput";

interface HospitalPostEditProps {
    postId : number;
    isLeftClicked: boolean;
    setIsLeftClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HospitalPostDetailProps {
    title: string;
    partList: string[];
    hospitalName: string;
    introduction: string;
}

interface ImageVo {
    imageId: number;
    description: string;
    url: string;
}

const HospitalPostEdit: React.FC<HospitalPostEditProps> = ({postId,isLeftClicked,setIsLeftClicked}) => {
    const navigate = useNavigate();
    const [images, setImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );
    const [prevImages, setPrevImages] = React.useState(
        Array(10).fill("/add_picture_png.png")
    );
    const [profileFiles, setProfileFiles] = React.useState<File[]>([]); // 파일 객체를 위한 상태
    const fileInputs = React.useRef<HTMLInputElement[]>([]);
    const [items, setItems] = React.useState([1]);
    const [hospitalPostDetail,setHospitalPostDetail]  = React.useState<HospitalPostDetailProps>({} as HospitalPostDetailProps);
    const [imageList, setImageList] = React.useState<ImageVo[]>([]);

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

    const getHospitalPostDetail = async (postId : number) => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/hospital/detail?postId=${postId}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setHospitalPostDetail(res.data);
            setImageList(res.data.imageList);
        }).catch((err) => {
            if(err.status === 401 || err.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else if(err.status === 404) {
                alert("Contact to developer.");
                navigate("/");
            }
            else {
                alert(`Contact to developer2. ${err.status}`);
                navigate("/");
            }
        });
    }

    useEffect(() => {
        getHospitalPostDetail(postId);
    },[]);

    if (!isLeftClicked) {
        return null;
    }

    return (
        
        <div className="edit_doctor_div">
                    <div className="hospital_info_add_div">
            <div className="hospital_info_add_name_div">
                <p id="hospital_info_add_name_title">Name</p>
                <div className="hospital_info_add_name_form_div">
                    <form id="hospital_info_add_name_form">
                        <input
                            id="hospital_info_add_name_input"
                            placeholder={hospitalPostDetail.hospitalName}
                        />
                    </form>
                </div>
            </div>
            <div className="hospital_info_add_part_container">
                <p id="hospital_info_add_name_title">Part</p>
                <div>
                <PartComponent partList={hospitalPostDetail.partList}/>
                </div>
            </div>
            <div className="hospital_info_add_part_container">
                <p id="hospital_info_add_name_title">Title</p>
                <div className="hospital_info_add_title_form_div">
                    <form id="hospital_info_add_form">
                        <input
                            id="hospital_info_add_name_input"
                            placeholder={hospitalPostDetail.title}
                        />
                    </form>
                </div>
            </div>
            <div className="hospital_info_add_part_container">
                <p id="hospital_info_add_name_title">Description</p>
                <div className="hospital_info_add_des_form_div">
                    <form id="hospital_info_add_form">
                        <input
                            id="hospital_info_add_name_input"
                            placeholder={hospitalPostDetail.introduction}
                        />
                    </form>
                </div>
            </div>
            <div className="hospital_info_add_picture_div">
                <p id="hospital_info_add_name_title">Add picture</p>
                <p id="hospital_info_add_warn">Maximum: 10</p>
                {/* 사진 */}
                <div className="make_info_pictures_div">
                    {imageList.map((image,index) => {
                                               return (
                                                <div className="make_review_add_picture_wrapper">
                                                    <div className="make_review_add_picture_div">
                                                        <div className="add_hospital_picture_wrapper">
                                                            <img
                                                                src={imageList[index].url}
                                                                alt=""
                                                                id="add_hospital_info_make_review_picture"
                                                                onClick={() => {
                                                                    fileInputs.current[
                                                                        index
                                                                    ]?.click();
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                    })
                    }
                </div>
                <div className="banner_buttons_div">
                        <div className="banner_cancel_button_div">
                            <p id="banner_cancel_text" onClick={() => {setIsLeftClicked(false);}}>cancel</p>
                         </div>
                        <div className="banner_save_button_div">
                            <p id="banner_save_text">save</p>
                        </div>
                    </div>
                <div className="hospital_add_page_wysiwyg_div">
                    
                </div>
            </div>
        </div>
        </div>
    );
};
export default HospitalPostEdit;
