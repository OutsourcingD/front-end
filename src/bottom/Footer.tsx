import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer_body_div">
      <div className="footer_inquery_info_div">
        <p id="inquiry_item" onClick={() => navigate("/inquiry")}>inquiry</p>
        <p id="inquiry_item">|</p>
        <p id="inquiry_item">privacy policy</p>
        <p id="inquiry_item">|</p>
        <p id="inquiry_item">terms</p>
      </div>
      <div className="footer_info_div">
        <p id="inquiry">business name: K-Surgery-forum</p>
        <p id="inquiry">Company registration number: 178-88-02857</p>
        <p id="inquiry">Company location: 30, Sadang-ro 22na-gil, Dongjak-gu, Seoul, Republic of Korea</p>
      </div>

      <div className="footer_top_div">
        <p id="inquiry">Representative: Ji Young Park</p>
        <p id="inquiry">Email: surgery-forum23@naver.com</p>
        <p id="inquiry">tel: 0000-0000</p>
      </div>
    </div>
  );
}

export default Footer;
