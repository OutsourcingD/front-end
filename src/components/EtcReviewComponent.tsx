import React from "react";
import './EtcReviewComponent.css';
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";

interface EtcReviewComponentProps {
    isEditClicked : boolean;
    setIsEditClicked: (value:boolean) => void;
}

const EtcReviewComponent:React.FC<EtcReviewComponentProps> = ({isEditClicked,setIsEditClicked}) => {

    if (!isEditClicked) {
        return null;
    }

    return (
    <div className="etc_detail_page_div">

        <div className="etc_link_add_container">
            <div className="etc_link_add_div">
                <p id="etc_main_text">Title</p>
                <div className="etc_link_add_form_div">
                    <form id = "etc_link_add_form">
                        <input
                            id ="etc_link_add_input"
                            readOnly
                        />
                    </form>
                </div>

                <p id="etc_main_text">Id</p>
                <div className="etc_link_add_form_div">
                    <form id = "etc_link_add_form">
                        <input
                            id ="etc_link_add_input"
                            readOnly
                        />
                    </form>
                </div>
            </div>

            <div className = "etc_link_add_div">
                <div className = "etc_link_add_div">
                    <p id="etc_main_text">Hospital</p>
                    <div className="flex-wrapper">
                        <div className="surgery-part-dropdown-wrapper">
                            <select className="surgery-part-dropdown">
                                <option>Etc.</option>
                                <option>Seoul Hospital</option>
                            </select>
                        </div>

                        <div className="surgery-period-input-wrapper">
                            <input
                                type="text"
                                placeholder="direct input"
                                className="surgery-period"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className = "etc_link_add_div">
                <div className = "etc_link_add_div">
                    <p id="etc_main_text">Doctor</p>
                    <div className="flex-wrapper">
                        <div className="surgery-part-dropdown-wrapper">
                            <select className="surgery-part-dropdown">
                                <option>Etc.</option>
                                <option>Dr.kim</option>
                            </select>
                        </div>
                        <div className="surgery-period-input-wrapper">
                            <input
                                type="text"
                                placeholder="direct input"
                                className="surgery-period"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="etc_buttons_div">
            <div className="etc_cancel_button_div">
                <p id="etc_cancel_text" onClick={() => {setIsEditClicked(false);}}>cancel</p>
            </div>
            <div className="etc_save_button_div">
                <p id="etc_save_text">save</p>
            </div>
        </div>
    </div> 
    );
}

export default EtcReviewComponent;