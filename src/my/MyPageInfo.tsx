import React from "react";
import "./MyPageInfo.css";

function MyPageInfo() {
  return (
    <div className="mypage_info_div">
      {/* 이름 */}
      <div className="mypage_info_name_div">
        <p id="mypage_name">김철수</p>
      </div>
      {/* 프로필 사진 */}
      <div className="mypage_info_profile_div">
        <img id="profile_img" src="/profile_info.png" alt="profile" />
      </div>
      <div className="mypage_info_body">
        <div className="my_info_sub_title_div">
          <p id="my_info_sub_title">닉네임</p>
          <div className="nickname_div">
            <form id="form_nickname">
              <input
                id="input_tag"
                type="text"
                placeholder="닉네임을 입력해주세요."
              />
            </form>
            <div className="check_nickname">
                <p id="check_nickname">중복확인</p>
            </div>
          </div>
        </div>
        <div className="my_info_sub_title_div">
          <p id="my_info_sub_title">이름</p>
          <form id="form_tag">
            <input
              id="input_tag"
              type="text"
              placeholder="이름을 입력해주세요."
            />
          </form>
        </div>
        <div className="my_info_sub_title_div">
          <p id="my_info_sub_title">이메일</p>
          <form id="form_tag">
            <input
              id="input_tag"
              type="email"
              placeholder="이메일을 입력해주세요."
            />
          </form>
        </div>
        <div className="my_info_sub_title_div">
          <p id="my_info_sub_title">새 비밀번호</p>
          <form id="form_tag">
            <input
              id="input_tag"
              type="text"
              placeholder="8 ~ 16글자 사이의 비밀번호를 입력해주세요."
            />
          </form>
        </div>
        <div className="my_info_sub_title_div">
          <p id="my_info_sub_title">새 비밀번호 확인</p>
          <form id="form_tag">
            <input
              id="input_tag"
              type="text"
              placeholder="비밀번호를 다시 입력해주세요."
            />
          </form>
        </div>
        <div className="my_info_sub_title_div">
          <p id="my_info_sub_title">전화번호</p>
          <form id="form_tag">
            <input
              id="input_tag"
              type="text"
              placeholder="전화번호를 입력해주세요."
            />
          </form>
        </div>
        <div className="my_info_sub_title_div">
          <p id="my_info_sub_title">성별</p>
          <div className="gender_button">
            <img id="man_button" src="/male.png" alt="man"/>
            <img id="woman_button" src="/female.png" alt="woman" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPageInfo;
