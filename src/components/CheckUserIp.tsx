import React from "react";
import "./CheckUserIp.css";
import Pagination from "react-js-pagination";

const CheckUserIp = () => {
    const item = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(2);

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    };

    return (
        <div className="check_user_ip_page">
            <div className="check_user_ip_div">
                <div className="check_user_ip_title_div">
                    <p id="change_review_title">Check User Ip</p>
                    <div className="check_user_ip_search_div">
                        <form id="doctor_edit_page_search_form">
                            <input
                                type="text"
                                id="doctor_edit_page_search_input"
                                placeholder="원하는 게시글을 검색하세요."
                            />
                        </form>
                        <img
                            src="/search.png"
                            alt="search"
                            id="doctor_edit_page_search_button"
                        />
                    </div>
                </div>
            </div>
            <div className="check_user_ip_body_div">
                <div className="check_user_body">
                    <div className="check_user_left_div">
                        <div className="check_user_ip_index_div">
                            <p id="access_date">접속 날짜</p>
                            <p id="user_ip">유저 IP</p>
                            <p id="check_user_ip_id">아이디</p>
                            <p id="check_user_ip_location">위치 정보</p>
                        </div>
                        <div className="check_user_ip_items_div">
                            {item.map((item, index) => {
                                return (
                                    <div className="check_user_ip_item_div">
                                        <p id="access_date_data">2023.08.11</p>
                                        <p id="user_ip_data">221.112.222.222</p>
                                        <p id="check_user_ip_id_data">
                                            kimchulsoo@gmail.com
                                        </p>
                                        <p id="check_user_ip_location_data">
                                            KR
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="check_user_left_div">
                        <div className="check_user_ip_index_div">
                            <p id="access_date">접속 날짜</p>
                            <p id="user_ip">유저 IP</p>
                            <p id="check_user_ip_id">아이디</p>
                            <p id="check_user_ip_location">위치 정보</p>
                        </div>
                        <div className="check_user_ip_items_div">
                            {item.map((item, index) => {
                                return (
                                    <div className="check_user_ip_item_div">
                                        <p id="access_date_data">2023.08.11</p>
                                        <p id="user_ip_data">221.112.222.222</p>
                                        <p id="check_user_ip_id_data">
                                            kimchulsoo@gmail.com
                                        </p>
                                        <p id="check_user_ip_location_data">
                                            KR
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <Pagination
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={totalPages * 10}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default CheckUserIp;
