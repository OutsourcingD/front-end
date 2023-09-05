import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Test from "./Test";
import Review from "./components/Review";
import InqueryComponent from "./inquiry/InqueryComponent";
import RecommendedReview from "./components/RecommendedReview";

function Routers () {
    return (
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/test" element={<Test />} />
                <Route path="/review" element={<Review reviewTitle="후기 제목"
                    reviewDescription="후기 내용"
                    reviewImage="후기 이미지"
                    hospitalName="병원 이름"
                    totalRate={4.5}
                    part={["가슴", "코"]}/>} />
                <Route path="/inquery" element={<InqueryComponent />} />
                <Route path="/recommend/review" element={<RecommendedReview />} />
            </Routes>
    );
}

export default Routers;