import React from "react";
import Wysiwyg from "../components/ContentInput";
import "./MakeNthReviewPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../bottom/Footer";

function MakeNthReviewPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [content, setContent] = React.useState<string>("");
    const navigate = useNavigate();

    const onClick = () => {
        axios({
            method: "post",
            url: `/api/review/child/add`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            data: {
                content: content,
                reviewId: queryParams.get("reviewId")
            }
        }).then((res) => {
            alert("Review upload complete.");
            navigate("/review?reviewId=" + queryParams.get("reviewId"));
        }).catch((err) => {
            alert(`Contact to developer. ${err.response.status}`);
        });
    };

    return (
        <div className="nth_review_write_page_div">
            <div className="nth_review_write_page_wrapper">
                <div className="nth_review_write_page_title_div">
                    <p id="nth_review_write_page_title">Make Nth Review</p>
                    <div className="nth_review_write_page_button_div" onClick={onClick}>
                        <p id="nth_review_write_page_button">Submit</p>
                    </div>
                </div>
                <div className="nth_review_write_page_wysiwyg_div">
                    <Wysiwyg setContent={setContent}/>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MakeNthReviewPage;