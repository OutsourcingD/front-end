import React, { useState } from "react";
import "./InqueryComponent.css";

function InqueryComponent() {
    const [value, setText] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmit(true);
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
                            placeholder="문의하고 싶은 내용을 입력해주세요. 빠른 시일 내에 관리자가 답변해드립니다."
                            onChange={onChange}
                        />
                    </form>
                </div>
                <div className="inquery_button_div">
                    <p id="inquery_button">등록하기</p>
                </div>
            </div>
        </div>
    );
}

export default InqueryComponent;
