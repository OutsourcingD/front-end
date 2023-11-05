import React, { useState } from "react";
import "./BeforeCategory.css";
import axios from "axios";
import { BeforeAfterResponseDto } from "../dto/BeforeAfterResponseDto";
import { useNavigate } from "react-router-dom";

interface BeforeCategoryProps {
    onCategory: (value: number) => void;
    onCategoryResult: (value: BeforeAfterResponseDto[]) => void;
};

const BeforeCategory = (props: BeforeCategoryProps) => {
    const [categoryNumber, setCotegoryNumber] = useState(0);
    const navigate = useNavigate();

    const handleCategory = (nav: number) => {
        setCotegoryNumber(nav);
        props.onCategory(nav);
    }

    React.useEffect(() => {
        axios({
            method: "get",
            url: `/api/review/before-after?part=${categoryNumber}&pages=0`,
        }).then((res) => {
            props.onCategoryResult(res.data);
        }).catch((err) => {
            alert(`Contact to developer2. ${err.status}`);
            ;
        });
    }, [categoryNumber]);

    return (
        <div className="b_category">
            <div className="b_categoryDiv" onClick={() => handleCategory(1)}>
                { categoryNumber === 1 ? <img id="b_fat" src="/category/fat_white.png" alt="fat" sizes="5%" /> :  <img id="b_fat" src="/category/fat.png" alt="fat" sizes="5%" />}
            </div>
            <div className="b_categoryDiv" onClick={() => handleCategory(2)}>
                { categoryNumber === 2 ? <img id="b_lifting" src="/category/Lifting_white.png" alt="lifting" sizes="5%" /> : <img id="b_lifting_white" src="/category/lifting.png" alt="lifting" sizes="5%" /> }
            </div>
            <div className="b_categoryDiv" onClick={() => handleCategory(3)}>
                { categoryNumber === 3 ? <img id="b_skin" src="/category/skin_white.png" alt="skin" sizes="5%" /> : <img id="b_skin_white" src="/category/skin.png" alt="skin" sizes="5%" /> }
            </div>
            <div className="b_categoryDiv" onClick={() => handleCategory(4)} >
                { categoryNumber === 4 ? <img id="b_lipo_white" src="/category/Liposuction_white.png" alt="Liposuction_white" sizes="5%" /> : <img id="b_lipo" src="/category/lipo.png" alt="liposuction" sizes="5%" /> }
            </div>
            <div className="b_categoryDiv" onClick={() => handleCategory(5)}>
                { categoryNumber === 5 ? <img id="b_breast_white" src="/category/Breast_white.png" alt="breast" sizes="5%" /> : <img id="b_breast" src="/category/breast.png" alt="breast" sizes="5%" /> }
            </div>
            <div className="b_categoryDiv" onClick={() => handleCategory(6)}>
                { categoryNumber === 6 ? <img id="b_nose_white" src="/category/Nose_white.png" alt="nose" sizes="5%" /> : <img id="b_nose" src="/category/nose.png" alt="nose" sizes="5%" /> }
            </div>
            <div className="b_categoryDiv" onClick={() => handleCategory(7)}>
                { categoryNumber === 7 ?  <img id="b_eyes_white" src="/category/Eyes_white.png" alt="eyes" sizes="5%" /> : <img id="b_eyes" src="/category/eyes.png" alt="eyes" sizes="5%" /> }
            </div>
            <div className="b_categoryDiv" onClick={() => handleCategory(8)}>
                { categoryNumber === 8 ? <img id="b_con_white" src="/category/Contouring_white.png" alt="contouring" sizes="5%" /> : <img id="b_con" src="/category/contouring.png" alt="contouring" sizes="5%" /> }
            </div>
            </div>
    );
};

export default BeforeCategory;