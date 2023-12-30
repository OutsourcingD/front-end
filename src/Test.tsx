import React, { useState } from "react";
import "./components/BeforeDetail.css";
import "./Test.css"
import StarRate from "./components/StarRate";

const Test = () => {
    const i = 1;
    return (
        <div className="my_text">
           <StarRate rating={i} setRatingChange={(i: number) => console.log(i)}/>
        </div>
    );
};

export default Test;

/*
  background: #FFFFFF;
    border: 1px solid #D4D4D4;
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.08);
    border-radius: 15px;
    left: 450px;
    top: 170px;
    z-index: 10;
*/
