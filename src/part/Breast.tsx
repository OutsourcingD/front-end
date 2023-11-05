import React,{useState} from "react";
import "../review_page/PartCategory.css";

const Breast = () => {
  const [isClicked,setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  }

    return (
        <div className="part_category_div">
        <div className={`part_category_item_div ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
          <p id="part_category_item">Breast</p>
        </div>
      </div>
    )
}

export default Breast;