import React from "react";
import "./AddAdminId.css";
import axios from "axios";
import Pagination from "react-js-pagination";
import UseConfirm from "./ConfirmItem";

interface Props {
    isBanned: boolean;
    totalPages: number;
    userId: string;
}

const DeleteMember = () => {
    const [userList, setUserList] = React.useState<Props[]>([]);
    const [id, setId] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(2);
    const message = "Are you sure delete this user?";

    const handlePage = (e: React.SetStateAction<number>) => {
        setPage(e);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/member/whole-info`,
            params: {
                pages: page - 1,
                userId: id,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setUserList(res.data);
            setTotalPage(res.data.length >= 1 ? res.data[0].totalPages : 1);
            setPage(1);
        });
    };

    const handleDelete = (id: string) => {
        axios({
            method: "delete",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/member`,
            params: {
                id
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            if(res.status === 200) {
                alert("delete success");
                // Delete the user from the userList state
                setUserList(userList.filter(user => user.userId !== id));
                setPage(1);
                setId("");
            }
            else {
                alert("delete fail");
            }
        });
    };

    const confirmDelete = (id: string) => {
        //yes, no
        const confirmDelete = UseConfirm(`${message} email is ${id}`, () => handleDelete(id), () => console.log("no"));

        confirmDelete !== undefined ? confirmDelete() : alert("delete error. contact to delevoper");
    }

    const onClick = () => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/member/whole-info`,
            params: {
                pages: page - 1,
                userId: id,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setUserList(res.data);
            setTotalPage(res.data.length >= 1 ? res.data[0].totalPages : 1);
            setPage(1);
        });
    }

    React.useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/member/whole-info`,
            params: {
                pages: page - 1,
                userId: id,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setUserList(res.data);
            setTotalPage(res.data.length >= 1 ? res.data[0].totalPages : 1);
        });
    }, [page]);

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
                        {userList.map((item, index) => {
                            return (
                                <div className="add_admin_item">
                                    <div className="add_admin_item_div">
                                        <p id="add_admin_item_sequence">
                                            {index + 1}
                                        </p>
                                        <p id="add_admin_item_id">
                                            {item.userId}
                                        </p>
                                    </div>
                                    <div className="admin_page_buttons_div">
                                        <div className="admin_add_item_button_div" onClick={() => confirmDelete(item.userId)}>
                                            <p id="doctor_item_button_delete">
                                                delete
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={10}
                            totalItemsCount={totalPage * 10}
                            pageRangeDisplayed={10}
                            prevPageText={"‹"}
                            nextPageText={"›"}
                            onChange={(e) => handlePage(e)}
                        />
                    </div>
                </div>
                <div className="add_admin_page_add_div">
                    <p id="admin_list">Search Member</p>
                    <div className="add_id_form_div">
                        <p id="admin_label">Member E-Mail</p>
                        <div className="add_id_form_container">
                            <form className="add_id_form" onSubmit={onSubmit}>
                                <input
                                    type="text"
                                    placeholder="Input Member E-Mail"
                                    id="add_id_input"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </form>
                        </div>
                    </div>
                    <div className="add_admin_add_button_wrapper">
                        <div className="add_admin_add_button_div" onClick={onClick}>
                            <p id="add_admin_add_button_text">Search</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteMember;
