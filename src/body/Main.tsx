import React from 'react';
import './Main.css';
import Category from '../components/Category';

function Main() {
  return (
    <div className="main">
      <div className="advertisement">
        <img src="/ad/advertise.png" alt="advertisement" style={{width: "100%"}}/>
      </div>
      <div className="mainBody">
        <Category />
      </div>
      <div className="recommend_review">
        <div className="recommend_div">
          <div className="recommend_text_div">
            <p>8월 2주차 커뮤니티 추천 후기 글</p>
            <p>이번주 가장 조회수가 많은 후기 글 보러가기</p>
          </div>
          <div style={{display: "flex", flex: 9, alignItems: "start"}}>
            <p>d</p>
          </div>
          <div style={{display: "flex", flex: 4, justifyContent: "center", alignItems: "center"}}>
            <p>djs</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;