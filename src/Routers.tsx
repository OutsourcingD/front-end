import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import InqueryComponent from "./inquiry/InqueryComponent";
import RecommendedReview from "./components/RecommendedReview";
import MyPage from "./my/MyPage";
import MyRecommendReview from "./my/MyReviewMore";
import MyCommentMore from "./my/MyCommentMore";
import MyInqueryMore from "./my/MyInqueryMore";
import MyPageInfo from "./my/MyPageInfo";
import BeforePage from "./before/BeforePage";
import Doctor from "./doctor/Doctor";
import Hospital from "./hospital/Hospital";
import Login from "./home/Longin";
import Test from "./Test";
import SignUp from "./home/SignUp";
import MakeReviewPage from "./review_page/MakeReviewPage";
import RecommendReviewPage from "./review_page/RecommendReviewPage";
import ReviewPage from "./review_page/ReviewPage";
import DoctorDetailPage from "./doctor/DoctorDetailPage";
import HospitalDetailPage from "./hospital/HospitalDetailPage";
import FindPage from "./home/FindPage";
import AdminPage from "./my/AdminPage";
import MakeNthReviewPage from "./review_page/MakeNthReviewPage";

function Routers () {
    return (
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/test" element={<Test />} />
                <Route path="/inquery" element={<InqueryComponent />} />
                <Route path="/recommend/review" element={<RecommendedReview />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/mypage/review/more" element={<MyRecommendReview />} />
                <Route path="/mypage/comment/more" element={<MyCommentMore />} />
                <Route path="/mypage/inquery/more" element={<MyInqueryMore />} />
                <Route path="/mypage/info" element={<MyPageInfo />} />
                <Route path="/before-after" element={<BeforePage />} />
                <Route path="/doctor" element={<Doctor />} />
                <Route path="/hospital" element={<Hospital />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/review/make" element={<MakeReviewPage checkBox={true} />} />
                <Route path="/recommend/review/all" element={<RecommendReviewPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/review/write" element={<MakeNthReviewPage />} />
                <Route path="/doctor/detail" element={<DoctorDetailPage />} />
                <Route path="/hospital/detail" element={<HospitalDetailPage />} />
                <Route path="/login/find" element={<FindPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
    );
}

export default Routers;