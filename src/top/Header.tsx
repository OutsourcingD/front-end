import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";

const HeaderDiv = styled.div``;

const LeftDiv = styled.div``;

const RightDiv = styled.div``;

const Menu = styled.p``;

interface Props {
    authorityName: string;
    role: string;
}

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);
    const [more, setMore] = useState(false);
    const [name, setName] = useState("");
    const [profile, setProfile] = useState("");
    const location = useLocation();
    const [width, setWidth] = useState(window.innerWidth);
    const dropdownRef = React.useRef<HTMLDivElement | null>(null); // 참조 생성
    const [isClick, setIsClick] = useState(false);

    const handleResize = debounce(() => {
        setWidth(window.innerWidth);
    }, 200);

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
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/auth/check`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            res.data.map((item: Props) => {
                if (item.authorityName === "ROLE_USER") {
                    navigate(`/mypage?id=${localStorage.getItem("member_id")}`);
                } else if (item.authorityName === "ROLE_ADMIN") {
                    navigate("/admin");
                }
            });
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

    const logoutClick = () => {
        setIsLogin(false);
        localStorage.clear();
    };

    const handleHamburger = (id: number) => {
        if (id === 1) {
            navigate("/hospital");
            setIsClick(false);
        } else if (id === 2) {
            navigate("/doctor");
            setIsClick(false);
        } else if (id === 3) {
            navigate("/before-after");
            setIsClick(false);
        } else {
            alert("잘못된 접근입니다.");
        }
    }

    const handleHamburgerLogout = () => {
        logoutClick();
        setIsClick(false);
    }

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
        const memberIdString = localStorage.getItem("user_id")
        let memberId = 0

        if(location.pathname !== "/hospital" && location.pathname !== "/doctor" && location.pathname !== "/before-after") {
            setSelected(0);
        }
        
        memberIdString !== null ? memberId = Number(memberIdString) : memberId = 0;

        if (accessToken !== null && refreshToken !== null) {
            setIsLogin(true);
        }
        else {
            setIsLogin(false);
        }
    }, [location]);

    useEffect(() => {
        axios({
            method: "get", // or 'post', 'put', etc.
            url: `${process.env.REACT_APP_SERVER_URL}/member/info`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            },
        }).then((res) => {
            setName(res.data.nickname);
            setProfile(res.data.profile);
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
    }, []);

    useEffect(() => {
        if(width > 920) setIsClick(false);
    }, [width]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if(isClick) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isClick])

    return (
        <HeaderDiv className="header"> 
            {isClick === true ? <div className="main_disabled"></div> : null}
            {
                isClick === true ? 
                <div className="hamburger_menu">
                    <div>
                        <div className="hamburger_menu_item" onClick={() => handleHamburger(1)}>
                            <p id="hamburger_menu_text">Hospital</p>
                        </div>
                        <div className="hamburger_menu_item" onClick={() => handleHamburger(2)}>
                            <p id="hamburger_menu_text">Doctor</p>
                        </div>
                        <div className="hamburger_menu_item" onClick={() => handleHamburger(3)}>
                            <p id="hamburger_menu_text">Before-After</p>
                        </div>
                    </div>
                    <div className="hamburger_sign_in_div">
                        {
                            isLogin ?
                                <div className="logout_container">
                                    <p id="hamburger_sign_in" onClick={handleHamburgerLogout}>Log out</p>
                                    <div onClick={() => {mypageClick(); setIsClick(false)}}>
                                        <img src="/setting_image.png" alt="" id="setting_image" />
                                    </div>
                                </div>
                                : <p id="hamburger_sign_in" onClick={() => {navigate("/login"); setIsClick(false)}}>Sign in / up</p>
                        }
                    </div>
                </div> : null
            }
            <LeftDiv className="left">
                {
                    width <= 920 ? isClick ? 
                        <div className="hamburger_close_div" onClick={() => setIsClick(false)}>
                            <img
                                src="/close_black.png"
                                alt="close"
                                id="hamburger_close"
                            />
                        </div>
                     : (
                        <div className="hamburger_div" onClick={() => setIsClick(true)}>
                            <img src="/hamburger.png" id="hamburger" alt="" />
                        </div>
                    ) : null
                }
                <img
                    src="/logo.png"
                    alt="logo"
                    id="logo"
                    onClick={() => movePage(0)}
                />
                {width > 920 ? <><Menu
                    id={
                        selected !== 1
                            ? "menu_hospital"
                            : "selected_menu_hospital"
                    }
                    onClick={() => movePage(1)}
                >
                    Hospital
                </Menu>
                <Menu
                    id={selected !== 2 ? "menu" : "selected_menu"}
                    onClick={() => movePage(2)}
                >
                    Doctor
                </Menu>
                <Menu
                    id={selected !== 3 ? "menu" : "selected_menu"}
                    onClick={() => movePage(3)}
                >
                    Before-After
                </Menu></> : null}
            </LeftDiv>
            <RightDiv className="right">
                {!isLogin ? (
                    <div className="login_right_div">
                        <div
                            className="login_div"
                            onClick={() => navigate("/login")}
                        >
                            <img
                                src="/door.png"
                                alt="login"
                                id="header_login"
                            />
                        </div>
                        <div className="sign_in_up_div" onClick={() => navigate("/login")}>
                            <p id="sign_in_up_text">Sign in / up</p>
                        </div>
                    </div>
                ) : (
                    <>
                    {
                        width > 920 ?
                        <>
                            <div className="profile_container" onClick={onClick}>
                                <img
                                    src={profile}
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
                        </>
                        : null
                    }
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
