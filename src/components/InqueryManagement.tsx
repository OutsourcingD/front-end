import React from "react";
import "./InqueryManagement.css";
import Pagination from "react-js-pagination";
import axios from "axios";

interface InqueryManagementProps {
    id: number;
    userId: string;
    content: string;
    answer: string;
    createdAt: string;
}

const InqueryManagement = () => {
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(2);
    const [id, setId] = React.useState("");
    const [inquiryList, setInquiryList] = React.useState<InqueryManagementProps[]>([]);

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/inquiry`,
            params: {
                pages: page - 1,
                userId: id,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            console.log("click")
            setInquiryList(res.data);
            setTotalPages(res.data.length === 0 ? 1 : res.data[0].totalPages);
            setPage(1);
        });
    }

    const onClick = () => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/inquiry`,
            params: {
                pages: page - 1,
                userId: id,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            console.log("click")
            setInquiryList(res.data);
            setTotalPages(res.data.length === 0 ? 1 : res.data[0].totalPages);
            setPage(1);
        });
    }

    React.useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/inquiry`,
            params: {
                pages: page - 1,
                userId: id,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setInquiryList(res.data);
            setTotalPages(res.data.length === 0 ? 1 : res.data[0].totalPages);
        });
    }, []);

    return (
        <div className="check_user_ip_page">
            <div className="check_user_ip_div">
                <div className="check_user_ip_title_div">
                    <p id="change_review_title">Check User & Block User Id</p>
                    <div className="check_user_ip_search_div">
                        <form id="doctor_edit_page_search_form" onSubmit={(e) => onSubmit(e)}>
                            <input
                                type="text"
                                id="doctor_edit_page_search_input"
                                placeholder="원하는 게시글을 검색하세요."
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </form>
                        <img
                            src="/search.png"
                            alt="search"
                            id="doctor_edit_page_search_button"
                            onClick={onClick}
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
                            {inquiryList.length !== 0 ? inquiryList.map((item, index) => {
                                return (
                                    index < 10 ?
                                    <div className="inquery_item_div" key={item.id}>
                                        <div className="check_user_index_left_div">
                                            <p id="inquery_date">{item.createdAt}</p>
                                            <p id="inquery_id_data">
                                                {item.userId}
                                            </p>
                                        </div>
                                        <div className="check_user_index_right_div">
                                            <p id={item.answer === null ? "inquery_answer_data" : "inquery_answer_data_click"}>
                                                {item.answer === null ? "미답변" : "답변완료"}
                                            </p>
                                            <div className="inquery_action_div">
                                                <p id="inquery_action_data">
                                                    answer
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                                );
                            }) : null}
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
                            {inquiryList.length !== 0 ? inquiryList.map((item, index) => {
                                return (
                                    10 <= index && index < 20 ?
                                    <div className="inquery_item_div">
                                        <div className="check_user_index_left_div">
                                            <p id="inquery_date">{item.createdAt}</p>
                                            <p id="inquery_id_data">
                                                {item.userId}
                                            </p>
                                        </div>
                                        <div className="check_user_index_right_div">
                                            <p id={item.answer === null ? "inquery_answer_data" : "inquery_answer_data_click"}>
                                                {item.answer === null ? "미답변" : "답변완료"}
                                            </p>
                                            <div className="inquery_action_div">
                                                <p id="inquery_action_data">
                                                    answer
                                                </p>
                                            </div>
                                        </div>
                                    </div> : null
                                );
                            }): null}
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
