import React, { useEffect } from "react";
import Category from "../components/Category";
import Search from "../components/Search";
import Pagination from "react-js-pagination";
import "./RecommendReviewPage.css";
import { ReviewResponseDto } from "../dto/ReviewDto";
import ReviewItem from "../components/ReviewItem";
import axios from "axios";

function RecommendReviewPage() {
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [recommendReviewItems, setRecommendReviewItems] = React.useState<
    ReviewResponseDto[]
  >([]);
  const [isSearch, setIsSearch] = React.useState(false); // 검색 여부 [true: 검색, false: 검색x]
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setIsSearch(true);
    setPage(1);
  };

  const handleSearchResult = (value: ReviewResponseDto[]) => {
    setRecommendReviewItems(value);
    setTotalPages(value[0].totalPages);
  };

  const getRecommendReviewList = async () => {
    await axios({
        method: "get", // or 'post', 'put', etc.
        url: `${process.env.REACT_APP_SERVER_URL}/review/recommendation/all?pages=${page - 1}`,
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
        }).then((res) => {
        setRecommendReviewItems(res.data);
        setTotalPages(res.data[0].totalPages);
        });
    }

  useEffect(() => {
    !isSearch ? getRecommendReviewList() : alert("검색x");
  },[page]);

  return (
    <div className="recommend_all_div">
      <div className="recommend_title_div">
        <p id="recommend_title">8월 2주차 커뮤니티 추천 후기글</p>
        <div className="hot_div">
          <img id="hot_image" src="/hot.png" alt="추천 후기" />
        </div>
      </div>
      <Category />
      <div className="search_div">
        <Search page={page} onSearch={handleSearch} onSearchResult={handleSearchResult}/>
      </div>
      <div className="review_list_div">
        {recommendReviewItems.map((review, index) => {
          return (
            <div
              key={"des" + index}
              className="review_item_div"
              onClick={() => console.log(review.reviewId)}
            >
              <ReviewItem
                key={review.reviewId}
                commentCount={review.commentCount}
                createdAt={review.createdAt}
                doctorName={review.doctorName}
                hospitalName={review.hospitalName}
                part={review.part}
                profile={review.profile}
                reviewId={review.reviewId}
                title={review.title}
                viewCount={review.viewCount}
                likeCount={review.likeCount}
                nickname={review.nickname}
                totalPages={review.totalPages}
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
        onChange={(page) => setPage(page)}
      />
    </div>
  );
}

export default RecommendReviewPage;
