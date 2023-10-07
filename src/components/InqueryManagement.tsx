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

interface InqueryDetailProps {
    id: number;
    userId: string;
    answer: string;
    content: string;
}

const InqueryManagement = () => {
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(2);
    const [id, setId] = React.useState("");
    const [inquiryList, setInquiryList] = React.useState<InqueryManagementProps[]>([]);
    const [isLeftClick, setIsLeftClick] = React.useState(false);
    const [isRightClick, setIsRightClick] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [inquiryDetail, setInquiryDetail] = React.useState<InqueryDetailProps>({} as InqueryDetailProps);
    const [inquiryIndex, setInquiryIndex] = React.useState(0);

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

    const onSave = (id: number) => {
        axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/inquiry-answer/edit`,
            data: {
                id: id,
                answer: content,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            alert("Success");
            setIsLeftClick(false);
            setIsRightClick(false);
            const newItems = [...inquiryList];
            newItems[inquiryIndex].answer = content;
            setInquiryList(newItems);
        }).catch((err) => {
            if (err.response.status === 401 || err.response.status === 403) {
                alert("This id is not admin id.");
            }
            else 
            {
                alert("Contact to developer." + err.response.status)
            }
        });
    }

    const leftAnswerClick = (id: number) => {
        setIsLeftClick(true);

        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/inquiry/detail`,
            params: {
                id: id,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setInquiryDetail(res.data);
        }).catch((err) => {
            if (err.response.status === 401 || err.response.status === 403) {
                alert("This id is not admin id.");
            }
            else 
            {
                alert("Contact to developer." + err.response.status)
            }
        })
    };

    const rightAnswerClick = (userId: string) => {
        setIsRightClick(true);

        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/inquiry/detail`,
            params: {
                id: id,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setInquiryDetail(res.data);
        }).catch((err) => {
            if (err.response.status === 401 || err.response.status === 403) {
                alert("This id is not admin id.");
            }
            else 
            {
                alert("Contact to developer." + err.response.status)
            }
        })
    };

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
            {isLeftClick || isRightClick ? <div className="before_page_div_disabled"></div> : null}
            <div className="check_user_ip_div">
                <div className="check_user_ip_title_div">
                    <p id="change_review_title">Check User & Block User Id</p>
                    <div className="check_user_ip_search_div">
                        <form id="doctor_edit_page_search_form" onSubmit={(e) => onSubmit(e)}>
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
                                <p id="inquery_date">Date</p>
                                <p id="inquery_id">User Id</p>
                            </div>
                            <div className="check_user_index_right_div">
                                <p id="inquery_answer">Answer</p>
                                <p id="inquery_action">action</p>
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
                                                {item.answer === null ? "Yet" : "Done"}
                                            </p>
                                            <div className="inquery_action_div" onClick={() => {setInquiryIndex(index); leftAnswerClick(item.id)}}>
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
                                <p id="inquery_date">Date</p>
                                <p id="inquery_id">User Id</p>
                            </div>
                            <div className="check_user_index_right_div">
                                <p id="inquery_answer">Answer</p>
                                <p id="inquery_action">Action</p>
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
                                                {item.answer === null ? "Yet" : "Done"}
                                            </p>
                                            <div className="inquery_action_div" onClick={() => {setInquiryIndex(index); rightAnswerClick(item.userId)}}>
                                                <p id="inquery_action_data">
                                                    answer
                                                </p>
                                            </div>
                                        </div>
                                    </div> : null
                                );
                            }): null}
                            {
                                isLeftClick || isRightClick ?
                                <div className="inquiry_manage_page_more_div">
                                    <div className="inquiry_manage_page_more_top_div">
                                        <div className="inquiry_manage_more_top_container">
                                            <p id="inquiry_mage_page_more_title">User Id</p>
                                            <p id="inquiry_mage_page_more_id">{inquiryDetail.userId}</p>
                                        </div>
                                        <p id="user_detail_exit_button" onClick={() => {setIsLeftClick(false); setIsRightClick(false)}}>X</p>
                                    </div>
                                    <div className="inquiry_manage_page_more_bottom_div">
                                        <p id="inquiry_mage_page_more_title">Inquery content</p>
                                        <p id="inquiry_mage_page_more_content">{inquiryDetail.content}</p>
                                        <p id="inquiry_mage_page_more_answer_div">Answer</p>
                                        <div className="answer_input_div">
                                            <form onSubmit={(e) => e.preventDefault()}>
                                                <textarea id="admin_inuery" value={content} placeholder="문의하고 싶은 내용을 입력해주세요. 빠른시일 내에 관리자가 답변 해드립니다." onChange={(e) => setContent(e.target.value)} />
                                            </form>
                                            <div className="admin_inquiry_buttons_div">
                                                <div className="admin_inquiry_cancle_div">
                                                    <p id="admin_inquiry_cancel">cancel</p>
                                                </div>
                                                <div className="admin_inquiry_save_div" onClick={() => onSave(inquiryDetail.id)}>
                                                    <p id="admin_inquiry_save">save</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> : null
                            }
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
