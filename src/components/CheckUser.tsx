import React from "react";
import "./CheckUser.css";
import Pagination from "react-js-pagination";

const CheckUser = () => {
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
                    <p id="change_review_title">Check User & Block User Id</p>
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
                        <div className="check_user_index_div">
                            <p id="check_user_id">유저 아이디</p>
                            <p id="check_user_location">차단 여부</p>
                        </div>
                        <div className="check_user_ip_items_div">
                            {item.map((item, index) => {
                                return (
                                    <div className="check_user_item_div">
                                        <p id="check_user_page_id">Kimchulsoo@nave.com</p>
                                        <div className="block_button_div">
                                            <p id="block_button_text">no ban</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="check_user_left_div">
                        <div className="check_user_index_div">
                            <p id="check_user_id">유저 아이디</p>
                            <p id="check_user_location">차단 여부</p>
                        </div>
                        <div className="check_user_ip_items_div">
                            {item.map((item, index) => {
                                return (
                                    <div className="check_user_item_div">
                                        <p id="check_user_page_id">Kimchulsoo@nave.com</p>
                                        <div className="block_button_div">
                                            <p id="block_button_text">no ban</p>
                                        </div>
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

export default CheckUser;
