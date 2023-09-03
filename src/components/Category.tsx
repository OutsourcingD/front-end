import React, { useEffect, useState } from "react";
import "./Category.css";

function Category() {
    const [categoryNumber, setCotegoryNumber] = useState(0);

    const handleCategory = (nav: number) => {
        setCotegoryNumber(nav);
    }
  
    useEffect(() => {
        console.log(categoryNumber);
    }, [categoryNumber])

    return (
        <div className="category">
            <div className="categoryDiv" onClick={() => handleCategory(1)}>
                { categoryNumber === 1 ? <img id="fat" src="/category/fat_white.png" alt="fat" sizes="5%" /> :  <img id="fat" src="/category/fat.png" alt="fat" sizes="5%" />}
            </div>
            <div className="categoryDiv" onClick={() => handleCategory(2)}>
                { categoryNumber === 2 ? <img id="lifting" src="/category/Lifting_white.png" alt="lifting" sizes="5%" /> : <img id="lifting_white" src="/category/lifting.png" alt="lifting" sizes="5%" /> }
            </div>
            <div className="categoryDiv" onClick={() => handleCategory(3)}>
                { categoryNumber === 3 ? <img id="skin" src="/category/skin_white.png" alt="skin" sizes="5%" /> : <img id="skin_white" src="/category/skin.png" alt="skin" sizes="5%" /> }
            </div>
            <div className="categoryDiv" onClick={() => handleCategory(4)} >
                { categoryNumber === 4 ? <img id="lipo_white" src="/category/Liposuction_white.png" alt="Liposuction_white" sizes="5%" /> : <img id="lipo" src="/category/lipo.png" alt="liposuction" sizes="5%" /> }
            </div>
            <div className="categoryDiv" onClick={() => handleCategory(5)}>
                { categoryNumber === 5 ? <img id="breast_white" src="/category/Breast_white.png" alt="breast" sizes="5%" /> : <img id="breast" src="/category/breast.png" alt="breast" sizes="5%" /> }
            </div>
            <div className="categoryDiv" onClick={() => handleCategory(6)}>
                { categoryNumber === 6 ? <img id="nose_white" src="/category/Nose_white.png" alt="nose" sizes="5%" /> : <img id="nose" src="/category/nose.png" alt="nose" sizes="5%" /> }
            </div>
            <div className="categoryDiv" onClick={() => handleCategory(7)}>
                { categoryNumber === 7 ?  <img id="eyes_white" src="/category/Eyes_white.png" alt="eyes" sizes="5%" /> : <img id="eyes" src="/category/eyes.png" alt="eyes" sizes="5%" /> }
            </div>
            <div className="categoryDiv" onClick={() => handleCategory(8)}>
                { categoryNumber === 8 ? <img id="con_white" src="/category/Contouring_white.png" alt="contouring" sizes="5%" /> : <img id="con" src="/category/con.png" alt="contouring" sizes="5%" /> }
            </div>
            <div className="categoryDiv" onClick={() => handleCategory(9)}>
                { categoryNumber === 9 ? <img id="doctor_white" src="/category/Doctors_white.png" alt="doctor" sizes="5%" /> : <img id="doctor" src="/category/doctors.png" alt="doctor" sizes="5%" /> }
            </div>
            <div className="categoryDiv" onClick={() => handleCategory(10)}>
                { categoryNumber === 10 ? <img id="hospital_white" src="/category/Plasticsurgery_white.png" alt="hospital" sizes="5%" /> : <img id="hospital" src="/category/surgery.png" alt="hospital" sizes="5%" /> }
            </div>
            </div>
    );
};

export default Category;