import React from "react";
import "./MyReviewMore.css";
import MyReviewItem from "./MyReviewItem";
import Pagination from "react-js-pagination";
import Footer from "../bottom/Footer";
import axios from "axios";
import { MyReviewResponseDto } from "../dto/MyReviewResponseDto";
import { useNavigate } from "react-router-dom";

function MyRecommendReview() {
    const [myReviewList, setMyReviewList] = React.useState<
        MyReviewResponseDto[]
    >([]);
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
            url: `/api/review/my?pages=${
                page - 1
            }`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => {
                setMyReviewList(res.data);
                setTotalPages(
                    res.data[0] !== undefined ? res.data[0].totalPages : 1
                );
            })
            .catch((err) => {
                if (
                    err.response.status === 401 ||
                    err.response.status === 403
                ) {
                    alert("This is not admin ID.");
                    navigate("/login");
                } else {
                    alert(`Contact to developer. ${err.response.status}`);
                    ;
                }
            });
    }, [page]);

    return (
        <div className="my_recommend_review_div">
            <div>
                <div className="my_recommend_review_header">
                    <p id="my_recommend_review_title">My Riviews</p>
                </div>
                <div className="my_review_item_list_div">
                    {myReviewList.length !== 0 ? (
                        myReviewList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <MyReviewItem
                                        reviewId={item.reviewId}
                                        title={item.title}
                                        date={item.createdAt}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <p>no review...</p>
                    )}
                </div>
            </div>
            <div className="mycomments_bottom_div">
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
        </div>
    );
}

export default MyRecommendReview;
