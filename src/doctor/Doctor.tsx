import React from "react";
import Search from "../components/Search";
import "./Doctor.css";
import DoctorItem from "../components/DoctorItem";
import Pagination from "react-js-pagination";

function Doctor() {
    const doctor_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

  return (
    <div className="doctor_div">
      <div className="recommend_title_div">
        <p id="recommend_title">원장정보</p>
      </div>
      <div className="search_div">
        <Search page={0} onSearch={(value) => console.log("")} onSearchResult={() => console.log("")}/>
      </div>
      <div className="doctor_item_div">
        {
            doctor_list.map((item) => {
                return (
                   <DoctorItem key={item.toString()} />
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

export default Doctor;