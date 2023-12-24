import React from "react";
import "./MakeReviewPage.css";
import MakeReviewItem from "./MakeReviewItem";
import MakeBeforeItem from "./MakeBeforeItem";
import Wysiwyg from "../components/ContentInput";
import Footer from "../bottom/Footer";

interface ReviewProps {
    checkBox: boolean;
}

const MakeReviewPage = () => {
    const [isReview, setIsReview] = React.useState<boolean>(false);

    const handleReview = (review: boolean) => {
        setIsReview(review);
    };
    const [content, setContent] = React.useState<string>("");

    return (
        <div className="review_page_div">
            <div className="make_review_page_wrapper">
                {/* header */}
                <div className="make_review_title_div">
                    <p id="make_review_title">Make Review</p>
                    <div className="apply_review_button_div">
                        <p id="apply_review_text">apply</p>
                    </div>
                </div>
                {/* category */}
                <div className="make_review_category_div">
                    <p id="make_review_category_text">Category</p>
                    <div className="check_box">
                        <div className="checkbox_container">
                            {isReview ? (
                                <img
                                    src="/checkbox.png"
                                    alt=""
                                    id="checkbox"
                                    onClick={() => handleReview(!isReview)}
                                />
                            ) : (
                                <img
                                    src="/checkbox_pupple.png"
                                    alt=""
                                    id="checkbox"
                                />
                            )}
                        </div>
                        <p id="checkbox_label">Review</p>
                    </div>
                    <div className="check_box">
                        <div className="before_checkbox_container">
                            {!isReview ? (
                                <img
                                    src="/checkbox.png"
                                    alt=""
                                    id="checkbox"
                                    onClick={() => handleReview(!isReview)}
                                />
                            ) : (
                                <img
                                    src="/checkbox_pupple.png"
                                    alt=""
                                    id="checkbox_pupple"
                                />
                            )}
                        </div>
                        <p id="checkbox_label">Before & After</p>
                    </div>
                </div>
                {!isReview ? (
                    <>
                        <MakeReviewItem />
                        <div style={{width: "705px"}}>
                            <Wysiwyg setContent={setContent} />
                        </div>
                    </>
                ) : (
                    <MakeBeforeItem />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MakeReviewPage;
