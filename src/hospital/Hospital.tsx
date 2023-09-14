import React from "react";
import Search from "../components/Search";
import "./Hospital.css";
import HospitalItem from "../components/HospitalItem";
import Pagination from "react-js-pagination";

function Hospital() {
    const hospital_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

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
            hospital_list.map((item) => {
                return (
                   <HospitalItem key={item.toString()} />
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