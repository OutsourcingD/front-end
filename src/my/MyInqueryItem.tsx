import React from "react";
import "./MyInqueryItem.css";
import { MyInqueryDto } from "../dto/MyInqueryDto";

const MyInqueryItem = (props: MyInqueryDto) => {
    const [clicked, setClicked] = React.useState<boolean>(false);
    
    return (
        <>
            <div className="my_inquery_div">
                <p id="my_inquery_title">{props.content}</p>
                <div className="waiting_div">
                    <p id="is_recieved">{props.answer !== null ? "Done" : "Waiting..."}</p>
                    <img src={clicked ? "/up_arrow.png" : "/down_arrow.png"} alt="" id="up_arrow" onClick={() => setClicked((click) => !click)} />
                </div>
            </div>
            {
                clicked ?
                <div className="inquiry_item_detail">
                    <p id="iquiry_item_content">{props.content}</p>
                    <div className="inquiry_item_hr">
                        <img src="/enter.png" alt="" id="enter" />
                        <div className="admin_answer_content">
                            <p id="admin_answer_title">Admin's answer</p>
                            {
                                props.answer !== null ?
                                <p id="admin_answer_content">{props.answer}</p>
                                : <p id="admin_answer_content">Hold on a minute, please.<br /> The administrator will respond to you as soon as possible.</p>                            
                            }
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    );
}

export default MyInqueryItem;