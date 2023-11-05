import React from "react";
import "./CheckUserIp.css";
import Pagination from "react-js-pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CheckUserIpProps {
    createdAt: string;
    userId?: string;
    location?: string;
    ipAddress?: string;
    totalPages: number;
}

const CheckUserIp = () => {
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(2);
    const [id, setUserId] = React.useState("");
    const [userIps, setUserIps] = React.useState<CheckUserIpProps[]>([]);
    const navigate = useNavigate();

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    };

    const handleUserId = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios({
            method: "get",
            url: `/api/admin/member-ip`,
            params: {
                pages: page - 1,
                userId: id,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            console.log(res.data.length);
            setUserIps(res.data);
            setTotalPages(res.data.length === 0 ? 1 : res.data[0].totalPages);
            setPage(1);
        }).catch((err) => {
            if(err.response.status === 403 || err.response.status === 401) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                ;   
            }
        });
    };

    const onClick = () => {
        axios({
            method: "get",
            url: `/api/admin/member-ip`,
            params: {
                pages: page - 1,
                userId: id,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setUserIps(res.data);
            setTotalPages(res.data.length === 0 ? 1 : res.data[0].totalPages);
            setPage(1);
        }).catch((err) => {
            if(err.response.status === 403 || err.response.status === 401) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                ;   
            }
        });
    };

    React.useEffect(() => {
        axios({
            method: "get",
            url: `/api/admin/member-ip`,
            params: {
                pages: page - 1,
                userId: id,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setUserIps(res.data);
            setTotalPages(res.data.length === 0 ? 1 : res.data[0].totalPages);
        }).catch((err) => {
            if(err.response.status === 403 || err.response.status === 401) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                ;   
            }
        });
    }, [page]);

    return (
        <div className="check_user_ip_page">
            <div className="check_user_ip_div">
                <div className="check_user_ip_title_div">
                    <p id="change_review_title">Check User Ip</p>
                    <div className="check_user_ip_search_div">
                        <form
                            id="doctor_edit_page_search_form"
                            onSubmit={handleUserId}
                        >
                            <input
                                type="text"
                                id="doctor_edit_page_search_input"
                                placeholder="Search the user email."
                                value={id}
                                onChange={(e) => setUserId(e.target.value)}
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
                <div className="check_user_body">
                    <div className="check_user_left_div">
                        <div className="check_user_ip_index_div">
                            <p id="access_date">Access Date</p>
                            <p id="user_ip">User IP</p>
                            <p id="check_user_ip_id">User Id</p>
                            <p id="check_user_ip_location">Location</p>
                        </div>
                        <div className="check_user_ip_items_div">
                            {userIps.length !== 0
                                ? userIps.map((item, index) => {
                                      return index < 10 ? (
                                          <div className="check_user_ip_item_div">
                                              <p id="access_date_data">
                                                  {item.createdAt}
                                              </p>
                                              <p id="user_ip_data">
                                                  {item.ipAddress}
                                              </p>
                                              <p id="check_user_ip_id_data">
                                                  {item.userId}
                                              </p>
                                              <p id="check_user_ip_location_data">
                                                  {item.location}
                                              </p>
                                          </div>
                                      ) : null;
                                  })
                                : null}
                        </div>
                    </div>
                    <div className="check_user_left_div">
                        <div className="check_user_ip_index_div">
                            <p id="access_date">Access Date</p>
                            <p id="user_ip">User IP</p>
                            <p id="check_user_ip_id">User Id</p>
                            <p id="check_user_ip_location">Location</p>
                        </div>
                        <div className="check_user_ip_items_div">
                            {userIps.length < 10
                                ? userIps.map((item, index) => {
                                      return index < 20 && 10 <= index ? (
                                          <div className="check_user_ip_item_div">
                                              <p id="access_date_data">
                                                  {item.createdAt}
                                              </p>
                                              <p id="user_ip_data">
                                                  {item.ipAddress}
                                              </p>
                                              <p id="check_user_ip_id_data">
                                                  {item.userId}
                                              </p>
                                              <p id="check_user_ip_location_data">
                                                  {item.location}
                                              </p>
                                          </div>
                                      ) : null;
                                  })
                                : null}
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

export default CheckUserIp;
