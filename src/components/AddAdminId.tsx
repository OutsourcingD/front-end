import React, { useId } from "react";
import "./AddAdminId.css";
import axios from "axios";

interface Props {
    userId: string;
}

const AddAdminId = () => {
    const [adminIdList, setAdminIdList] = React.useState<Props[]>([]);
    const [id, setId] = React.useState("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>, userId: string) => {
        e.preventDefault();

        addHandler(userId);
    };

    const addHandler = (userId: string) => {
        if(userId === "") {
            alert("Please enter an email to add.")
            return;
        }

        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/member/upgrade`,
            params: {
                id: userId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            const newItems = [...adminIdList]; // 기존 아이템들의 복사본을 만듭니다.
            newItems.push({userId}); // 복사본의 특정 요소만 업데이트합니다.
            setAdminIdList(newItems); // 그리고 복사본으로 상태를 업데이트합니다.
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403)
                alert("This is not admin ID.");
            else if(err.response.status === 404)
                alert(`${userId} is not exist.`);
            else
            {
                alert(`Contact to developer. ${err.response.status}`);
            }
        });
    };

    const deleteHandler = (index: number) => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/member/downgrade`,
            params: {
                id: adminIdList[index].userId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            if(res.status === 200) {
                const newItems = [...adminIdList]; // 기존 아이템들의 복사본을 만듭니다.
                newItems.splice(index, 1); // 복사본의 특정 요소만 업데이트합니다.
                setAdminIdList(newItems); // 그리고 복사본으로 상태를 업데이트합니다.
            }
        }).catch((err) => {
            if(err.status === 401 || err.status === 403)
                alert("This is not admin ID.");
            else if(err.status === 400)
                alert("Contact to developer.");  
            else 
                alert(`Contact to developer2. ${err.status}`);
        });
    }

    React.useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            if(res.status === 200) 
                setAdminIdList(res.data);
            else if(res.status === 401 || res.status === 403)
                alert("This is not admin ID.");
            else
                alert("Contact to developer.");
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
                    <p id="admin_list">Admin Id List</p>
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
                                        <div className="admin_add_item_button_div" onClick={() => deleteHandler(index)}>
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
                    <p id="admin_list">Add Adminstrator Id</p>
                    <div className="add_id_form_div">
                        <p id="admin_label">Admin Id</p>
                        <div className="add_id_form_container">
                            <form className="add_id_form" onSubmit={(e) => onSubmit(e, id)}>
                                <input
                                    type="text"
                                    placeholder="Please enter an email to add."
                                    id="add_id_input"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </form>
                        </div>
                    </div>
                    <div className="add_admin_add_button_wrapper">
                        <div className="add_admin_add_button_div" onClick={() => addHandler(id)}>
                            <p id="add_admin_add_button_text">add</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAdminId;
