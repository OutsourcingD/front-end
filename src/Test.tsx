import React, { useState } from "react";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import Slider from "react-slick";
import axios from "axios";
import { BeforeDto } from "./dto/BeforeDetailDto";
import "./components/BeforeDetail.css";
import PartCategory from "./review_page/PartCategory";

const Container = styled.div`
    width: 100%;
`;

const RowBox = styled.div`
    width: 100%;
    display: flex;
`;

const Viewer = styled.div`
    width: calc(50% - 40px);
    height: 400px;
    padding: 20px;
    margin-top: 20px;
    border: 2px solid gray;
`;

const Test = () => {
    return (
        <div className="before_page_div_disabled">
            <div
                style={{
                    width: "1000px",
                    height: "1400px",
                    position: "absolute",
                    backgroundColor: "white",
                    boxShadow: "0px 4px 11px rgba(0, 0, 0, 0.08)",
                    borderRadius: "15px",
                    left: "450px",
                    top: "170px",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "20px 10px",
                    }}
                >
                    <p>category</p>
                    <p>doctor</p>
                    <p>hospital</p>
                    <p>before-after</p>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "0 0 10px 10px", //top right bottom left
                    }}
                >
                    <p style={{marginRight: "10px"}}>name</p>
                    <form>
                        <input placeholder="Please enter doctor name" />
                    </form>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "10px 10px",
                    }}
                >
                    <p>Part</p>
                    <div style={{width: "300px"}}>
                        <PartCategory />
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "20px 10px",
                    }}
                >
                    <p>Title</p>
                    <form>
                        <input placeholder="Please enter title" />
                    </form>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "20px 10px",
                    }}
                >
                    <p>Description</p>
                    <form>
                        <input placeholder="Please enter description" />
                    </form>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "20px 10px",
                    }}
                >
                    <p>Add picture</p>
                    <p>Maximum: 10</p>
                    {/* 사진 */}
                    <div className="make_review_picture_div">
                        <p id="make_review_sub_title_text">사진추가</p>
                        <p id="make_review_add_picture_warning">
                            사진은 최대 10장까지 가능해요
                        </p>
                    </div>
                    <div className="make_review_pictures_div">
                        {
                            <div className="make_review_add_picture_wrapper">
                                <div className="make_review_add_picture_div">
                                    <div className="add_picture_wrapper">
                                        <img
                                            src="/add_picture.png"
                                            alt=""
                                            id="make_review_picture"
                                        />
                                    </div>
                                    <p id="add_picture">add picture</p>
                                </div>
                            </div>
                        }
                        <div className="add_picture_button">
                            <div className="add_picture_plus_div">
                                <img
                                    src="/add_picture_plus.png"
                                    alt=""
                                    id="add_picture_plus"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;

/*
  background: #FFFFFF;
    border: 1px solid #D4D4D4;
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.08);
    border-radius: 15px;
    left: 450px;
    top: 170px;
    z-index: 10;
*/
