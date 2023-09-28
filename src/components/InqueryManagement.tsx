import React from "react";
import "./InqueryManagement.css";
import Pagination from "react-js-pagination";

const InqueryManagement = () => {
    const item = [1, 2, 3, 4, 5, 6, 7, 8];
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(2);

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    }

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
                <div className="inquery_page_body">
                    <div className="check_user_left_div">
                        <div className="inquery_management_index_div">
                            <div className="check_user_index_left_div">
                                <p id="inquery_date">날짜</p>
                                <p id="inquery_id">아이디</p>
                            </div>
                            <div className="check_user_index_right_div">
                                <p id="inquery_answer">답변 여부</p>
                                <p id="inquery_action">기능</p>
                            </div>
                        </div>
                        <div className="inquery_items_div">
                            {item.map((item, index) => {
                                return (
                                    <div className="inquery_item_div">
                                        <div className="check_user_index_left_div">
                                            <p id="inquery_date">2023.08.11</p>
                                            <p id="inquery_id_data">
                                                kimchulsoo@gmail.com
                                            </p>
                                        </div>
                                        <div className="check_user_index_right_div">
                                            <p id="inquery_answer_data">
                                                미답변
                                            </p>
                                            <div className="inquery_action_div">
                                                <p id="inquery_action_data">
                                                    답변
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="check_user_left_div">
                        <div className="inquery_management_index_div">
                            <div className="check_user_index_left_div">
                                <p id="inquery_date">날짜</p>
                                <p id="inquery_id">아이디</p>
                            </div>
                            <div className="check_user_index_right_div">
                                <p id="inquery_answer">답변 여부</p>
                                <p id="inquery_action">기능</p>
                            </div>
                        </div>
                        <div className="inquery_items_div">
                            {item.map((item, index) => {
                                return (
                                    <div className="inquery_item_div">
                                        <div className="check_user_index_left_div">
                                            <p id="inquery_date">2023.08.11</p>
                                            <p id="inquery_id_data">
                                                kimchulsoo@gmail.com
                                            </p>
                                        </div>
                                        <div className="check_user_index_right_div">
                                            <p id="inquery_answer_data">
                                                미답변
                                            </p>
                                            <div className="inquery_action_div">
                                                <p id="inquery_action_data">
                                                    답변
                                                </p>
                                            </div>
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

export default InqueryManagement;
