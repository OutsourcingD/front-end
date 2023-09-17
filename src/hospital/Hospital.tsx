import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import "./Hospital.css";
import HospitalItem from "../components/HospitalItem";
import Pagination from "react-js-pagination";
import axios from "axios";
import { HospitalResponseDto } from "../dto/HospitalResponseDto";

function Hospital() {
    const [hospitalList, setHospitalList] = useState<HospitalResponseDto[]>([]);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [isSearch, setIsSearch] = React.useState(false); // 검색 여부 [true: 검색, false: 검색x]

    const getHospitalList = async () => {
      await axios({
        method: 'get', // or 'post', 'put', etc.
        url: `${process.env.REACT_APP_SERVER_URL}/hospital?pages=${page - 1}`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
        }
      }).then((res) => {
        console.log(res.data)
        setHospitalList(res.data);
        setTotalPages(res.data[0].totalPages);
      });
    };

    useEffect(() => {
      !isSearch ? getHospitalList() : console.log("검색x");
    }, [page]);

    useEffect(() => {
      console.log(hospitalList)
    }, [hospitalList]);

  return (
    <div className="hospital_div">
      <div className="recommend_title_div">
        <p id="recommend_title">병원정보</p>
      </div>
      <div className="search_div">
        <Search page={0} onSearch={(value) => console.log("")} onSearchResult={() => console.log("")}/>
      </div>
      <div className="hospital_item_div">
        {
            hospitalList.map((hospital) => {
                return (
                   <HospitalItem 
                   key={hospital.postId}
                    {...hospital}
                  />
                )
            })
        }
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
  );
}

export default Hospital;