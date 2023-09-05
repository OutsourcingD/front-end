import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Review from "./components/Review";
import InqueryComponent from "./inquiry/InqueryComponent";
import RecommendedReview from "./components/RecommendedReview";
import MyPage from "./my/MyPage";
import MyReviewItem from "./my/MyReviewItem";

function Routers () {
    return (
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/test" element={<MyReviewItem title="아름다운 성형외과에서 윤곽수술 받은 3개월차 후기" date="2023-09-03" />} />
                <Route path="/review" element={<Review reviewTitle="후기 제목"
                    reviewDescription="후기 내용"
                    reviewImage="후기 이미지"
                    hospitalName="병원 이름"
                    totalRate={4.5}
                    part={["가슴", "코"]}/>} />
                <Route path="/inquery" element={<InqueryComponent />} />
                <Route path="/recommend/review" element={<RecommendedReview />} />
                <Route path="/mypage" element={<MyPage />} />
            </Routes>
    );
}

export default Routers;