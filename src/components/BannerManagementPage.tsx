import React from "react";
import "./BannerManagementPage.css";

const BannerManagementPage = () => {
    return (
        <div className="banner_management_page_div">
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
                </div>
            </div>
        </div>
    );
};

export default BannerManagementPage;
