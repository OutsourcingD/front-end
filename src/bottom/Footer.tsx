import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer_body_div">
      <div className="footer_inquery_info_div">
        <p id="inquiry_item" onClick={() => navigate("/inquery")}>문의하기</p>
        <p id="inquiry_item">|</p>
        <p id="inquiry_item">개인정보처리방침</p>
        <p id="inquiry_item">|</p>
        <p id="inquiry_item">이용약관</p>
      </div>
      <div className="footer_info_div">
        <p id="inquiry">상호명: K-Surgery-forum</p>
        <p id="inquiry">사업자 등록번호: 178-88-02857</p>
        <p id="inquiry">사업장 소재지: 서울시동작구 사당로22나길 30, 1층</p>
      </div>

      <div className="footer_top_div">
        <p id="inquiry">대표자: 박지영</p>
        <p id="inquiry">Email: surgery-forum23@naver.com</p>
        <p id="inquiry">전화번호: 0000-0000</p>
      </div>
    </div>
  );
}

export default Footer;
