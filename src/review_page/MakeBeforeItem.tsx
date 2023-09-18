import React from "react";
import "./MakeBeforeItem.css";

function MakeBeforeItem() {
  return (
    <div className="review_hospital_doctor_input_div">
      <div className="before_input_div">
        <div className="before_hospital_input_div">
          <p id="before_title_input">병원 입력</p>
          <form id="before_hospital_input_form">
            <input
              type="text"
              id="before_hospital_input"
              placeholder="병원명을 입력해주세요."
            />
          </form>
        </div>
        <div className="before_hospital_input_div">
          <p id="before_title_input">병원 입력</p>
          <form id="before_hospital_input_form">
            <input
              type="text"
              id="before_hospital_input"
              placeholder="병원명을 입력해주세요."
            />
          </form>
        </div>
      </div>
      <div className="before_picture_div">
        <p>사진 추가</p>
        <p>사진은 최대 10장까지 가능해요</p>
      </div>
      <div className="before_pictures_div">
        {
          <div className="before_picture_container">
            <div className="before_picture_wrapper">
              <div className="before_picture_item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src="/add_picture.png"
                    alt=""
                    id="before_picture_add_item"
                  />
                  <p>전</p>
                </div>
              </div>
              <div className="before_picture_item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src="/add_picture.png"
                    alt=""
                    id="before_picture_add_item"
                  />
                  <p>후</p>
                </div>
              </div>
            </div>
            <div className="before_detail_div">
              <select id="category_select">
                <option value="Fat Grafting">Fat Grafting</option>
                <option value="Lifting">Lifting</option>
                <option value="Skin">skin</option>
                <option value="Liposuction">Liposuction</option>
                <option value="Nose">Nose</option>
                <option value="Eyes">Eyes</option>
                <option value="Breast">Breast</option>
                <option value="Contouring">Contouring</option>
              </select>
              <form id="surgery_period_form">
                <input
                  type="text"
                  id="surgery_period_input"
                  placeholder="Write the period"
                />
              </form>
            </div>
          </div>
        }
        <div className="add_picture_button">
          <div className="add_picture_plus_div">
            <img src="/add_picture_plus.png" alt="" id="add_picture_plus" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeBeforeItem;
