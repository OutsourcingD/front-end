import React,{useState} from "react";
import "../review_page/PartCategory.css";

const Lifting = () => {
  const [isClicked,setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  }

    return (
        <div className="part_category_div">
        <div className={`part_category_item_div ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
          <p id="part_category_item">Lifting</p>
        </div>
      </div>
    )
}

export default Lifting;