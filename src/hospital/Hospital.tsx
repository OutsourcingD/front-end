import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import "./Hospital.css";
import HospitalItem from "../components/HospitalItem";
import Pagination from "react-js-pagination";
import axios from "axios";
import { HospitalResponseDto } from "../dto/HospitalResponseDto";
import Footer from "../bottom/Footer";
import { useNavigate } from "react-router-dom";

function Hospital() {
    const [hospitalList, setHospitalList] = useState<HospitalResponseDto[]>([]);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [searchValue, setSearchValue] = React.useState(" ");
    const navigate = useNavigate();

    const handleSearch = (value: string) => {
        setSearchValue(value);
        setPage(1);
    };

    const handleSearchResult = (value: HospitalResponseDto[]) => {
        setHospitalList(value);
        setTotalPages(value[0] !== undefined ? value[0].totalPages : 1);
    };

    const getHospitalList = async () => {
        await axios({
            method: "get", // or 'post', 'put', etc.
            url: `/api/hospital/search?pages=${
                page - 1
            }&title=${searchValue}`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setHospitalList(res.data);
            setTotalPages(res.data !== undefined && res.data.length !== 0 ? res.data[0].totalPages : 1);
        }).catch((err) => {
            alert(`Contact to developer. ${err.response.status}`);
                navigate("/");      
        });
    };

    useEffect(() => {
        getHospitalList()
    }, [page]);

    return (
        <div className="hospital_div">
            <div className="hospital_container">
                <div className="hospital_page_recommend_title_div">
                    <p id="hospital_page_recommend_title">병원정보</p>
                </div>
                <div className="hospital_page_search_div">
                    <Search
                        parent={2}
                        category={0}
                        page={0}
                        onSearch={handleSearch}
                        onHospitalSearchResult={handleSearchResult}
                    />
                </div>
                <div className="hospital_item_div">
                    {hospitalList.map((hospital) => {
                        return (
                            <HospitalItem key={hospital.postId} {...hospital} />
                        );
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

export default Hospital;
