import React from "react";
import "./DoctorEdit.css";
import Pagination from "react-js-pagination";
import { IoMdAddCircleOutline } from "react-icons/io";

const DoctorEdit = () => {
    const item = [1, 2, 3, 4, 5, 6, 7, 8];
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(2);

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
      };

    return (
        <div className="doctor_edit_page">
            <div className="change_review_container">
                <p id="change_review_title">병원 • 원장 게시글</p>
            </div>
            <div className="doctor_edit_body_container">
                <div className="doctor_edit_body">
                    <div className="docotr_edit_title_div">
                        <p id="banner_management_item_title">병원 게시글</p>
                        <div className="doctor_edit_page_search">
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
                    <div className="doctor_edit_index_div">
                        <div className="doctor_edit_left_index_div">
                            <p id="doctor_edit_page_index_no">No.</p>
                            <p id="doctor_edit_page_index_title">글제목</p>
                        </div>
                        <div className="doctor_edit_right_index_div">
                            <p id="doctor_edit_page_index_detail">기능</p>
                        </div>
                    </div>
                    <div className="doctor_items_div">
                        {item.map((item, index) => {
                            return (
                                <>
                                    <div className="doctor_edit_item_div">
                                        <div className="doctor_edit_item_left_div">
                                            <p id="doctor_page_sequence">1</p>
                                            <p id="doctor_page_item_title">
                                                beautiful mind plastic surgery
                                            </p>
                                        </div>
                                        <div className="doctor_edit_item_right_div">
                                            <div className="doctor_edit_item_button_div">
                                                <p id="doctor_item_button_edit">
                                                    edit
                                                </p>
                                            </div>
                                            <div className="doctor_edit_item_button_div">
                                                <p id="doctor_item_button_delete">
                                                    delete
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
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
                <div className="doctor_edit_body">
                    <div className="docotr_edit_title_div">
                        <p id="banner_management_item_title">원장 게시글</p>
                        <div className="doctor_edit_page_search">
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
                    <div className="doctor_edit_index_div">
                        <div className="doctor_edit_left_index_div">
                            <p id="doctor_edit_page_index_no">No.</p>
                            <p id="doctor_edit_page_index_title">글제목</p>
                        </div>
                        <div className="doctor_edit_right_index_div">
                            <p id="doctor_edit_page_index_detail">기능</p>
                        </div>
                    </div>
                    <div className="doctor_items_div">
                        {item.map((item, index) => {
                            return (
                                <>
                                    <div className="doctor_edit_item_div">
                                        <div className="doctor_edit_item_left_div">
                                            <p id="doctor_page_sequence">1</p>
                                            <p id="doctor_page_item_title">
                                                beautiful mind plastic surgery
                                            </p>
                                        </div>
                                        <div className="doctor_edit_item_right_div">
                                            <div className="doctor_edit_item_button_div">
                                                <p id="doctor_item_button_edit">
                                                    edit
                                                </p>
                                            </div>
                                            <div className="doctor_edit_item_button_div">
                                                <p id="doctor_item_button_delete">
                                                    delete
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
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
            <div className="doctor_edit_page_add_button_div">
                <p id="doctor_edit_page_add_button_text">add hospital • doctor post</p>
                <IoMdAddCircleOutline size="20px"/>
            </div>
        </div>
    );
};

export default DoctorEdit;
