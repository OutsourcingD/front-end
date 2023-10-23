import React from "react";
import "./BannerManagementPage.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { BannerDto } from "../dto/BannerDto";
import { useNavigate } from "react-router-dom";

const BannerManagementPage = () => {
    const [topBannerList, setTopBannerList] = React.useState<BannerDto[]>([]);
    const [bottomBannerList, setBottomBannerList] = React.useState<BannerDto[]>([]);
    const navigate = useNavigate();

    const getBanner = async (location: number) => {
        //1: 상단, 3: 하단
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/banner?location=${location}`,
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
                                        <div className="admin_page_banner_delete_button_div">
                                            <p id="admin_page_banner_button_delete">
                                                delete
                                            </p>
                                        </div>
                                        <div className="admin_page_banner_edit_button_div">
                                            <p id="admin_page_banner_button_edit">
                                                edit
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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
                                        <div className="admin_page_banner_delete_button_div">
                                            <p id="admin_page_banner_button_delete">
                                                delete
                                            </p>
                                        </div>
                                        <div className="admin_page_banner_edit_button_div">
                                            <p id="admin_page_banner_button_edit">
                                                edit
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
