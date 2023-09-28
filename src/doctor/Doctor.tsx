import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import "./Doctor.css";
import DoctorItem from "../components/DoctorItem";
import Pagination from "react-js-pagination";
import axios from "axios";
import { DoctorResponseDto } from "../dto/DoctorResponseDto";
import Footer from "../bottom/Footer";

function Doctor() {
    const [doctor_list, setDoctorList] = useState<DoctorResponseDto[]>([]);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [category, setCategory] = React.useState(0);

    useEffect(() => {
        axios({
            method: "get", // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/doctor?pages=${page - 1}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setDoctorList(res.data);
            console.log(res.data);
        });
    }, [page]);

    return (
        <div className="doctor_div">
            <div className="hospital_container">
                <div className="hospital_page_recommend_title_div">
                    <p id="hospital_page_recommend_title">원장정보</p>
                </div>
                <div className="hospital_page_search_div">
                    <Search
                        category={category}
                        page={0}
                        onSearch={(value) => console.log("")}
                        onSearchResult={(value) => console.log("")}
                    />
                </div>
                <div className="hospital_item_div">
                    {doctor_list.map((doctor) => {
                        return <DoctorItem key={doctor.postId} {...doctor} />;
                    })}
                </div>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={totalPages * 10}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page) => setPage(page)}
                />
            </div>
            <Footer />
        </div>
    );
}

export default Doctor;
