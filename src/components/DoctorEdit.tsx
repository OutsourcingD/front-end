import React from "react";
import "./DoctorEdit.css";
import Pagination from "react-js-pagination";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import DoctorInfoAdd from "./DoctorInfoAdd";
import { useNavigate } from "react-router-dom";

interface HospitalEditProps {
    postId: number;
    title: string;
    type: number;
}

interface DoctorEditProps {
    postId: number;
    title: string;
    type: number;
}

const DoctorEdit = () => {
    const [doctorItems, setDoctorItems] = React.useState<DoctorEditProps[]>([]);
    const [hospitalItems, setHospitalItems] = React.useState<
        HospitalEditProps[]
    >([]);
    const [doctorSearchValue, setDoctorSearchValue] =
        React.useState<string>("");
    const [hospitalSearchValue, setHospitalSearchValue] =
        React.useState<string>("");
    const [hospitalPage, setHospitalPage] = React.useState(1);
    const [doctorPage, setDoctorPage] = React.useState(1);
    const [hospitalTotalPages, setHospitalTotalPages] = React.useState(2);
    const [doctorTotalPages, setDoctorTotalPages] = React.useState(2);
    const [isLeftClicked, setIsLeftClicked] = React.useState(false);
    const [isRightClicked, setIsRightClicked] = React.useState(false);
    const [category, setCategory] = React.useState<number>(0);
    const navigate = useNavigate();

    const handleHospitalPageChange = (page: React.SetStateAction<number>) => {
        setHospitalPage(page);
    };

    const handleDoctorPageChange = (page: React.SetStateAction<number>) => {
        setDoctorPage(page);
    };

    const getHospitals = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/admin/hospital`,
            params: {
                pages: hospitalPage - 1,
                query: hospitalSearchValue,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setHospitalItems(res.data);
            setHospitalTotalPages(res.data !== null && res.data !== undefined ? res.data[0].totalPages : 1);
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/");
            }
        });
    };

    const getDoctors = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/admin/doctor`,
            params: {
                pages: doctorPage - 1,
                query: doctorSearchValue,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setDoctorItems(res.data);
            setDoctorTotalPages(res.data !== null && res.data !== undefined ? res.data[0].totalPages : 1);
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/");
            }
        });
    };

    const handleHospitalSearch = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/admin/hospital`,
            params: {
                pages: hospitalPage - 1,
                query: hospitalSearchValue,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setHospitalItems(res.data);
            setHospitalTotalPages(res.data !== null && res.data !== undefined ? res.data[0].totalPages : 1);
            setHospitalPage(1);
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/");
            }
        });
    };

    const handleHospitalSearchButton = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/admin/hospital`,
            params: {
                pages: hospitalPage - 1,
                query: hospitalSearchValue,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setHospitalItems(res.data);
            setHospitalTotalPages(res.data !== null && res.data !== undefined ? res.data[0].totalPages : 1);
            setHospitalPage(1);
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/admin");
            }
        });
    };

    const handleDoctorSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/admin/doctor`,
            params: {
                pages: doctorPage - 1,
                query: doctorSearchValue,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then((res) => {
            setDoctorItems(res.data);
            setDoctorTotalPages(res.data !== null && res.data !== undefined ? res.data[0].totalPages : 1);
            setDoctorPage(1);
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/admin");
            }
        });
    };

    const handleDoctorSearchButton = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/admin/doctor`,
            params: {
                pages: doctorPage - 1,
                query: doctorSearchValue,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setDoctorItems(res.data);
            setDoctorTotalPages(res.data !== null && res.data !== undefined ? res.data[0].totalPages : 1);
            setDoctorPage(1);
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/admin");
            }
        });
    };

    const HospitalDeleteHandler = (index: number) => {
        axios({
            method: "delete",
            url: `${process.env.REACT_APP_SERVER_URL}/api/admin/post/delete`,
            params: {
                postId: hospitalItems[index].postId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((res) => {
                const newItems = [...hospitalItems];
                newItems.splice(index, 1);
                setHospitalItems(newItems);
            })
            .catch((err) => {
                if (err.response.status === 401 || err.response.status === 403) {
                    alert(`This is not admin ID.`);
                    navigate("/login");
                }
                else {
                    alert(`Contact to developer. ${err.response.status}`)
                    navigate("/admin");
                };
            });
    };

    const DoctorDeleteHandler = (index: number) => {
        axios({
            method: "delete",
            url: `${process.env.REACT_APP_SERVER_URL}/api/admin/post/delete`,
            params: {
                postId: doctorItems[index].postId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((res) => {
                const newItems = [...doctorItems];
                newItems.splice(index, 1);
                setDoctorItems(newItems);
            })
            .catch((err) => {
                if (err.response.status === 401 || err.response.status === 403) {
                    alert(`This is not admin ID.: ${err.response.status}`);
                    navigate("/login");
                }
                else {
                    alert(`Contact to developer. ${err.response.status}`);
                    navigate("/admin");
                }
            });
    };

    React.useEffect(() => {
        getHospitals();
    }, [hospitalPage]);

    React.useEffect(() => {
        getDoctors();
    }, [doctorPage]);

    return (
        <div className="doctor_edit_page">
            {!isLeftClicked || !isRightClicked ? (
                <div
                    className="before_page_div_disabled"
                    onClick={() => {
                        setIsLeftClicked(false);
                        setIsRightClicked(false);
                    }}
                ></div>
            ) : null}
            <div className="change_review_container">
                <p id="change_review_title">Edit Hospital • Doctor Post</p>
            </div>
            <div className="doctor_edit_body_container">
                <div className="doctor_edit_body">
                    <div className="docotr_edit_title_div">
                        <p id="banner_management_item_title">
                            Hospital Post List
                        </p>
                        <div className="doctor_edit_page_search">
                            <form
                                id="doctor_edit_page_search_form"
                                onSubmit={(event) =>
                                    handleHospitalSearch(event)
                                }
                            >
                                <input
                                    type="text"
                                    value={hospitalSearchValue}
                                    id="doctor_edit_page_search_input"
                                    placeholder="Search the Hospital Title."
                                    onChange={(e) =>
                                        setHospitalSearchValue(e.target.value)
                                    }
                                />
                            </form>
                            <img
                                onClick={() => handleHospitalSearchButton()}
                                src="/search.png"
                                alt="search"
                                id="doctor_edit_page_search_button"
                            />
                        </div>
                    </div>
                    <div className="doctor_edit_index_div">
                        <div className="doctor_edit_left_index_div">
                            <p id="doctor_edit_page_index_no">No.</p>
                            <p id="doctor_edit_page_index_title">Title</p>
                        </div>
                        <div className="doctor_edit_right_index_div">
                            <p id="doctor_edit_page_index_detail">Action</p>
                        </div>
                    </div>
                    <div className="doctor_items_div">
                        {hospitalItems.map((item, index) => {
                            return (
                                <>
                                    <div
                                        className="doctor_edit_item_div"
                                        key={item.postId}
                                    >
                                        <div className="doctor_edit_item_left_div">
                                            <p id="doctor_page_sequence">
                                                {index + 1}
                                            </p>
                                            <p id="doctor_page_item_title">
                                                {item.title}
                                            </p>
                                        </div>
                                        <div className="doctor_edit_item_right_div">
                                            <div className="doctor_edit_item_button_div">
                                                <p id="doctor_item_button_edit">
                                                    edit
                                                </p>
                                            </div>
                                            <div
                                                className="doctor_edit_item_button_div"
                                                onClick={() =>
                                                    HospitalDeleteHandler(index)
                                                }
                                            >
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
                        activePage={hospitalPage}
                        itemsCountPerPage={10}
                        totalItemsCount={hospitalTotalPages * 10}
                        pageRangeDisplayed={10}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={handleHospitalPageChange}
                    />
                </div>
                <div className="doctor_edit_body">
                    <div className="docotr_edit_title_div">
                        <p id="banner_management_item_title">
                            Doctor Post List
                        </p>
                        <div className="doctor_edit_page_search">
                            <form
                                id="doctor_edit_page_search_form"
                                onSubmit={(event) => handleDoctorSearch(event)}
                            >
                                <input
                                    type="text"
                                    id="doctor_edit_page_search_input"
                                    placeholder="Search the Doctor Title."
                                    value={doctorSearchValue}
                                    onChange={(e) =>
                                        setDoctorSearchValue(e.target.value)
                                    }
                                />
                            </form>
                            <img
                                src="/search.png"
                                alt="search"
                                id="doctor_edit_page_search_button"
                                onClick={() => handleDoctorSearchButton()}
                            />
                        </div>
                    </div>
                    <div className="doctor_edit_index_div">
                        <div className="doctor_edit_left_index_div">
                            <p id="doctor_edit_page_index_no">No.</p>
                            <p id="doctor_edit_page_index_title">Title</p>
                        </div>
                        <div className="doctor_edit_right_index_div">
                            <p id="doctor_edit_page_index_detail">Action</p>
                        </div>
                    </div>
                    <div className="doctor_items_div">
                        {doctorItems.map((item, index) => {
                            return (
                                <>
                                    <div
                                        className="doctor_edit_item_div"
                                        key={item.postId}
                                    >
                                        <div className="doctor_edit_item_left_div">
                                            <p id="doctor_page_sequence">
                                                {index + 1}
                                            </p>
                                            <p id="doctor_page_item_title">
                                                {item.title}
                                            </p>
                                        </div>
                                        <div className="doctor_edit_item_right_div">
                                            <div
                                                className="doctor_edit_item_button_div"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsRightClicked(true);
                                                }}
                                            >
                                                <p id="doctor_item_button_edit">
                                                    edit
                                                </p>
                                            </div>
                                            <div
                                                className="doctor_edit_item_button_div"
                                                onClick={() =>
                                                    DoctorDeleteHandler(index)
                                                }
                                            >
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
                        activePage={doctorPage}
                        itemsCountPerPage={10}
                        totalItemsCount={doctorTotalPages * 10}
                        pageRangeDisplayed={10}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={handleDoctorPageChange}
                    />
                </div>
            </div>
            <div className="doctor_edit_page_add_button_div">
                <p id="doctor_edit_page_add_button_text">
                    add hospital • doctor post
                </p>
                <IoMdAddCircleOutline size="20px" />
            </div>
            {!isLeftClicked || !isRightClicked ? (
                <div className="edit_doctor_div">
                    <div className="edit_doctor_page_category_div">
                        <p id="edit_doctor_page_category_title">category</p>
                        <div className="sub_doc_div">
                            <div className="sub_doc_category_div">
                                {category === 0 ? (
                                    <img
                                        src="/checkbox_pupple.png"
                                        alt=""
                                        id="edit_doctor_page_category_checkbox"
                                    />
                                ) : (
                                    <img
                                        src="/checkbox.png"
                                        alt=""
                                        id="edit_doctor_page_category_pupple_checkbox"
                                        onClick={() => setCategory(0)}
                                    />
                                )}
                            </div>
                            <p id="edit_doctor_page_category_sub_title">
                                doctor
                            </p>
                        </div>
                        <div className="sub_hos_div">
                            {category === 1 ? (
                                <img
                                    src="/checkbox_pupple.png"
                                    alt=""
                                    id="edit_doctor_page_category_checkbox"
                                />
                            ) : (
                                <img
                                    src="/checkbox.png"
                                    alt=""
                                    id="edit_doctor_page_category_pupple_checkbox"
                                    onClick={() => setCategory(1)}
                                />
                            )}
                            <p id="edit_doctor_page_category_sub_title">
                                hospital
                            </p>
                        </div>
                        <div className="sub_bef_div">
                            {category === 2 ? (
                                <img
                                    src="/checkbox_pupple.png"
                                    alt=""
                                    id="edit_doctor_page_category_checkbox"
                                />
                            ) : (
                                <img
                                    src="/checkbox.png"
                                    alt=""
                                    id="edit_doctor_page_category_pupple_checkbox"
                                    onClick={() => setCategory(2)}
                                />
                            )}
                            <p id="edit_doctor_page_category_sub_title">
                                before-after
                            </p>
                        </div>
                    </div>
                    {
                        category === 0 ? <DoctorInfoAdd /> : null
                    }
                </div>
            ) : null}
        </div>
    );
};

export default DoctorEdit;
