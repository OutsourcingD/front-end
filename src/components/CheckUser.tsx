import React from "react";
import "./CheckUser.css";
import Pagination from "react-js-pagination";
import axios from "axios";
import { UserDetailDto } from "../dto/UserDetailDto";

interface CheckUserIpProps {
    userId: string;
    isBanned: boolean;
}

const CheckUser = () => {
    const [page, setPage] = React.useState(1);
    const [id, setId] = React.useState("");
    const [items, setItems] = React.useState<CheckUserIpProps[]>([]);
    const [totalPages, setTotalPages] = React.useState(2);
    const [isLeftClick, setIsLeftClick] = React.useState(false);
    const [isRightClick, setIsRightClick] = React.useState(false);
    const [detail, setDetail] = React.useState<UserDetailDto>({} as UserDetailDto);

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
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
            setItems(res.data);
            setTotalPages(res.data.length === 0 ? 1 : res.data[0].totalPages);
            setPage(1);
        });
    };

    const searchClick = () => {
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
            setItems(res.data);
            setTotalPages(res.data.length === 0 ? 1 : res.data[0].totalPages);
            setPage(1);
        });
    };

    const handleBlock = (index: number) => {
        axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/member/ban`,
            data: {
                userId: items[index].userId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            if (res.status === 200) {
                const newItems = [...items]; // 기존 아이템들의 복사본을 만듭니다.
                newItems[index].isBanned = res.data.isBanned; // 복사본의 특정 요소만 업데이트합니다.
                setItems(newItems); // 그리고 복사본으로 상태를 업데이트합니다.
            } else if(res.status === 403 || res.status === 401) {
                alert("This is not admin ID.");
            }
            else {
                alert("block fail");
            }
        });
    };

    const onLeftClick = (useId: string) => {
        setIsLeftClick(true);
        
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/member/detail`,
            params: {
                userId: useId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setDetail(res.data);
            console.log(res.data)
        }).catch((err) => {
            if(err.response.status === 403 || err.response.status === 401) {
                alert("This is not admin ID.");
            }
            else {
                alert("Contact to developer.");
            }
        })
    }

    const onRightClick = (useId: string) => {
        setIsLeftClick(true);
        
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/member/detail`,
            params: {
                userId: useId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setDetail(res.data);
            console.log(res.data)
        }).catch((err) => {
            if(err.response.status === 403 || err.response.status === 401) {
                alert("This is not admin ID.");
            }
            else {
                alert("Contact to developer.");
            }
        })
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
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setItems(res.data);
            setTotalPages(res.data.length === 0 ? 1 : res.data[0].totalPages);
        });
    }, [page]);

    return (
        <div className="check_user_ip_page">
            {isLeftClick || isRightClick ? <div className="before_page_div_disabled"></div> : null}
            <div className="check_user_ip_div">
                <div className="check_user_ip_title_div">
                    <p id="change_review_title">Check User & Block User Id</p>
                    <div className="check_user_ip_search_div">
                        <form
                            id="doctor_edit_page_search_form"
                            onSubmit={handleSearch}
                        >
                            <input
                                type="text"
                                id="doctor_edit_page_search_input"
                                placeholder="Search the Post title."
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </form>
                        <img
                            src="/search.png"
                            alt="search"
                            id="doctor_edit_page_search_button"
                            onClick={searchClick}
                        />
                    </div>
                </div>
            </div>
            <div className="check_user_ip_body_div">
                <div className="check_user_body">
                    <div className="check_user_left_div">
                        <div className="check_user_index_div">
                            <p id="check_user_id">User Id</p>
                            <p id="check_user_location">Blocking status</p>
                        </div>
                        <div className="check_user_ip_items_div">
                            {items.length < 10 && items.length !== 0
                                ? items.map((item, index) => {
                                      return (
                                          <div
                                              className="check_user_item_div"
                                              key={index}
                                              onClick={() => onLeftClick(item.userId)}
                                          >
                                              <p id="check_user_page_id">
                                                  {item.userId}
                                              </p>
                                              <div className="block_button_div" onClick={(e) => {e.stopPropagation(); handleBlock(index)}}>
                                                  <p id={item.isBanned ? "block_button_ban_text" : "block_button_text"}>
                                                      {item.isBanned ? "no ban" : "ban"}
                                                  </p>
                                              </div>
                                          </div>
                                      );
                                  })
                                : null}
                        </div>
                        {
                            isLeftClick ?
                                <div className="user_detail_div">
                                    <div className="user_detail_left_div">
                                        <div className="user_detail_top_left_div">
                                            <div className="user_detail_top_left_info_div">
                                                <div className="user_detail_email_div">
                                                    <p id="user_detail_email">user id</p>
                                                    <p id="user_detail_email_data">{detail.userId}</p>
                                                </div>
                                                <div className="user_detail_email_div">
                                                    <p id="user_detail_email">name</p>
                                                    <p id="user_detail_email_data">{detail.name}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p id="user_detail_exit_button" onClick={() => {setIsLeftClick(false); setIsRightClick(false)}}>X</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user_detail_right_div">
                                        <div className="user_detail_top_left_password_div">
                                            <div className="user_detail_email_div">
                                                <p id="user_detail_email">password</p>
                                                <p id="user_detail_email_data">{detail ? detail.password : "error"}</p>
                                            </div>
                                            <div className="user_detail_email_div">
                                                <p id="user_detail_email">phone</p>
                                                <p id="user_detail_email_data">{detail.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <div className="user_detail_top_left_info_div">
                                            <div className="user_detail_email_div">
                                                <p id="user_detail_email">nickname</p>
                                                <p id="user_detail_email_data">{detail.nickname}</p>
                                            </div>
                                            <div className="user_detail_email_div">
                                                <p id="user_detail_email">gender</p>
                                                <p id="user_detail_email_data">{detail.gender ? "male" : !detail.gender ? "female" : null}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            : null
                        }
                    </div>
                    <div className="check_user_left_div">
                        <div className="check_user_index_div">
                            <p id="check_user_id">User Id</p>
                            <p id="check_user_location">Blocking status</p>
                        </div>
                        <div className="check_user_ip_items_div">
                            {items.length >= 10 && items.length < 20 && items.length !== 0
                                ? items.map((item, index) => {
                                      return (
                                          <div
                                              className="check_user_item_div"
                                              key={index}
                                              onClick={() => onRightClick(item.userId)}
                                          >
                                              <p id="check_user_page_id">
                                                  {item.userId}
                                              </p>
                                              <div className="block_button_div" onClick={(e) => {e.stopPropagation(); handleBlock(index)}}>
                                                <p id={item.isBanned ? "block_button_ban_text" : "block_button_text"}>
                                                      {item.isBanned ? "no ban" : "ban"}
                                                  </p>
                                              </div>
                                          </div>
                                      );
                                  })
                                : null}
                        </div>
                        {
                            isLeftClick ?
                                <div className="user_detail_div">
                                    <div className="user_detail_left_div">
                                        <div className="user_detail_top_left_div">
                                            <div className="user_detail_top_left_info_div">
                                                <div className="user_detail_email_div">
                                                    <p id="user_detail_email">user id</p>
                                                    <p id="user_detail_email_data">{detail.userId}</p>
                                                </div>
                                                <div className="user_detail_email_div">
                                                    <p id="user_detail_email">name</p>
                                                    <p id="user_detail_email_data">{detail.name === null ? "N/A" : detail.name}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p id="user_detail_exit_button" onClick={() => {setIsLeftClick(false); setIsRightClick(false)}}>X</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user_detail_right_div">
                                        <div className="user_detail_top_left_password_div">
                                            <div className="user_detail_email_div">
                                                <p id="user_detail_email">password</p>
                                                <p id="user_detail_email_data">{detail.password ? detail.password : "error"}</p>
                                            </div>
                                            <div className="user_detail_email_div">
                                                <p id="user_detail_email">phone</p>
                                                <p id="user_detail_email_data">{detail.phoneNumber === null ? "N/A" : detail.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <div className="user_detail_top_left_info_div">
                                            <div className="user_detail_email_div">
                                                <p id="user_detail_email">nickname</p>
                                                <p id="user_detail_email_data">{detail.nickname}</p>
                                            </div>
                                            <div className="user_detail_email_div">
                                                <p id="user_detail_email">gender</p>
                                                <p id="user_detail_email_data">{detail.gender === undefined ? "N/A" : detail.gender ===  "true" ? "male" : "female"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            : null
                        }
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

export default CheckUser;
