import React from "react";
import "./NotFoundPage.css";
import Footer from "./bottom/Footer";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="not_found_page_div">
            <div className="not_found_wrapper">
                <div className="not_found_body">
                    <p id="not_found_main_title">404</p>
                    <p id="not_found_text">Not Found</p>
                    <p id="not_found_sub_title">Page you're looking for is not found</p>
                    <div className="back_button_div" onClick={() => navigate("/")}>
                        <p id="back_button_text">Go back</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default NotFoundPage;