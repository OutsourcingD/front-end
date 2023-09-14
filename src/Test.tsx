import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import "./Test.css";

function Test() {
  const [page, setPage] = useState(1);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
    console.log(page)
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={450}
      pageRangeDisplayed={10}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
}

export default Test;
