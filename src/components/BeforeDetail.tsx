import React, { useEffect } from "react";
import "./BeforeDetail.css";
import axios from "axios";
import { BeforeDto } from "../dto/BeforeDetailDto";
import { useNavigate } from "react-router-dom";

interface BeforeDetailProps {
    id: number;
}

const BeforeDetail = (props: BeforeDetailProps) => {
    const [beforeDetail, setBeforeDetail] = React.useState<BeforeDto>();
    const [imageIndex, setImageIndex] = React.useState(0);
    const [maxImage, setMaxImage] = React.useState(0);
    const [first, setFirst] = React.useState(true);
    const [last, setLast] = React.useState(false);
    const navigate = useNavigate();

    const handleLeftArrow = () => {
        if (imageIndex < maxImage) {
            setImageIndex(imageIndex - 1);
        }
    };

    const handleRightArrow = () => {
        if (imageIndex >= 0) {
            setImageIndex(imageIndex + 1);
        }
    };

    React.useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/review/before-after/detail?id=${props.id}`,
        }).then((res) => {
            console.log(res.data);
            setBeforeDetail(res.data);
            setMaxImage(res.data.beforeAfterVo.length);
            res.data.beforeAfterVo.length === 1
                ? setLast(true)
                : setLast(false);
        }).catch((err) => {
            alert(`Contact to developer2. ${err.status}`);
            navigate("/");
        });
    }, []);

    React.useEffect(() => {
        if(imageIndex === 0) {
            setFirst(true);
        } else {
            setFirst(false);
        }

        if(imageIndex === maxImage - 1) {
            setLast(true);
        } else {
            setLast(false);
        }
    }, [imageIndex]);

    return (
        <div className="before_detail_container" onClick={(event) => event.stopPropagation()}>
            <div className="left_arrow_div">
                {!first ? (
                    <img
                        src="/left-arrow.png"
                        alt=""
                        id="arrow"
                        onClick={handleLeftArrow}
                    />
                ) : (
                    <img src="/left-arrow-gray.png" alt="" id="arrow" />
                )}
            </div>
            <div className="before_detail_body_div">
                <div className="before_detail_top_body">
                    <div className="before_detail_image_item_div">
                        <div className="before_detail_left_image_div">
                            <img
                                src={
                                    beforeDetail?.beforeAfterVo[imageIndex]
                                        .beforeImg
                                }
                                alt=""
                                id="before_detail_left_image"
                            />
                            <div className="before_detail_period">
                                <p id="before_detail_period">
                                    {
                                        beforeDetail?.beforeAfterVo[imageIndex]
                                            .beforeAfterPeriod
                                    }{" "}
                                    before
                                </p>
                            </div>
                            <div className="before_detail_period_blur">
                                <p id="before_detail_period">
                                    {
                                        beforeDetail?.beforeAfterVo[imageIndex]
                                            .beforeAfterPeriod
                                    }{" "}
                                    before
                                </p>
                            </div>
                        </div>
                        <div className="before_detail_image_div">
                            <img
                                src={
                                    beforeDetail?.beforeAfterVo[imageIndex]
                                        .afterImg
                                }
                                alt=""
                                id="before_detail_right_image"
                            />
                            <div className="before_detail_period">
                                <p id="before_detail_period">
                                    {
                                        beforeDetail?.beforeAfterVo[imageIndex]
                                            .beforeAfterPeriod
                                    }{" "}
                                    after
                                </p>
                            </div>
                            <div className="before_detail_period_blur">
                                <p id="before_detail_period">
                                    {
                                        beforeDetail?.beforeAfterVo[imageIndex]
                                            .beforeAfterPeriod
                                    }{" "}
                                    after
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="before_detail_bottom_body">
                    <div className="before_detail_left_bottom_div">
                        <div className="before_detail_doctor_info_div">
                            <p id="before_detail_hospital">{beforeDetail?.hospitalName}</p>
                            <p id="before_detail_slash">/</p>
                            <p id="before_detail_doctor">{beforeDetail?.doctorName}</p>
                        </div>
                        <div className="before_detail_period_div">
                            {
                                beforeDetail?.partList.map((item, index) => {
                                    return (
                                        <div className="before_detail_category_div">
                                            <p id="before_detail_category_text">{item}</p>
                                        </div>
                                    )
                                })
                            }
                            <p id="before_detail_after_period">{beforeDetail?.beforeAfterVo[imageIndex].beforeAfterPeriod} 후</p>
                        </div>
                    </div>
                    <div className="before_detail_right_bottom_div">
                        <p id="before_detail_date">{beforeDetail?.createdAt}</p>
                        <p id="before_detail_nickname">{beforeDetail?.nickname}</p>
                    </div>
                </div>
            </div>
            <div className="left_arrow_div">
                {!last ? (
                    <img
                        src="/right-arrow.png"
                        alt=""
                        id="arrow"
                        onClick={handleRightArrow}
                    />
                ) : (
                    <img src="/right-arrow-gray.png" alt="" id="arrow" />
                )}
            </div>
        </div>
    );
};

export default BeforeDetail;
