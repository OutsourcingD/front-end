import React from "react";
import "./DoctorEdit.css";
import Pagination from "react-js-pagination";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";

interface HospitalEditProps {
    hospitalId: number;
    title: string;
}

interface DoctorEditProps {
    doctorId: number;
    title: string;
}

const DoctorEdit = () => {
    const [doctorItems, setDoctorItems] = React.useState<DoctorEditProps[]>([]);
    const [hospitalItems, setHospitalItems] = React.useState<HospitalEditProps[]>([]);
    const [doctorSearchValue, setDoctorSearchValue] = React.useState<string>("");
    const [hospitalSearchValue, setHospitalSearchValue] = React.useState<string>("");
    const [hospitalPage, setHospitalPage] = React.useState(1);
    const [doctorPage, setDoctorPage] = React.useState(1);
    const [hospitalTotalPages, setHospitalTotalPages] = React.useState(2);
    const [doctorTotalPages, setDoctorTotalPages] = React.useState(2);

    const handleHospitalPageChange = (page: React.SetStateAction<number>) => {
        setHospitalPage(page);
    };

    const handleDoctorPageChange = (page: React.SetStateAction<number>) => {
        setDoctorPage(page);
    }

    const getHospitals = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/hospital-info`,
            params: {
                pages: hospitalPage - 1,
                hospitalName: hospitalSearchValue,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setHospitalItems(res.data);
            setHospitalTotalPages(res.data[0].totalPages);
        });
    }

    const getDoctors = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/doctor-info`,
            params: {
                pages: doctorPage - 1,
                doctorName: doctorSearchValue,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setDoctorItems(res.data);
            setDoctorTotalPages(res.data[0].totalPages);
        });
    }

    const handleHospitalSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/hospital-info`,
            params: {
                pages: hospitalPage - 1,
                hospitalName: hospitalSearchValue,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setHospitalItems(res.data);
            setHospitalTotalPages(res.data[0].totalPages);
            setHospitalPage(1);
        });
    };

    const handleHospitalSearchButton = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/hospital-info`,
            params: {
                pages: hospitalPage - 1,
                hospitalName: hospitalSearchValue,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setHospitalItems(res.data);
            setHospitalTotalPages(res.data[0].totalPages);
            setHospitalPage(1);
        });
    }

    const handleDoctorSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/doctor-info`,
            params: {
                pages: doctorPage - 1,
                doctorName: doctorSearchValue,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setDoctorItems(res.data);
            setDoctorTotalPages(res.data[0].totalPages);
            setDoctorPage(1);
        });
    };

    const handleDoctorSearchButton = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/doctor-info`,
            params: {
                pages: doctorPage - 1,
                doctorName: doctorSearchValue,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setDoctorItems(res.data);
            setDoctorTotalPages(res.data[0].totalPages);
            setDoctorPage(1);
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
            <div className="change_review_container">
                <p id="change_review_title">Edit Hospital • Doctor Post</p>
            </div>
            <div className="doctor_edit_body_container">
                <div className="doctor_edit_body">
                    <div className="docotr_edit_title_div">
                        <p id="banner_management_item_title">Hospital Post List</p>
                        <div className="doctor_edit_page_search">
                            <form id="doctor_edit_page_search_form" onSubmit={(event) => handleHospitalSearch(event)}>
                                <input
                                    type="text"
                                    value={hospitalSearchValue}
                                    id="doctor_edit_page_search_input"
                                    placeholder="Search the Hospital Title."
                                    onChange={(e) => setHospitalSearchValue(e.target.value)}
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
                            <p id="doctor_edit_page_index_title">글제목</p>
                        </div>
                        <div className="doctor_edit_right_index_div">
                            <p id="doctor_edit_page_index_detail">기능</p>
                        </div>
                    </div>
                    <div className="doctor_items_div">
                        {hospitalItems.map((item, index) => {
                            return (
                                <>
                                    <div className="doctor_edit_item_div" key={item.hospitalId}>
                                        <div className="doctor_edit_item_left_div">
                                            <p id="doctor_page_sequence">{index + 1}</p>
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
                                            <div className="doctor_edit_item_button_div">
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
                        <p id="banner_management_item_title">Doctor Post List</p>
                        <div className="doctor_edit_page_search">
                            <form id="doctor_edit_page_search_form" onSubmit={(event) => handleDoctorSearch(event)}>
                                <input
                                    type="text"
                                    id="doctor_edit_page_search_input"
                                    placeholder="Search the Doctor Title."
                                    value={doctorSearchValue}
                                    onChange={(e) => setDoctorSearchValue(e.target.value)}
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
                                    <div className="doctor_edit_item_div" key={item.doctorId}>
                                        <div className="doctor_edit_item_left_div">
                                            <p id="doctor_page_sequence">{index + 1}</p>
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
                                            <div className="doctor_edit_item_button_div">
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
        </div>
    );
};

export default DoctorEdit;
