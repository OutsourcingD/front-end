import React, { useState } from "react";
import "./InqueryComponent.css";
import Footer from "../bottom/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InqueryComponent() {
    const [value, setText] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios({
            method: "post", // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/inquiry`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
            data: {
                content: value,
            },
        }).then((res) => {
            alert("문의가 등록되었습니다.")
            navigate("/");
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/");
            }          
        });
    };

    const sendInquery = () => {
        axios({
            method: "post", // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/inquiry`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
            data: {
                content: value,
            },
        }).then((res) => {
            alert("문의가 등록되었습니다.")
            navigate("/");
        }).catch((err) => {
            if(err.response.status === 401 || err.response.status === 403) {
                alert("This is not admin ID.");
                navigate("/login");
            }
            else {
                alert(`Contact to developer. ${err.response.status}`);
                navigate("/");
            }          
        });
    };

    return (
        <div className="inquery_div">
            <div className="inquery_wrapper">
                {/* 제목 */}
                <div className="inquery_title_div">
                    <p id="inquery_title">1:1 문의하기</p>
                </div>
                {/* 본문 */}
                <div className="inquery_body">
                    <p id="inquery_sub_title">문의내용</p>
                </div>
                <div className="inquery_input_div">
                    <form onSubmit={onSubmit}>
                        <textarea
                            id="inquery_input"
                            value={value}
                            placeholder="Please enter what you want to inquire about."
                            onChange={onChange}
                        />
                    </form>
                </div>
                <div className="inquery_button_div" onClick={sendInquery}>
                    <p id="inquery_button">submit</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default InqueryComponent;
