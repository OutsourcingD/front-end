import React from "react";
import "./BeforePage.css";
import Category from "../components/Category";
import Search from "../components/Search";
import BeforeItem from "../components/BeforeItem";
import Pagination from "react-js-pagination";
import BeforeCategory from "../components/BeforeCategory";

function BeforePage() {
    const before_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

    return (
        <div className="doctor_div">
            <div className="hospital_container">
                <div className="hospital_page_recommend_title_div">
                    <p id="hospital_page_recommend_title">Before & After</p>
                </div>
                <div className="before_category_div">
                    <BeforeCategory />
                </div>
                <div className="hospital_page_search_div">
                    <Search
                        page={0}
                        onSearch={(value) => console.log("")}
                        onSearchResult={() => console.log("")}
                    />
                </div>
                <div className="hospital_item_div">
                    {before_list.map((item, index) => {
                        return <BeforeItem />;
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
        </div>
    );
}

export default BeforePage;
