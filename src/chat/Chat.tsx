import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../bottom/Footer";
import "./Chat.css";

function Chatting() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const [nickname, setNickname] = React.useState<string>("");
    const [profile, setProfile] = React.useState<string>("");
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 1];

    React.useEffect(() => {
        const memberId = queryParams.get("memberId");

        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/member/info`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            localStorage.setItem("member_id", res.data.memberId);
            setNickname(res.data.nickname);
            setProfile(res.data.profile);
            
            if(queryParams.get("memberId") != res.data.memberId) {
                navigate("/notfound")
            }
        }).catch((err) => {
            console.log(err.status)
        });
    }, []);

    return (
        <div className="chatting_div">
            <div className="chatting_wrapper">
                <div className="chatting_page_header">
                    <img src={profile} alt="" id="chatting_page_profile"/>
                    <p id="chatting_page_nickname">{nickname}</p>
                    <p id="chatting_room_text">Chatting Room</p>
                </div>
                <div className="chatting_container">
                    <div className="chatting_left_div">
                        {
                            list.map((item, index) => {
                                return (
                                    <div className="chatting_left_item_div" key={index}>
                                        <img src={profile} alt="" id="chatting_left_item_profile"/>
                                        <div className="chatting_info_div">
                                            <p id="chatting_left_item_nickname">nickname</p>
                                            <p id="chatting_left_item_content">안녕하세요 지승언입니다안녕하세요 지승언입니다안녕하세요 지승언입니다안녕하세요 지승언입니다안녕하세요 지승언입니다안녕하세요 지승언입니다안녕하세요 지승언입니다안녕하세요 지승언입니다</p>
                                        </div>
                                        <div className="chatting_day_div">
                                            <p id="chatting_day">12주</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="chatting_right_div">
                        <div className="chatting_right_header">
                            <img src={profile} alt="" id="chatting_left_item_profile"/>
                            <p id="chatting_right_item_nickname">nickname</p>
                            <img src="/trash.png" alt="" id="chatting_right_item_trash"/>
                        </div>
                        <div className="chatting_bottom_div">
                            <div className="chatting_bottom_left_div">
                                <img src="/chatting_camera.png" alt="" id="chatting_camera"/>
                                <form id="chatting_form">
                                    <input type="text" id="chatting_input" placeholder="Input message."/>
                                </form>
                            </div>
                            <img src="/Send.png" alt="" id="chatting_send"/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Chatting;