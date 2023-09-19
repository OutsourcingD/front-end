import React from "react";
import "./Slider.css";
import Slider from "react-slick";

function TestSlider() {
  const settings = {
    infinite: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  let slider: any;

  React.useEffect(() => {
    slider.slickGoTo(1);
  }, []);

  return (
    <div className="slider">
      <Slider ref={(c) => slider(c)} {...settings}>
        <div onClick={() => console.log("1")}>
        <img
          src="https://hospital-image-bucket-1.s3.ap-northeast-2.amazonaws.com/banner/left/Mask%20group2.png"
          alt=""
        />
        </div>
        <div onClick={() => console.log("2")}>
        <img
          src="https://hospital-image-bucket-1.s3.ap-northeast-2.amazonaws.com/banner/left/Mask%20group1.png"
          alt=""
        />
        </div>
        <div onClick={() => console.log("3")}>
        <img
          src="https://hospital-image-bucket-1.s3.ap-northeast-2.amazonaws.com/banner/left/Mask%20group-1.png"
          alt=""
        />
        </div>
      </Slider>
      
    </div>
  );
}

export default TestSlider;
