import React from "react";
import "./MyReviewMore.css";
import MyReviewItem from "./MyReviewItem";
import Pagination from "react-js-pagination";
import Footer from "../bottom/Footer";

function MyRecommendReview() {
  const my_review_list = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(2);
  
  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
  };

  return (
    <div className="my_recommend_review_div">
      <div className="my_recommend_review_header">
        <p id="my_recommend_review_title">나의 후기</p>
      </div>
      <div className="my_review_item_list_div">
        {my_review_list.map((item, index) => {
          return (
            <div key={index}>
              <MyReviewItem
                title="아름다운 성형외과에서 윤곽수술 받은 3개월차 후기"
                date={"2023.09.0" + index}
              />
            </div>
          );
        })}
      </div>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={totalPages * 10}
        pageRangeDisplayed={10}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
      <Footer />
    </div>
  );
}

export default MyRecommendReview;
