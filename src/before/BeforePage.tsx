import React from "react";
import "./BeforePage.css";
import Category from "../components/Category";
import Search from "../components/Search";
import BeforeItem from "../components/BeforeItem";
import Pagination from "react-js-pagination";

function BeforePage() {
    const before_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

  return (
    <div className="before_div">
      <div className="recommend_title_div">
        <p id="recommend_title">Before & After</p>
      </div>
      <Category />
      <div className="search_div">
        <Search page={0} onSearch={(value) => console.log("")} onSearchResult={() => console.log("")}/>
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

export default BeforePage;