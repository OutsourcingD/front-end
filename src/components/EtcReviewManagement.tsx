import React from "react";
import Pagination from "react-js-pagination";
import "./EtcReviewManagement.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface EtcReviewManagementProps {
    createdAt: string;
    reviewId: number;
    title: string;
    totalPages: number;
    userId: string;
}

const EtcReviewManagement = () => {
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(2);
    const [id, setId] = React.useState("");
    const [etcList, setEtcList] = React.useState<EtcReviewManagementProps[]>([]);
    const navigate = useNavigate();

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    };

    const onClick = () => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/review-info`,
            params: {
                pages: page - 1,
                userId: id,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setEtcList(res.data);
            setTotalPages(res.data.length === 0 && res.data.length === undefined && res.data === undefined && res.data === null ? 1 : res.data[0].totalPages);
        }).catch((err) => {
            if(err.response.status === 403 || err.response.status === 401) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/admin");   
            }
        });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/review-info`,
            params: {
                pages: page - 1,
                userId: id,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setEtcList(res.data);
            setTotalPages(res.data.length === 0 && res.data === undefined && res.data === null ? 1 : res.data[0].totalPages);
        }).catch((err) => {
            if(err.response.status === 403 || err.response.status === 401) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/admin");   
            }
        });
    };

    React.useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/review-info`,
            params: {
                pages: page - 1,
                userId: id,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setEtcList(res.data);
            setTotalPages(res.data.length === 0 && res.data === undefined && res.data === null ? 1 : res.data[0].totalPages);
            console.log(res.data.length)
        }).catch((err) => {
            if(err.response.status === 403 || err.response.status === 401) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/admin");   
            }
        });
    }, [page]);

    return (
        <div className="check_user_ip_page">
            <div className="check_user_ip_div">
                <div className="check_user_ip_title_div">
                    <p id="change_review_title">Manage Etc Review</p>
                    <div className="check_user_ip_search_div">
                        <form
                            id="doctor_edit_page_search_form"
                            onSubmit={onSubmit}
                        >
                            <input
                                type="text"
                                id="doctor_edit_page_search_input"
                                placeholder="Search the user email."
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </form>
                        <img
                            src="/search.png"
                            alt="search"
                            id="doctor_edit_page_search_button"
                            onClick={() => onClick()}
                        />
                    </div>
                </div>
            </div>
            <div className="check_user_ip_body_div">
                <div className="inquery_page_body">
                    <div className="etc_management_page_left_div">
                        <div className="etc_manage_page_index_div">
                            <p id="etc_manage_page_sequence">No.</p>
                            <p id="etc_manage_page_title">title</p>
                            <p id="etc_manage_page_id">id</p>
                            <p id="etc_manage_page_action">action</p>
                        </div>
                        <div className="inquery_items_div">
                            {etcList.length !== 0 ?etcList.map((item, index) => {
                                return (
                                    index < 10 ?
                                    <div className="etc_page_item_div">
                                        <p id="etc_manage_page_sequence_data">
                                            {index + 1}
                                        </p>
                                        <p title={item.title} id="etc_manage_page_title_data">
                                            {item.title.substring(0, 10)}
                                        </p>
                                        <p title={item.userId} id="etc_manage_page_id_data">
                                            {item.userId.substring(0, 20)}
                                        </p>
                                        <div className="etc_manage_page_action_button">
                                            <p id="etc_manage_page_action_data">
                                                edit
                                            </p>
                                        </div>
                                    </div> : null
                                );
                            }) : null}
                        </div>
                    </div>
                    <div className="etc_management_page_left_div">
                        <div className="etc_manage_page_index_div">
                            <p id="etc_manage_page_sequence">No.</p>
                            <p id="etc_manage_page_title">title</p>
                            <p id="etc_manage_page_id">id</p>
                            <p id="etc_manage_page_action">action</p>
                        </div>
                        <div className="inquery_items_div">
                            {etcList.length !== 0 ?etcList.map((item, index) => {
                                return (
                                    index >= 10 && index < 20?
                                    <div className="etc_page_item_div">
                                        <p id="etc_manage_page_sequence_data">
                                            {index + 1 + 10}
                                        </p>
                                        <p title={item.title} id="etc_manage_page_title_data">
                                            {item.title.substring(0, 10)}
                                        </p>
                                        <p title={item.userId} id="etc_manage_page_id_data">
                                            {item.userId.substring(0, 20)}
                                        </p>
                                        <div className="etc_manage_page_action_button">
                                            <p id="etc_manage_page_action_data">
                                                edit
                                            </p>
                                        </div>
                                    </div> : null
                                );
                            }) : null}
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

export default EtcReviewManagement;
