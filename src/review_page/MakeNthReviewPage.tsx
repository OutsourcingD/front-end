import React, { useEffect } from "react";
import Wysiwyg from "../components/ContentInput";
import "./MakeNthReviewPage.css";
import { useLocation } from "react-router-dom";

function MakeNthReviewPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    useEffect(() => {
        console.log(queryParams.get("reviewId"));
    }, []);

    return (
        <div className="nth_review_write_page_div">
            <div className="nth_review_write_page_wrapper">
                <div className="nth_review_write_page_title_div">
                    <p id="nth_review_write_page_title">후기 작성</p>
                    <div className="nth_review_write_page_button_div">
                        <p id="nth_review_write_page_button">submit</p>
                    </div>
                </div>
                <Wysiwyg />
            </div>
        </div>
    );
}

export default MakeNthReviewPage;