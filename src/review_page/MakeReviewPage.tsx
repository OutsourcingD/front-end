import React, { useEffect } from "react";
import "./MakeReviewPage.css";
import MakeReviewItem from "./MakeReviewItem";
import MakeBeforeItem from "./MakeBeforeItem";
import Wysiwyg from "../components/ContentInput";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftjsToHtml from "draftjs-to-html";

interface ReviewProps {
    checkBox: boolean;
}

const MakeReviewPage = ({ checkBox }: ReviewProps) => {
    const [isReview, setIsReview] = React.useState<boolean>(false);

    const handleReview = (review: boolean) => {
        setIsReview(review);
    };
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );
    const [htmlString, setHtmlString] = React.useState("");

    const updateTextDescription = async (state: EditorState) => {
        await setEditorState(state);
        const html = draftjsToHtml(
            convertToRaw(editorState.getCurrentContent())
        );
        setHtmlString(html);
    };

    const uploadCallback = () => {
        console.log("이미지 업로드");
    };

    return (
        <div className="review_page_div">
            <div className="make_review_page_wrapper">
                {/* header */}
                <div className="make_review_title_div">
                    <p id="make_review_title">후기 작성</p>
                    <div className="apply_review_button_div">
                        <p id="apply_review_text">apply</p>
                    </div>
                </div>
                {/* category */}
                <div className="make_review_category_div">
                    <p id="make_review_category_text">카테고리</p>
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
                        <p id="checkbox_label">리뷰</p>
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
                        <p id="checkbox_label">전후 사진 리뷰</p>
                    </div>
                </div>
                {!isReview ? (
                    <>
                        <MakeReviewItem />
                        <Editor
                            placeholder="게시글을 작성해주세요"
                            editorState={editorState}
                            onEditorStateChange={updateTextDescription}
                            toolbar={{
                                image: { uploadCallback: uploadCallback },
                            }}
                            localization={{ locale: "ko" }}
                            editorStyle={{
                                height: "400px",
                                width: "100%",
                                border: "3px solid lightgray",
                                padding: "20px",
                                position: "relative",
                                
                            }}
                            wrapperStyle={{}}
                        />
                    </>
                ) : (
                    <MakeBeforeItem />
                )}
            </div>
        </div>
    );
};

export default MakeReviewPage;
