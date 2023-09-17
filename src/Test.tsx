import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import "./Test.css";
import Wysiwyg from "./components/Wysiwyg";
import { useNavigate } from "react-router-dom";

function Test() {
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(1235);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
    console.log(page)
  };

  const navigate = useNavigate();

  return (
    <>
    <button onClick={() => navigate('/review?reviewId=' + item)}>페이지</button>
    <Wysiwyg />
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={450}
      pageRangeDisplayed={10}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
    </>
  );
}

export default Test;
