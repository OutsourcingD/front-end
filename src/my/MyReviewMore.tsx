import React from "react";
import "./MyReviewMore.css";
import MyReviewItem from "./MyReviewItem";
import Pagination from "react-js-pagination";
import Footer from "../bottom/Footer";
import axios from "axios";
import { MyReviewResponseDto } from "../dto/MyReviewResponseDto";
import { useNavigate } from "react-router-dom";

function MyRecommendReview() {
  const [myReviewList, setMyReviewList] = React.useState<MyReviewResponseDto[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(2);
  const navigate = useNavigate();
  
  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPage(page);
  };

  React.useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}/review/my?pages=${page - 1}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      setMyReviewList(res.data);
      setTotalPages(res.data[0] !== undefined ? res.data[0].totalPages : 1);
    });
  }, [page]);

  const handleReview = (id: number) => {
    navigate(`/review/${id}`);
  };

  return (
    <div className="my_recommend_review_div" >
      <div className="my_recommend_review_header">
        <p id="my_recommend_review_title">나의 후기</p>
      </div>
      <div className="my_review_item_list_div">
        {myReviewList.length !== 0 ? myReviewList.map((item, index) => {
          return (
            <div key={index}>
              <MyReviewItem
                title={item.title}
                date={item.createdAt}
              />
            </div>
          );
        }): <p>작성한 리뷰 없음...</p>}
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
