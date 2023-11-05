import React from "react";
import "./BannerManagementPage.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { BannerDto } from "../dto/BannerDto";
import { useNavigate } from "react-router-dom";
import { BannerEditRequestDto } from "../dto/BannerEditRequestDto";
import { BannerAddRequestDto } from "../dto/BannerAddRequestDto";

interface BannerDetailProps {
    bannerId: number;
    bannerImg: string;
    bannerLink: string;
    location: number;
}

interface BannerRequestDto {
    bannerLink: string;
    sequence: number;
    location: number;
    hospitalName: string;
}

const BannerManagementPage = () => {
    const [topBannerList, setTopBannerList] = React.useState<BannerDto[]>([]);
    const [bottomBannerList, setBottomBannerList] = React.useState<BannerDto[]>([]);
    const [isTopBannerClicked,setIsTopBannerClicked] = React.useState(false);
    const [isBottomBannerClicked,setIsBottomBannerClicked] = React.useState(false);
    const [isBannerAddClicked,setIsBannerAddClicked] = React.useState(false);
    const [bannerDetail, setBannerDetail] = React.useState<BannerDetailProps>({} as BannerDetailProps);
    const [bannerRequestDto,setBannerRequestDto] = React.useState<BannerRequestDto>({} as BannerRequestDto);
    const [category,setCategory] = React.useState(0);
    const [hospitalName,setHospitalName] = React.useState<String>();
    const [bannerLink,setBannerLink] = React.useState("");
    const [bannerId,setBannerId] = React.useState(0);
    const [location,setLocation] = React.useState(0);
    const [sequence,setSequence] = React.useState(1);

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
    const navigate = useNavigate();

    const getBanner = async (location: number) => {
        //1: 상단, 3: 하단
        await axios({
            method: "get",
            url: `/api/banner?location=${location}`,
        }).then((res) => {
            location === 1 ? setTopBannerList(res.data) : setBottomBannerList(res.data);
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

    const onEditBanner = (bannerId: number) => {
        const BannerEditRequestDto: BannerEditRequestDto = {
            bannerId: bannerId,
            bannerLink: bannerLink,
            location: location,
            img: profileFiles[0]
        }

        axios({
            method: "post",
            url: `/api/admin/banner/edit`,
            data: BannerEditRequestDto,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                "Content-Type": "multipart/form-data"
            }    
        }).then((res) => {
            alert("Success");
            setIsBannerAddClicked(false);
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

    const onTopDetailClick = (bannerId : number) => {
        axios({
            method: "get",
            url: `/api/admin/banner/detail`,
            params: {
                bannerId: bannerId
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setBannerDetail(res.data);    
            setBannerId(res.data.bannerId);
            setBannerLink(res.data.bannerLink);
        });
    }

    const onBottomDetailClick = (bannerId : number) => {
        axios({
            method:"get",
            url: `/api/admin/banner/detail`,
            params: {
                bannerId: bannerId
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setBannerDetail(res.data);
            setBannerId(res.data.bannerId);
            setBannerLink(res.data.bannerLink);
        })
    }

    const onBannerRemove = (bannerId : number) => {
        axios({
            method: "delete",
            url: `/api/banner/remove?bannerId=${bannerId}`, // bannerId를 URL에 포함시킵니다.
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
            }    
        }).then((res) => {
            alert("Delete Success");
        }).catch((err) => {
            if (err.response.status === 401 || err.response.status === 403) {
                alert("This id is not admin id.");
            }
            else {
                alert("Contact to developer. Error Code: " + err.response.status)
            }
        });
        
    }

    const onBannerAddClick = () => {
        const BannerAddRequestDto: BannerAddRequestDto = {
            bannerId: bannerId,
            location: location,
            bannerLink: bannerLink,
            sequence: sequence,
            img: profileFiles[0]
        }

        axios({
            method: "post",
            url: `/api/admin/banner/add`,
            data: BannerAddRequestDto,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                "Content-Type": "multipart/form-data"
            }    
        }).then((res) => {
            alert("Success");
            setIsBannerAddClicked(false);
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

    React.useEffect(() => {
        getBanner(1);
        getBanner(3);
    }, []);

    return (
        <div className="banner_management_page_div">
            <div>
                <div className="banner_management_page_title_div">
                    <p id="banner_management_page_title">Banner List</p>
                </div>
                <div className="banner_management_container">
                    <div className="banner_management_left_div">
                        <p id="banner_management_item_title">Top Banner</p>
                        <div className="index_div">
                            <div className="index_left_div">
                                <p id="index_sequence">Sequence</p>
                                <p id="index_image">image</p>
                            </div>
                            <div className="index_right_div">
                                <p id="index_ability">Action</p>
                            </div>
                        </div>
                        {topBannerList.map((item, index) => {
                            return (
                                <div className="admin_page_banner_items_div" key={item.bannerId}>
                                    <p id="admin_page_banner_item_index">
                                        {index + 1}
                                    </p>
                                    <div className="admin_page_banner_image_div">
                                        <img
                                            src={item.bannerImg}
                                            alt={item.hospital_name}
                                            id="admin_page_banner_image"
                                        />
                                    </div>
                                    <div className="admin_page_banner_edit_buttons_div">
                                        <div className="admin_page_banner_delete_button_div" onClick={() => onBannerRemove(item.bannerId)}>
                                            <p id="admin_page_banner_button_delete">
                                                delete
                                            </p>
                                        </div>
                                        <div className="admin_page_banner_edit_button_div" onClick={() => {setIsTopBannerClicked(true); setLocation(1); onTopDetailClick(item.bannerId);}}>
                                            <p id="admin_page_banner_button_edit">
                                                edit
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {
                            isTopBannerClicked ?
                            <div className="banner_detail_page_div">
                                <div className="banner_edit_category_div">
                                    <p id="banner_main_text">Location</p>
                                    <div className="banner_sub_div">
                                        <div className="banner_sub_category_div">
                                            <img
                                                src="/checkbox_pupple.png"
                                                alt=""
                                                id = "banner_edit_category_checkbox"
                                            />
                                        </div>
                                        <p id="banner_sub_text">
                                            top
                                        </p>
                                    </div>

                                    <div className="banner_link_add_container">
                                        <div className="banner_link_add_div">
                                            <p id="banner_main_text">Banner Link</p>
                                            <div className="banner_link_add_form_div">
                                                <form id = "banner_link_add_form">
                                                    <input
                                                        id ="banner_link_add_input"
                                                        placeholder={bannerDetail.bannerLink}
                                                        onChange = {(e) => setBannerLink(e.target.value)}
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="banner_edit_category_div">
                                    <p id="banner_main_text">Banner Image</p>
                                    <p id="banner_sub_text">1920px * 440px</p>
                                </div>

                                <div className="banner_info_add_picture_div">
                                    <div className="banner_add_picture_wrapper">
                                        <img
                                            src={images[0] === '/add_picture_png.png' ? bannerDetail.bannerImg:images[0]}
                                            alt=""
                                            id="banner_add_picture"
                                            onClick={(e)=> {
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
                                            ref={(el) => {
                                                if (el) {
                                                    fileInputs.current[0] = el;
                                                }
                                            }}
                                            onChange={(e) => {saveImgFile(0);}}
                                        />
                                    </div>
                                   
                                </div>
                                <div className="banner_buttons_div">
                                    <div className="banner_cancel_button_div">
                                        <p id="banner_cancel_text" onClick={() => {setIsTopBannerClicked(false)}}>cancel</p>
                                    </div>
                                    <div className="banner_save_button_div" onClick = {() => {onEditBanner(bannerId);}}>
                                        <p id="banner_save_text">save</p>
                                    </div>
                                </div>
                            </div> : null
                        }
                    </div>

                    <div className="banner_management_left_div">
                        <p id="banner_management_item_title">Bottom Banner</p>
                        <div className="index_div">
                            <div className="index_left_div">
                                <p id="index_sequence">Sequence</p>
                                <p id="index_image">Image</p>
                            </div>
                            <div className="index_right_div">
                                <p id="index_ability">Action</p>
                            </div>
                        </div>
                        {bottomBannerList.map((item, index) => {
                            return (
                                <div className="admin_page_banner_items_div" key={item.bannerId}>
                                    <p id="admin_page_banner_item_index">
                                        {index + 1}
                                    </p>
                                    <div className="admin_page_banner_image_div">
                                        <img
                                            src={item.bannerImg}
                                            alt={item.hospital_name}
                                            id="admin_page_banner_image"
                                        />
                                    </div>
                                    <div className="admin_page_banner_edit_buttons_div">
                                        <div className="admin_page_banner_delete_button_div" onClick={() => onBannerRemove(item.bannerId)}>
                                            <p id="admin_page_banner_button_delete">
                                                delete
                                            </p>
                                        </div>
                                        <div className="admin_page_banner_edit_button_div" onClick={() => {setIsBottomBannerClicked(true); setLocation(3); onBottomDetailClick(item.bannerId);}}>
                                            <p id="admin_page_banner_button_edit">
                                                edit
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {
                            isBottomBannerClicked ?
                            <div className="banner_detail_page_div">
                                <div className="banner_edit_category_div">
                                    <p id="banner_main_text">Location</p>
                                    <div className="banner_sub_div">
                                        <div className="banner_sub_category_div">
                                            <img
                                                src="/checkbox_pupple.png"
                                                alt=""
                                                id = "banner_edit_category_checkbox"
                                            />
                                        </div>
                                        <p id="banner_sub_text">
                                            bottom
                                        </p>
                                    </div>

                                    <div className="banner_link_add_container">
                                        <div className="banner_link_add_div">
                                            <p id="banner_main_text">Banner Link</p>
                                            <div className="banner_link_add_form_div">
                                                <form id = "banner_link_add_form">
                                                    <input
                                                        id ="banner_link_add_input"
                                                        placeholder={bannerDetail.bannerLink}
                                                        onChange = {(e) => setBannerLink(e.target.value)}
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="banner_edit_category_div">
                                    <p id="banner_main_text">Banner Image</p>
                                    <p id="banner_sub_text">1920px * 440px</p>
                                </div>

                                <div className="banner_info_add_picture_div">
                                    <div className="banner_add_picture_wrapper">
                                        <img
                                            src={images[0] === '/add_picture_png.png' ? bannerDetail.bannerImg:images[0]}
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
                                   
                                </div>
                                <div className="banner_buttons_div">
                                    <div className="banner_cancel_button_div">
                                        <p id="banner_cancel_text" onClick={() => {setIsBottomBannerClicked(false)}}>cancel</p>
                                    </div>
                                    <div className="banner_save_button_div" onClick = {() => {onEditBanner(bannerId);}}>
                                        <p id="banner_save_text">save</p>
                                    </div>
                                </div>
                            </div> : null
                        }
                    </div>
                </div>
            </div>
            <div className="banner_management_page_add_button_div" onClick = {() => {setIsBannerAddClicked(true);}}>
                <p id="admin_page_banner_add_button_text">add banner</p>
                <IoMdAddCircleOutline size="20px"/>
            </div>

            {isBannerAddClicked ?
                            <div className="banner_detail_page_div">
                                <div className = "banner_detail_page_top_div">
                                        <p id="user_detail_exit_button" onClick={() => {setIsBannerAddClicked(false)}}>X</p>
                                </div>
                                <div className="banner_edit_category_div">
                                    <p id="banner_main_text">Location</p>
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
                                                    onClick={() => {setCategory(0); setLocation(0);}}
                                                />
                                            )}
                                        </div>
                                        <p id="banner_sub_text">
                                            top
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
                                                id = "banner_edit_category_checkbox_pupple"
                                                onClick={() => {setCategory(1); setLocation(3);}}
                                            />
                                        )}
                                        <p id="banner_sub_text">
                                            bottom
                                        </p>
                                    </div>

                                    <div className="banner_link_add_container">
                                        <div className="banner_link_add_div">
                                            <p id="banner_main_text">Banner Link</p>
                                            <div className="banner_link_add_form_div">
                                                <form id = "banner_link_add_form">
                                                    <input
                                                        id ="banner_link_add_input"
                                                         placeholder="https://"
                                                         onChange = {(e) => setBannerLink(e.target.value)}
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="banner_link_add_container">
                                        <div className="banner_link_add_div">
                                            <p id="banner_main_text">Display Order</p>
                                            {sequence === 1 ? (
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
                                                    onClick={() => {setSequence(1);}}
                                                />
                                            )}
                                            <p id="banner_sub_text">
                                                1st
                                            </p>
                                            {sequence === 2 ? (
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
                                                    onClick={() => {setSequence(2);}}
                                                />
                                            )}
                                            <p id="banner_sub_text">
                                                2nd
                                            </p>
                                            {sequence === 3 ? (
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
                                                    onClick={() => {setSequence(3);}}
                                                />
                                            )}
                                            <p id="banner_sub_text">
                                                3th
                                            </p>
                                            {sequence === 4 ? (
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
                                                    onClick={() => {setSequence(4);}}
                                                />
                                            )}
                                            <p id="banner_sub_text">
                                                4th
                                            </p>
                                            {sequence === 5 ? (
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
                                                    onClick={() => {setSequence(5);}}
                                                />
                                            )}
                                            <p id="banner_sub_text">
                                                5th
                                            </p>
                                        </div>
                                    </div>

                                <div className="banner_edit_category_div">
                                    <p id="banner_main_text">Banner Image</p>
                                    <p id="banner_sub_text">1920px * 440px</p>
                                </div>

                                <div className="banner_info_add_picture_div">
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
                                   
                                </div>
                                <div className="banner_buttons_div">
                                    <div className="banner_cancel_button_div">
                                        <p id="banner_cancel_text" onClick={() => {setIsBannerAddClicked(false)}}>cancel</p>
                                    </div>
                                    <div className="banner_save_button_div" onClick={() => {onBannerAddClick()}}>
                                        <p id="banner_save_text">save</p>
                                    </div>
                                </div>
                            </div> : null
                }
        </div>
    );
};

export default BannerManagementPage;
