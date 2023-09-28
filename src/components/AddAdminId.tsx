import React from "react";
import "./AddAdminId.css";
import Pagination from "react-js-pagination";

const AddAdminId = () => {
    const item = [1, 2, 3, 4, 5, 6, 7, 8];
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(2);

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    };

    return (
        <div className="check_user_ip_page">
            <div className="check_user_ip_div">
                <div className="check_user_ip_title_div">
                    <p id="change_review_title">Admin Id Management</p>
                </div>
            </div>
            <div className="add_admin_page_div">
                <div className="add_admin_id_div">
                    <p id="admin_list">관리자아이디 목록</p>
                    <div className="add_admin_page_index_div">
                        <div className="admin_left_div">
                            <p id="admin_no">No.</p>
                            <p id="admin_id">admin id</p>
                        </div>
                        <p id="admin_action">action</p>
                    </div>
                    <div className="add_admin_items">
                        {item.map((item, index) => {
                            return (
                                <div className="add_admin_item">
                                    <p id="add_admin_item_sequence">1</p>
                                    <p id="add_admin_item_id">
                                        kimculsoo@gmail.com
                                    </p>
                                    <div className="admin_page_buttons_div">
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
                <div className="add_admin_page_add_div">
                    <p id="admin_list">관리자아이디 추가</p>
                    <div className="add_id_form_div">
                        <p id="admin_label">관리자 아이디</p>
                        <div className="add_id_form_container">
                            <form className="add_id_form">
                                <input
                                    type="text"
                                    placeholder="추가할 이메일을 입력해주세요"
                                    id="add_id_input"
                                />
                            </form>
                        </div>
                    </div>
                    <div className="add_admin_add_button_wrapper">
                        <div className="add_admin_add_button_div">
                            <p id="add_admin_add_button_text">add</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAdminId;
