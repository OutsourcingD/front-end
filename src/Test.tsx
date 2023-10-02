import React, { useState } from "react";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import Slider from "react-slick";
import axios from "axios";
import { BeforeDto } from "./dto/BeforeDetailDto";
import "./components/BeforeDetail.css"

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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState("");
  const [beforeDetail, setBeforeDetail] = React.useState<BeforeDto>();

  const updateTextDescription = async (state: EditorState) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
  };


  const uploadCallback = () => {
    console.log("이미지 업로드");
  };

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
};

React.useEffect(() => {
    axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER_URL}/review/before-after/detail?id=${1}`,
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
    }).then((res) => {
        setBeforeDetail(res.data);
    });
}, []);

  return (
      <>
      <div>draft</div>
      <div className="before_detail_body_div">
                <div className="before_detail_top_body">
                {beforeDetail !== undefined &&
                            beforeDetail?.beforeAfterVo.map((item, index) => {
                                return (
                                    <div className="before_detail_image_item_div">
                                        <div className="before_detail_image_div">
                                            <img
                                                src={
                                                    beforeDetail
                                                        ?.beforeAfterVo[0]
                                                        .beforeImg
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className="before_detail_image_div">
                                            <img
                                                src={
                                                    beforeDetail
                                                        ?.beforeAfterVo[0]
                                                        .afterImg
                                                }
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                </div>
      
    </div>
    </>
  );
};

export default Test;