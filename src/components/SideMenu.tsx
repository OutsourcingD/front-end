import React from "react";
import "./SideMenu.css";

interface SideMenuProps {
    menuHandler: (menu: number) => void;
}

const SideMenu = (props: SideMenuProps) => {
    const [menu, setMenu] = React.useState(0);

    const onClickMenu = (menu: number) => {
        setMenu(menu);
        props.menuHandler(menu);
    };

    return (
        <>
            <div className="side_menu">
                <div
                    className={
                        menu === 0 ? "menu_item_div_click" : "menu_item_div"
                    }
                    onClick={() => onClickMenu(0)}
                >
                    <div
                        style={
                            menu === 0
                                ? {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "#DFB1E4",
                                      position: "absolute",
                                      left: "0",
                                  }
                                : {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "white",
                                      position: "absolute",
                                      left: "0",
                                  }
                        }
                    ></div>
                    <p
                        id={
                            menu === 0
                                ? "side_menu_item_click"
                                : "side_menu_item"
                        }
                    >
                        Manage Banner
                    </p>
                </div>
                <div
                    className={
                        menu === 1 ? "menu_item_div_click" : "menu_item_div"
                    }
                    onClick={() => onClickMenu(1)}
                >
                    <div
                        style={
                            menu === 1
                                ? {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "#DFB1E4",
                                      position: "absolute",
                                      left: "0",
                                  }
                                : {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "white",
                                      position: "absolute",
                                      left: "0",
                                  }
                        }
                    ></div>
                    <p
                        id={
                            menu === 1
                                ? "side_menu_item_click"
                                : "side_menu_item"
                        }
                    >
                        Change Sort Way
                    </p>
                </div>
                <div
                    className={
                        menu === 2 ? "menu_item_div_click" : "menu_item_div"
                    }
                    onClick={() => onClickMenu(2)}
                >
                    <div
                        style={
                            menu === 2
                                ? {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "#DFB1E4",
                                      position: "absolute",
                                      left: "0",
                                  }
                                : {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "white",
                                      position: "absolute",
                                      left: "0",
                                  }
                        }
                    ></div>
                    <p
                        id={
                            menu === 2
                                ? "side_menu_item_click"
                                : "side_menu_item"
                        }
                    >
                        Manage Dr Post
                    </p>
                </div>
                <div
                    className={
                        menu === 3 ? "menu_item_div_click" : "menu_item_div"
                    }
                    onClick={() => onClickMenu(3)}
                >
                    <div
                        style={
                            menu === 3
                                ? {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "#DFB1E4",
                                      position: "absolute",
                                      left: "0",
                                  }
                                : {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "white",
                                      position: "absolute",
                                      left: "0",
                                  }
                        }
                    ></div>
                    <p
                        id={
                            menu === 3
                                ? "side_menu_item_click"
                                : "side_menu_item"
                        }
                    >
                        Add DR. Info
                    </p>
                </div>
                <div
                    className={
                        menu === 4 ? "menu_item_div_click" : "menu_item_div"
                    }
                    onClick={() => onClickMenu(4)}
                >
                    <div
                        style={
                            menu === 4
                                ? {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "#DFB1E4",
                                      position: "absolute",
                                      left: "0",
                                  }
                                : {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "white",
                                      position: "absolute",
                                      left: "0",
                                  }
                        }
                    ></div>
                    <p
                        id={
                            menu === 4
                                ? "side_menu_item_click"
                                : "side_menu_item"
                        }
                    >
                        Check User Ip
                    </p>
                </div>
                <div
                    className={
                        menu === 5 ? "menu_item_div_click" : "menu_item_div"
                    }
                    onClick={() => onClickMenu(5)}
                >
                    <div
                        style={
                            menu === 5
                                ? {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "#DFB1E4",
                                      position: "absolute",
                                      left: "0",
                                  }
                                : {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "white",
                                      position: "absolute",
                                      left: "0",
                                  }
                        }
                    ></div>
                    <p
                        id={
                            menu === 5
                                ? "side_menu_item_click"
                                : "side_menu_item"
                        }
                    >
                        Check User Info
                    </p>
                </div>
                <div
                    className={
                        menu === 6 ? "menu_item_div_click" : "menu_item_div"
                    }
                    onClick={() => onClickMenu(6)}
                >
                    <div
                        style={
                            menu === 6
                                ? {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "#DFB1E4",
                                      position: "absolute",
                                      left: "0",
                                  }
                                : {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "white",
                                      position: "absolute",
                                      left: "0",
                                  }
                        }
                    ></div>
                    <p
                        id={
                            menu === 6
                                ? "side_menu_item_click"
                                : "side_menu_item"
                        }
                    >
                        Add Admin Id
                    </p>
                </div>
                <div
                    className={
                        menu === 7 ? "menu_item_div_click" : "menu_item_div"
                    }
                    onClick={() => onClickMenu(7)}
                >
                    <div
                        style={
                            menu === 7
                                ? {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "#DFB1E4",
                                      position: "absolute",
                                      left: "0",
                                  }
                                : {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "white",
                                      position: "absolute",
                                      left: "0",
                                  }
                        }
                    ></div>
                    <p
                        id={
                            menu === 7
                                ? "side_menu_item_click"
                                : "side_menu_item"
                        }
                    >
                        Manage Inquiry
                    </p>
                </div>
                <div
                    className={
                        menu === 8 ? "menu_item_div_click" : "menu_item_div"
                    }
                    onClick={() => onClickMenu(8)}
                >
                    <div
                        style={
                            menu === 8
                                ? {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "#DFB1E4",
                                      position: "absolute",
                                      left: "0",
                                  }
                                : {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "white",
                                      position: "absolute",
                                      left: "0",
                                  }
                        }
                    ></div>
                    <p
                        id={
                            menu === 8
                                ? "side_menu_item_click"
                                : "side_menu_item"
                        }
                    >
                        Manage Etc
                    </p>
                </div>
                <div
                    className={
                        menu === 9 ? "menu_item_div_click" : "menu_item_div"
                    }
                    onClick={() => onClickMenu(9)}
                >
                    <div
                        style={
                            menu === 9
                                ? {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "#DFB1E4",
                                      position: "absolute",
                                      left: "0",
                                  }
                                : {
                                      width: "7px",
                                      height: "55px",
                                      backgroundColor: "white",
                                      position: "absolute",
                                      left: "0",
                                  }
                        }
                    ></div>
                    <p
                        id={
                            menu === 9
                                ? "side_menu_item_click"
                                : "side_menu_item"
                        }
                    >
                        Delete User
                    </p>
                </div>
            </div>
        </>
    );
};

export default SideMenu;
