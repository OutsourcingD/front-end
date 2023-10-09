import React from "react";
import "./BeforePage.css";
import BeforeItem from "../components/BeforeItem";
import Pagination from "react-js-pagination";
import BeforeCategory from "../components/BeforeCategory";
import Footer from "../bottom/Footer";
import { BeforeAfterResponseDto } from "../dto/BeforeAfterResponseDto";
import axios from "axios";
import BeforeDetail from "../components/BeforeDetail";
import { useNavigate } from "react-router-dom";

function BeforePage() {
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [category, setCategory] = React.useState(0);
    const [beforeAfterList, setBeforeAfterList] = React.useState<BeforeAfterResponseDto[]>([]);
    const [isClick, setIsClick] = React.useState(false);
    const [beforeItemId, setBeforeItemId] = React.useState(0);
    const navigate = useNavigate();

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setPage(page);
    };

    const handleCategory = (value: number) => {
        setCategory(value);
    };

    const handleCategoryResult = (value: BeforeAfterResponseDto[]) => {
        setBeforeAfterList(value);
    };

    const handleBeforeAfter = React.useCallback((id: number) => {
        setIsClick(true);
        setBeforeItemId(id);
        console.log("before: ", id);
    }, []);

    React.useEffect(() => {
        axios({
            method: "get", // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/review/before-after?part=${category}&pages=${
                page - 1
            }`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setBeforeAfterList(res.data);
            setTotalPages(res.data[0] !== undefined ? res.data[0].totalPages : 1);
        }).catch((err) => {
            if(err.response.status === 403 || err.response.status === 401) {
                alert("Please the login.");
                navigate("/login")
            }
            else
            {
                alert("Server Error" + err.response.status);
                navigate("/");
            }
        });;
    }, [page]);

    React.useEffect(() => {
        setPage(1);
    }, [category]);

    React.useEffect(() => {
        console.log(isClick)
    }, [isClick]);

    return (
        <div className="doctor_div" onClick={() => setIsClick(false)}>
            {isClick === true ? <div className="before_page_div_disabled"></div> : null}
            <div className="hospital_container">
                <div className="hospital_page_recommend_title_div">
                    <p id="hospital_page_recommend_title">Before & After</p>
                </div>
                <div className="before_category_div">
                    <BeforeCategory onCategory={handleCategory} onCategoryResult={handleCategoryResult}/>
                </div>
                <div className="hospital_item_div">
                    {beforeAfterList.map((item, index) => {
                        return <BeforeItem key={index} item={item} onClick={handleBeforeAfter} />;
                    })}
                </div>
                {isClick === true ? <BeforeDetail 
                    id={beforeItemId}
                /> : null}
                <Pagination
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={totalPages * 10}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={handlePageChange}
                />
            </div>
            <Footer />
        </div>
    );
}

export default BeforePage;
