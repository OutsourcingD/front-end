import React from "react";
import "./BeforeItem.css";

function BeforeItem() {
    return (
        <div className="before_item_div_">
            <div className="before_img_div">
                <img id="before_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8uKXKlZPAOB4nhAd6VG7-h9B18DispQpnUA&usqp=CAU"/>
                <div className="review_text_div_">
                    <p id="before_title">before</p>
                </div>
                <div className="review_text_div">
                    <p id="before_title">Before</p>
                </div>
            </div>
            <div className="after_img_div">
                <img id="after_img" src="https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTpS_yWseZ7zulpE4Cuec0C5rP1BgVcjm-1TGgXtzpesqDx1IOrU-15Sff0rc9FLThz" alt="after_img" />
                <div className="review_text_div_">
                    <p id="before_title">After</p>
                </div>
                <div className="review_text_div">
                    <p id="before_title">After</p>
                </div>
            </div>
        </div>
    );
}

export default BeforeItem;