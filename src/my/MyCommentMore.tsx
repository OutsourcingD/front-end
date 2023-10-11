import React from "react";
import "./MyCommentMore.css";
import MyCommentItem from "./MyCommentItem";
import Pagination from "react-js-pagination";
import Footer from "../bottom/Footer";
import axios from "axios";
import { MyCommentResponseDto } from "../dto/MyCommentResponseDto";
import { useNavigate } from "react-router-dom";

function MyRecommendReview() {
    const [myCommentList, setMyCommentList] = React.useState<
        MyCommentResponseDto[]
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
            url: `${process.env.REACT_APP_SERVER_URL}/comment/my/all?pages=${
                page - 1
            }`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => {
                setMyCommentList(res.data);
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
                    navigate("/");
                }
            });
    }, [page]);

    return (
        <div className="my_recommend_review_div">
            <div className="my_recommend_review_header">
                <p id="my_recommend_review_title">나의 댓글</p>
            </div>
            <div className="my_review_item_list_div">
                {myCommentList.length !== 0 ? (
                    myCommentList.map((item, index) => {
                        return (
                            <div key={index}>
                                <MyCommentItem
                                    title={item.content}
                                    reviewId={item.reviewId}
                                />
                            </div>
                        );
                    })
                ) : (
                    <p>작성한 댓글 없음...</p>
                )}
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
