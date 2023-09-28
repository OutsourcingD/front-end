import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const HeaderDiv = styled.div``;

const LeftDiv = styled.div``;

const RightDiv = styled.div``;

const Menu = styled.p``;

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        localStorage.getItem("selected")
            ? setSelected(Number(localStorage.getItem("selected")))
            : setSelected(0);
    }, []);

    const movePage = (page: number) => {
        if (page === 0) {
            localStorage.setItem("selected", "0");
            setSelected(0);
            navigate("/");
        } else if (page === 1) {
            localStorage.setItem("selected", "1");
            setSelected(1);
            navigate("/hospital");
        } else if (page === 2) {
            localStorage.setItem("selected", "2");
            setSelected(2);
            navigate("/doctor");
        } else if (page === 3) {
            localStorage.setItem("selected", "3");
            setSelected(3);
            navigate("/before-after");
        } else {
            alert("잘못된 접근입니다.");
        }
    };

    const onClick = () => {
        navigate("/mypage");
    };

    useEffect(() => {
        {
            /*localStorage.getItem("access_token")  ? setIsLogin(true) : setIsLogin(false);*/
        }
    }, []);

    useEffect(() => {
        localStorage.getItem("selected") === null ? setSelected(0) : setSelected(Number(localStorage.getItem("selected")));
    }, [selected]);

    return (
        <HeaderDiv className="header">
            <LeftDiv className="left">
                <img
                    src="/logo.png"
                    alt="logo"
                    id="logo"
                    onClick={() => movePage(0)}
                />
                <Menu
                    id={
                        selected !== 1
                            ? "menu_hospital"
                            : "selected_menu_hospital"
                    }
                    onClick={() => movePage(1)}
                >
                    병원정보
                </Menu>
                <Menu
                    id={selected !== 2 ? "menu" : "selected_menu"}
                    onClick={() => movePage(2)}
                >
                    원장정보
                </Menu>
                <Menu
                    id={selected !== 3 ? "menu" : "selected_menu"}
                    onClick={() => movePage(3)}
                >
                    전후사진
                </Menu>
            </LeftDiv>
            <RightDiv className="right">
                {isLogin === false ? (
                    <>
                        <div className="profile_container" onClick={onClick}>
                            <img
                                src="/logo/profile.png"
                                alt="profile"
                                id="profile"
                            />
                        </div>
                        <div className="nameDiv" onClick={onClick}>
                            <p id="name">지승언</p>
                            <p id="name_">님</p>
                        </div>
                        <div className="chatDiv">
                            <div className="chat_icon_div">
                                <img
                                    src="/send.png"
                                    id="chat_icon"
                                    alt="chatting_page"
                                />
                            </div>
                            <p id="chat">chat box</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className="login_div"
                            onClick={() => navigate("/login")}
                        >
                            <img
                                src="/login.png"
                                alt="login"
                                id="header_login"
                            />
                        </div>
                    </>
                )}
            </RightDiv>
        </HeaderDiv>
    );
}

export default Header;
