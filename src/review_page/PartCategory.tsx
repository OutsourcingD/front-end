import React from "react";
import "../review_page/PartCategory.css";

interface PartCategoryProps {
  onClick: (num: number) => void
}

function PartCategory() {
  const [one, setOne] = React.useState(false);
  const [two, setTwo] = React.useState(false);
  const [three, setThree] = React.useState(false);
  const [four, setFour] = React.useState(false);
  const [five, setFive] = React.useState(false);
  const [six, setSix] = React.useState(false);
  const [seven, setSeven] = React.useState(false);
  const [eight, setEight] = React.useState(false);

  React.useEffect(() => {
    console.log(one)
  }, [one])

  return (
    <div className="part_category_div">
      <div className={one === true ? "part_category_item_div" : "part_category_no_click_item_div"} onClick={() => {
        setOne(!one)
      }}>
        <p id={one === true ? "part_category_item" : "part_category_no_click_item"}>Fat Grafting</p>
      </div>
      <div className={two === true ? "part_category_item_div" : "part_category_no_click_item_div"} onClick={() => {
        setTwo(!two)
      }}>
        <p id={two === true ? "part_category_item" : "part_category_no_click_item"}>Lifting</p>
      </div>
      <div className={three === true ? "part_category_item_div" : "part_category_no_click_item_div"} onClick={() => {
        setThree(!three)
      }}>
        <p id={three === true ? "part_category_item" : "part_category_no_click_item"}>Skin</p>
      </div>
      <div className={four === true ? "part_category_item_div" : "part_category_no_click_item_div"} onClick={() => {
        setFour(!four)
      }}>
        <p id={four === true ? "part_category_item" : "part_category_no_click_item"}>Liposuction</p>
      </div>
      <div className={five === true ? "part_category_item_div" : "part_category_no_click_item_div"} onClick={() => {
        setFive(!five)
      }}>
        <p id={five === true ? "part_category_item" : "part_category_no_click_item"}>Nose</p>
      </div>
      <div className={six === true ? "part_category_item_div" : "part_category_no_click_item_div"} onClick={() => {
        setSix(!six)
      }}>
        <p id={six === true ? "part_category_item" : "part_category_no_click_item"}>Eyes</p>
      </div>
      <div className={seven === true ? "part_category_item_div" : "part_category_no_click_item_div"} onClick={() => {
        setSeven(!seven)
      }}>
        <p id={seven === true ? "part_category_item" : "part_category_no_click_item"}>Breast</p>
      </div>
      <div className={eight === true ? "part_category_item_div" : "part_category_no_click_item_div"} onClick={() => {
        setEight(!eight)
      }}>
        <p id={eight === true ? "part_category_item" : "part_category_no_click_item"}>Countouring</p>
      </div>
    </div>
  );
}

export default PartCategory;
