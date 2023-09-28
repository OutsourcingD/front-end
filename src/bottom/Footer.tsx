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
        <p id="inquiry">사업자 등록번호: 000-00-00000</p>
        <p id="inquiry">사업장 소재지: 서울시 강남구 OO동 OO-OO</p>
      </div>

      <div className="footer_top_div">
        <p id="inquiry">대표자: 김철수</p>
        <p id="inquiry">Email: ksurgeryforum@gmail.com</p>
        <p id="inquiry">전화번호: 0000-0000</p>
      </div>
    </div>
  );
}

export default Footer;
