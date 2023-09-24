import React from "react";
import "./ChangeReview.css";

const ChangeReview = () => {
    const [sort, setSort] = React.useState(0);
    const [isSubmit, setIsSubmit] = React.useState<boolean>(true);

    return (
        <div className="change_review_page_div">
            <div className="change_review_container">
                <p id="change_review_title">추천 후기 정렬 변경</p>
            </div>
            <div className="change_review_button_box">
                <p id="change_review_button_sub_ttile">정렬방식</p>
                <img src={sort !== 0 ? "/checkbox.png" : "/checkbox_pupple.png"} alt="" id="change_review_page_check_box" onClick={() => setSort(0)}/>
                <p id="change_review_page_lable">조회수순</p>
                <img src={sort !== 1 ? "/checkbox.png" : "/checkbox_pupple.png"} alt="" id="change_review_page_check_box" onClick={() => setSort(1)}/>
                <p id="change_review_page_lable">좋아요수순</p>
                <img src={sort !== 2 ? "/checkbox.png" : "/checkbox_pupple.png"} alt="" id="change_review_page_check_box" onClick={() => setSort(2)}/>
                <p id="change_review_page_lable">댓글 많은 순</p>
                <div className={isSubmit ? "review_page_submit_button_div" : "review_page_submit_button_active_div"} onClick={() => setIsSubmit(!isSubmit)}>
                    <p id={isSubmit ? "review_page_submit_button_text" : "review_page_submit_button_active_text"}>등록</p>
                </div>
            </div>
        </div>
    );
};

export default ChangeReview;