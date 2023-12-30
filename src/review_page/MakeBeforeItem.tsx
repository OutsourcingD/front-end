import React from "react";
import "./MakeBeforeItem.css";

function MakeBeforeItem() {
  const [selected, setSelected] = React.useState("Fat Grafting");
  const [period, setPeriod] = React.useState(0);
  const [items, setItems] = React.useState([1]);

  const addButtonClick = () => {
    if (items.length < 10) {
        setItems((prev) => [...prev, prev.length + 1]);
    } else {
        alert("Exceeding the maximum number : 10");
    }
};

  return (
    <div className="review_hospital_doctor_input_div">
      <div className="before_input_div">
        <div className="before_hospital_input_div">
          <p id="before_title_input">Hospital</p>
          <form id="before_hospital_input_form">
            <input
              type="text"
              id="before_hospital_input"
              placeholder="Input hospital name."
            />
          </form>
        </div>
        <div className="before_hospital_input_div">
          <p id="before_title_input">Doctor</p>
          <form id="before_hospital_input_form">
            <input
              type="text"
              id="before_hospital_input"
              placeholder="Input doctor name."
            />
          </form>
        </div>
      </div>
      <div className="before_picture_div">
        <p>Add picture</p>
        <p>Max 10</p>
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
                  <p>Before</p>
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
                  <p>After</p>
                </div>
              </div>
            </div>
            <div className="before_detail_div">
              <select id="category_select" onChange={(e) => setSelected(e.target.value)}>
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
                  onChange={(e) => setPeriod(Number(e.target.value))}
                />
              </form>
            </div>
          </div>
        }
        <div className="add_picture_button">
          <div className="add_picture_plus_div" onClick={addButtonClick}>
            <img src="/add_picture_plus.png" alt="" id="add_picture_plus" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeBeforeItem;
