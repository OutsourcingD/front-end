import React from "react";
import Search from "../components/Search";
import "./Hospital.css";
import HospitalItem from "../components/HospitalItem";

function Hospital() {
    const hospital_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="hospital_div">
      <div className="recommend_title_div">
        <p id="recommend_title">병원정보</p>
      </div>
      <div className="search_div">
        <Search />
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
    </div>
  );
}

export default Hospital;