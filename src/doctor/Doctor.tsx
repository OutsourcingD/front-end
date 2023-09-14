import React from "react";
import Search from "../components/Search";
import "./Doctor.css";
import DoctorItem from "../components/DoctorItem";

function Doctor() {
    const doctor_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="doctor_div">
      <div className="recommend_title_div">
        <p id="recommend_title">병원정보</p>
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
    </div>
  );
}

export default Doctor;