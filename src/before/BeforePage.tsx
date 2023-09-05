import React from "react";
import "./BeforePage.css";
import Category from "../components/Category";
import Search from "../components/Search";
import BeforeItem from "../components/BeforeItem";

function BeforePage() {
    const before_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="before_div">
      <div className="recommend_title_div">
        <p id="recommend_title">Before & After</p>
      </div>
      <Category />
      <div className="search_div">
        <Search />
      </div>
      <div className="before_item_div">
        {
            before_list.map((item, index) => {
                return (
                   <BeforeItem />
                )
            })
        }
      </div>
    </div>
  );
}

export default BeforePage;