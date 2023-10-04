import React from "react";
import "./ChangeReview.css";
import axios from "axios";

const ChangeReview = () => {
  const [sort, setSort] = React.useState(0);
  const [defaultSort, setDefaultSort] = React.useState<number>(0);
  const [isSubmit, setIsSubmit] = React.useState<boolean>(true);

  React.useEffect(() => {
    axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER_URL}/admin/review/order`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    }).then((res) => {
        setDefaultSort(res.data.recommendReview);
        setSort(res.data.recommendReview);
    });
  }, []);

  React.useEffect(() => {
    defaultSort === sort ? setIsSubmit(false) : setIsSubmit(true);
  }, [sort]);

  const handleSubmit = () => {
    if(isSubmit) {
        axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_URL}/admin/review/order`,
            data: {
                recommendReview: sort,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            console.log(res.data)
        });
    }
  }

  return (
    <div className="change_review_page_div">
      <div className="change_review_container">
        <p id="change_review_title">추천 후기 정렬 변경</p>
      </div>
      <div className="change_review_button_box">
        <div style={{display: "flex", flexDirection: "row"}}>
          <p id="change_review_button_sub_ttile">정렬방식</p>
          <img
            src={sort !== 0 ? "/checkbox.png" : "/checkbox_pupple.png"}
            alt=""
            id="change_review_page_check_box"
            onClick={() => setSort(0)}
          />
          <p id="change_review_page_lable">조회수순</p>
          <img
            src={sort !== 1 ? "/checkbox.png" : "/checkbox_pupple.png"}
            alt=""
            id="change_review_page_check_box"
            onClick={() => setSort(1)}
          />
          <p id="change_review_page_lable">좋아요수순</p>
          <img
            src={sort !== 2 ? "/checkbox.png" : "/checkbox_pupple.png"}
            alt=""
            id="change_review_page_check_box"
            onClick={() => setSort(2)}
          />
          <p id="change_review_page_lable">댓글 많은 순</p>
        </div>
        <div
          className={
            !isSubmit
              ? "review_page_submit_button_div"
              : "review_page_submit_button_active_div"
          }
          onClick={handleSubmit}
        >
          <p
            id={
              !isSubmit
                ? "review_page_submit_button_text"
                : "review_page_submit_button_active_text"
            }
          >
            등록
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangeReview;
