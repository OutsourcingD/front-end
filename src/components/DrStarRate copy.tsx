import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DrStarRateWrap = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  .star_icon {
    display: inline-flex;
    margin-right: 5px;
  }
`;

interface DrStarRateProps {
  rating: number;
  setRatingChange: (i: number) => void;
}

function DrStarRate(props: DrStarRateProps) {
  const AVR_RATE = 100;
  const STAR_IDX_ARR = ["first", "second", "third", "fourth", "last"];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (AVR_RATE * props.rating) / 100;
    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    return tempStarRatesArr;
  };

  useEffect(() => {
    setRatesResArr(calcStarRates);
  }, [props.rating]);

  const handleStarClick = (e: React.MouseEvent<HTMLSpanElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isMoreThanHalf = e.clientX - rect.left > rect.width / 2;
    
    isMoreThanHalf ? props.setRatingChange((idx + 1) * 14) : props.setRatingChange((idx + 1) * 14 - 7);
    console.log(`Star ${idx + 1} clicked! More than half: ${isMoreThanHalf}`);
  };

  return (
    <DrStarRateWrap>
      {STAR_IDX_ARR.map((item, idx) => {
        return (
          <span className="star_icon" key={`${item}_${idx}`} onClick={(e) => handleStarClick(e, idx)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22.2px"
              height="25.38px"
              viewBox="0 0 14 13"
              fill="white"
              style={{marginBottom: "15%"}}
            >
              <clipPath id={`${item}StarClip`}>
                <rect width={`${ratesResArr[idx]}`} height="39" />
              </clipPath>
              <path
                id={`${item}Star`}
                d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                transform="translate(-2 -2)"
                stroke="#F8CE3D"
              />
              <use
                clipPath={`url(#${item}StarClip)`}
                href={`#${item}Star`}
                fill="#F8CE3D"
              />
            </svg>
          </span>
        );
      })}
    </DrStarRateWrap>
  );
}

export default DrStarRate;
