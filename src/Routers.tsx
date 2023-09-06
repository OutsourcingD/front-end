import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Review from "./components/Review";
import InqueryComponent from "./inquiry/InqueryComponent";
import RecommendedReview from "./components/RecommendedReview";
import MyPage from "./my/MyPage";
import MyRecommendReview from "./my/MyReviewMore";
import MyCommentMore from "./my/MyCommentMore";
import MyInqueryMore from "./my/MyInqueryMore";
import MyPageInfo from "./my/MyPageInfo";
import BeforePage from "./before/BeforePage";
import Doctor from "./doctor/Doctor";

function Routers () {
    return (
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/test" element={<img src="/man.png" alt="man" />} />
                <Route path="/review" element={
                    <Review reviewTitle="후기 제목"
                        reviewDescription="후기 내용"
                        reviewImage="후기 이미지"
                        hospitalName="병원 이름"
                        totalRate={4.5}
                        part={["가슴", "코"]}/>
                    }/>
                <Route path="/inquery" element={<InqueryComponent />} />
                <Route path="/recommend/review" element={<RecommendedReview />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/mypage/review/more" element={<MyRecommendReview />} />
                <Route path="/mypage/comment/more" element={<MyCommentMore />} />
                <Route path="/mypage/inquery/more" element={<MyInqueryMore />} />
                <Route path="/mypage/info" element={<MyPageInfo />} />
                <Route path="/before-after" element={<BeforePage />} />
                <Route path="/doctor" element={<Doctor />} />
            </Routes>
    );
}

export default Routers;