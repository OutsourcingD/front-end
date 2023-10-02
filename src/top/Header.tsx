import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeaderDiv = styled.div``;

const LeftDiv = styled.div``;

const RightDiv = styled.div``;

const Menu = styled.p``;

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);
    const [more, setMore] = useState(false);
    const [name, setName] = useState("");

    const dropdownRef = React.useRef<HTMLDivElement | null>(null); // 참조 생성

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
        //navigate("/mypage");
        setMore(!more);
    };

    const mypageClick = () => {
        navigate("/mypage");
    };

    const logoutClick = () => {
        setIsLogin(false);
        localStorage.clear();
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as HTMLDivElement)
            ) {
                setMore(false); // 외부 클릭 시 more 상태 변경
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token")
        const refreshToken = localStorage.getItem("refresh_token")
        const memberIdString = localStorage.getItem("member_id")
        let memberId = 0

        console.log(accessToken?.length, " ", refreshToken?.length, " ", memberIdString?.length)
        memberIdString !== null ? memberId = Number(memberIdString) : memberId = 0;

        if (memberId !== 0 && accessToken !== null && refreshToken !== null) {
            setIsLogin(true);
        }
        else {
            setIsLogin(false);
        }
    }, []);

    useEffect(() => {
        localStorage.getItem("selected")
            ? setSelected(Number(localStorage.getItem("selected")))
            : setSelected(0);

        axios({
            method: "get", // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/member/info`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setName(res.data.nickname);
        });
    }, []);

    useEffect(() => {
        localStorage.getItem("selected") === null
            ? setSelected(0)
            : setSelected(Number(localStorage.getItem("selected")));
    }, [selected]);

    useEffect(() => {
        console.log(isLogin);
    }, [isLogin]);

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
                {!isLogin ? (
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
                ) : (
                    <>
                        <div className="profile_container" onClick={onClick}>
                            <img
                                src="/logo/profile.png"
                                alt="profile"
                                id="profile"
                            />
                        </div>
                        <div className="nameDiv" onClick={onClick}>
                            <div className="header_my_name_info">
                                <p id="name">{name}</p>
                                <p id="name_">Sir</p>
                            </div>
                            {more ? (
                                <div
                                    className="mypage_more_drop_box"
                                    ref={dropdownRef}
                                >
                                    <div
                                        className="header_logout_div"
                                        onClick={logoutClick}
                                    >
                                        <p id="header_logout">log out</p>
                                    </div>
                                    <div
                                        className="header_logout_div"
                                        onClick={mypageClick}
                                    >
                                        <p id="header_logout">my page</p>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div className="chatDiv">
                            <div className="chat_icon_div">
                                <img
                                    src="/Send.png"
                                    id="chat_icon"
                                    alt="chatting_page"
                                />
                            </div>
                            <p id="chat">chat box</p>
                        </div>
                    </>
                )}
            </RightDiv>
        </HeaderDiv>
    );
}

export default Header;
