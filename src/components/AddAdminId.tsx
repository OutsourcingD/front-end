import React from "react";
import "./AddAdminId.css";
import axios from "axios";

interface Props {
    userId: string;
}

const AddAdminId = () => {
    const [adminIdList, setAdminIdList] = React.useState<Props[]>([]);
    const [id, setId] = React.useState("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            console.log(res.data)
        });
    };

    React.useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setAdminIdList(res.data);
        });
    }, []);

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
                        {adminIdList.map((item, index) => {
                            return (
                                <div className="add_admin_item">
                                    <div className="add_admin_item_div">
                                        <p id="add_admin_item_sequence">{index + 1}</p>
                                        <p id="add_admin_item_id">
                                            {item.userId}
                                        </p>
                                    </div>
                                    <div className="admin_page_buttons_div">
                                        <div className="admin_add_item_button_div">
                                            <p id="doctor_item_button_delete">
                                                delete
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="add_admin_page_add_div">
                    <p id="admin_list">관리자아이디 추가</p>
                    <div className="add_id_form_div">
                        <p id="admin_label">관리자 아이디</p>
                        <div className="add_id_form_container">
                            <form className="add_id_form" onSubmit={onSubmit}>
                                <input
                                    type="text"
                                    placeholder="추가할 이메일을 입력해주세요"
                                    id="add_id_input"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
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
