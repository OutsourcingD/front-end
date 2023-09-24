import React from "react";
import "./BannerManagementPage.css";
import { IoMdAddCircleOutline } from "react-icons/io";

const BannerManagementPage = () => {
    const [bannerList, setBannerList] = React.useState([]);
    const item = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="banner_management_page_div">
            <div>
                <div className="banner_management_page_title_div">
                    <p id="banner_management_page_title">배너 리스트</p>
                </div>
                <div className="banner_management_container">
                    <div className="banner_management_left_div">
                        <p id="banner_management_item_title">상단 배너</p>
                        <div className="index_div">
                            <div className="index_left_div">
                                <p id="index_sequence">순서</p>
                                <p id="index_image">이미지</p>
                            </div>
                            <div className="index_right_div">
                                <p id="index_ability">기능</p>
                            </div>
                        </div>
                        {item.map((item, index) => {
                            return (
                                <div className="admin_page_banner_items_div">
                                    <p id="admin_page_banner_item_index">
                                        {index + 1}
                                    </p>
                                    <div className="admin_page_banner_image_div">
                                        <img
                                            src="https://hospital-image-bucket-1.s3.ap-northeast-2.amazonaws.com/banner/left/Mask%20group2.png"
                                            alt="banner"
                                            id="admin_page_banner_image"
                                        />
                                    </div>
                                    <div className="admin_page_banner_edit_buttons_div">
                                        <div className="admin_page_banner_delete_button_div">
                                            <p id="admin_page_banner_button_delete">
                                                삭제
                                            </p>
                                        </div>
                                        <div className="admin_page_banner_edit_button_div">
                                            <p id="admin_page_banner_button_edit">
                                                수정
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="banner_management_left_div">
                        <p id="banner_management_item_title">하단 배너</p>
                        <div className="index_div">
                            <div className="index_left_div">
                                <p id="index_sequence">순서</p>
                                <p id="index_image">이미지</p>
                            </div>
                            <div className="index_right_div">
                                <p id="index_ability">기능</p>
                            </div>
                        </div>
                        {item.map((item, index) => {
                            return (
                                <div className="admin_page_banner_items_div">
                                    <p id="admin_page_banner_item_index">
                                        {index + 1}
                                    </p>
                                    <div className="admin_page_banner_image_div">
                                        <img
                                            src="https://hospital-image-bucket-1.s3.ap-northeast-2.amazonaws.com/banner/left/Mask%20group2.png"
                                            alt="banner"
                                            id="admin_page_banner_image"
                                        />
                                    </div>
                                    <div className="admin_page_banner_edit_buttons_div">
                                        <div className="admin_page_banner_delete_button_div">
                                            <p id="admin_page_banner_button_delete">
                                                삭제
                                            </p>
                                        </div>
                                        <div className="admin_page_banner_edit_button_div">
                                            <p id="admin_page_banner_button_edit">
                                                수정
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="banner_management_page_add_button_div">
                <p id="doctor_edit_page_add_button_text">add banner</p>
                <IoMdAddCircleOutline size="20px"/>
            </div>
        </div>
    );
};

export default BannerManagementPage;
