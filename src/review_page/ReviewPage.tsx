import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ReviewPage.css";
import axios from "axios";
import { ReviewDetailDto } from "../dto/ReviewDetailDto";
import Slider from "react-slick";
import Footer from "../bottom/Footer";
import { CommentDto } from "../dto/CommentDto";
import CommentItem from "../components/CommentItem";

interface UserInfo {
    nickname: string;
    profile: string;
}

function ReviewPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [reviewDetail, setReviewDetail] =
        React.useState<ReviewDetailDto | null>(null); // 검색 여부 [true: 검색, false: 검색x
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        afterChange: (current: React.SetStateAction<number>) =>
            setCurrentSlide(current),
    };
    const navigate = useNavigate();
    const avgReages = [0, 1, 2, 3, 4];
    const [comments, setComments] = React.useState<CommentDto[]>([]);
    const [userInfo, setUserInfo] = React.useState<UserInfo>({} as UserInfo);
    const [isReply, setIsReply] = React.useState<number>(0);
    const [content, setContent] = React.useState<string>("");
    const [event, setEvent] = React.useState<number>(0);

    const onDelete = () => {
        axios({
            method: "delete",
            url: `/api/review/remove`,
            params: {
                reviewId: queryParams.get("reviewId"),
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                )}`,
            },
        }).then((res) => {
            navigate("/");
        }).catch((err) => {
            console.log(err)
        })
    }

    const likeEvent = (id: number, isLiked: boolean) => {
        axios({
            method: "post",
            url: `/api/comment/like`,
            data: {
                commentId: id,
                liked: !isLiked,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setEvent((count) => count + 1);
        }).catch((err) => {
            console.log(err)
        });
    }

    const deleteEvent = (commentId: number) => {
        axios({
            method: "delete",
            url: `/api/comment/remove`,
            params: {
                commentId: commentId,
                reviewId: queryParams.get("reviewId"),
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) => {
            setEvent((count) => count + 1);
        }).catch((err) => {
            alert(err.status);
        })
    };

    const onSubmit = () => {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("parentId", isReply.toString());
        formData.append("reviewId", queryParams.get("reviewId") || "");

        if(content === "") {
            alert("Please input comment")
            return;
        }

        axios({
            method: "post",
            url: `/api/comment/add`,
            data: {
                content: content,
                reviewId: queryParams.get("reviewId"),
                parentId: isReply,
            },
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                )}`,
            },
        }).then((res) => {
            setIsReply(0);
            setEvent((event) => event + 1);
            setContent("");
        }).catch((err) => {
            console.log(err)
        })
    }

    const replyEvent = (reply: number) => {
        setIsReply(reply);
    }

    const getUserInfo = () => {
        axios({
            method: "get",
            url: `/api/member/info`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                )}`,
            },
        }).then((res) => {
            setUserInfo(res.data);
        }).catch((err) => {
            if (
                err.response.status === 403 ||
                err.response.status === 401
            ) {
                alert("Token is not exist.");
            } else {
                alert("Server Error" + err.response.status);
            }
        });
    }

    const getParentComment = (reviewId: string) => {
        axios({
            method: "get",
            url: `/api/comment/`,
            params: {
                reviewId: reviewId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                )}`,
            },
        }).then((res) => {
            setComments(res.data);
        }).catch((err) => {
            if (
                err.response.status === 403 ||
                err.response.status === 401
            ) {
                alert("Token is not exist.");
            } else {
                alert("Server Error" + err.response.status);
            }
        });
    }

    useEffect(() => {
        const reviewId = queryParams.get("reviewId");

        if (reviewDetail === null) {
            axios({
                method: "get", // or 'post', 'put', etc.
                url: `/api/review/detail?reviewId=${reviewId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "access_token"
                    )}`,
                },
            })
                .then((res) => {
                    setReviewDetail(res.data);
                })
                .catch((err) => {
                    if (
                        err.response.status === 403 ||
                        err.response.status === 401
                    ) {
                        alert("review page Please the login.");
                        navigate("/login");
                    } else {
                        alert("Server Error" + err.response.status);
                        navigate("/");
                    }
                });
        }

        
        if(reviewId !== null) {
            getParentComment(reviewId);
            getUserInfo();
        }
    }, [isReply, event]);

    return (
        <div className="review_detail_div">
            <div className="review_detail_wrapper">
                <div className="tags_div">
                    {reviewDetail?.partList.map((part) => {
                        return (
                            <div className="tag_div" key={part}>
                                <p id="tag">{part}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="review_detail_title_div">
                    <p id="review_detail_title">{reviewDetail?.title}</p>
                </div>
                <div className="profile_edit_div">
                    <div className="profile_left_div">
                        <div className="profile_info_div">
                            <img
                                src={reviewDetail?.profileImgUrl}
                                alt={reviewDetail?.nickname}
                                id="profile_picture"
                            />
                        </div>
                        <div className="profile_info_text_div">
                            <p id="nickname">{reviewDetail?.nickname}</p>
                            <p id="date">{reviewDetail?.createdAt}</p>
                        </div>
                    </div>
                    <div className="profile_right_div">
                        {reviewDetail?.isMyReview ? <>
                        {/*<p id="post_edit_button" onClick={() => console.log("edit")}>edit</p>*/}
                        <p id="post_delete_button" onClick={onDelete}>delete</p>
                        </>
                        : null}
                    </div>
                </div>
                <div className="review_page_hr_div">
                    <hr style={{ width: "100%" }} />
                </div>
                <div className="review_detail_image_div">
                    <Slider {...settings}>
                        {reviewDetail?.imageList.map((image) => {
                            return (
                                <>
                                    <div
                                        className="review_detail_image_item_div"
                                        key={image.imageId}
                                    >
                                        <img
                                            src={image.url}
                                            alt=""
                                            id="review_detail_img"
                                        />
                                    </div>
                                    <div className="review_detail_image_item_description_div">
                                        <p id="review_detail_image_number">
                                            {image.description}
                                        </p>
                                    </div>
                                </>
                            );
                        })}
                    </Slider>
                </div>
                <div className="review_first_detail">
                    <p id="first_review_title">1st review</p>
                    <p id="review_created_at">{reviewDetail?.createdAt}</p>
                </div>
                <div className="review_first_detail_div">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: reviewDetail?.content || "",
                        }}
                    />
                </div>
                <div className="review_info">
                    <p>tag</p>
                </div>
                <div className="review_page_review_info_div">
                    <p id="review_page_review_info_text">review info</p>
                    <hr id="review_page_review_hr" />
                </div>
                <div className="review_page_doctor_info_div">
                    <div className="doctor_image_div">
                        <img
                            src={reviewDetail?.doctorImg}
                            alt={reviewDetail?.doctorName}
                            id="doctor_image"
                        />
                    </div>
                    <div className="review_page_doctor_detail_info_div">
                        <p id="review_page_doctor_name">
                            Dr. {reviewDetail?.doctorName}
                        </p>
                        <p id="review_page_hospital_name">
                            {reviewDetail?.hospitalName}
                        </p>
                    </div>
                    <div className="review_page_star_div">
                        {avgReages.map((avgReage) => {
                            return reviewDetail?.doctorAvgRate !== undefined &&
                                avgReage + 1 <= reviewDetail?.doctorAvgRate ? (
                                <div className="star_div">
                                    <img
                                        src="/star.png"
                                        alt=""
                                        id="review_star"
                                    />
                                </div>
                            ) : (
                                <div className="star_div">
                                    <img
                                        src="/star_empty.png"
                                        alt=""
                                        id="review_star"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <div className="detail_quality_info_div">
                        <div className="detail_quality_info_left_div">
                            <p id="quality_data">consulting</p>
                            <div className="review_page_detail_star_div">
                                {avgReages.map((avgReage) => {
                                    return reviewDetail?.doctorConsulting !==
                                        undefined &&
                                        avgReage + 1 <=
                                            reviewDetail?.doctorConsulting ? (
                                        <div className="detail_star_div">
                                            <img
                                                src="/star.png"
                                                alt=""
                                                id="review_detail_star"
                                            />
                                        </div>
                                    ) : (
                                        <div className="detail_star_div">
                                            <img
                                                src="/star_empty.png"
                                                alt=""
                                                id="review_detail_star"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <p id="quality_data">doctor care</p>
                        <div className="review_page_detail_star_div">
                            {avgReages.map((avgReage) => {
                                return reviewDetail?.doctorCare !==
                                    undefined &&
                                    avgReage + 1 <=
                                        reviewDetail?.doctorCare ? (
                                    <div className="detail_star_div">
                                        <img
                                            src="/star.png"
                                            alt=""
                                            id="review_detail_star"
                                        />
                                    </div>
                                ) : (
                                    <div className="detail_star_div">
                                        <img
                                            src="/star_empty.png"
                                            alt=""
                                            id="review_detail_star"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="detail_quality_info_div">
                        <div className="detail_quality_info_left_div">
                            <p id="quality_data">satisfy</p>
                            <div className="review_page_detail_star_div">
                                {avgReages.map((avgReage) => {
                                    return reviewDetail?.doctorSatisfy !==
                                        undefined &&
                                        avgReage + 1 <=
                                            reviewDetail?.doctorSatisfy ? (
                                        <div className="detail_star_div">
                                            <img
                                                src="/star.png"
                                                alt=""
                                                id="review_detail_star"
                                            />
                                        </div>
                                    ) : (
                                        <div className="detail_star_div">
                                            <img
                                                src="/star_empty.png"
                                                alt=""
                                                id="review_detail_star"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <p id="quality_data">doctor manner</p>
                        <div className="review_page_detail_star_div">
                            {avgReages.map((avgReage) => {
                                return reviewDetail?.doctorManner !==
                                    undefined &&
                                    avgReage + 1 <=
                                        reviewDetail?.doctorManner ? (
                                    <div className="detail_star_div">
                                        <img
                                            src="/star.png"
                                            alt=""
                                            id="review_detail_star"
                                        />
                                    </div>
                                ) : (
                                    <div className="detail_star_div">
                                        <img
                                            src="/star_empty.png"
                                            alt=""
                                            id="review_detail_star"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="detail_quality_info_div">
                        <p id="quality_data">communication</p>
                        <div className="review_page_detail_star_div">
                            {avgReages.map((avgReage) => {
                                return reviewDetail?.doctorCommunication !==
                                    undefined &&
                                    avgReage + 1 <=
                                        reviewDetail?.doctorCommunication ? (
                                    <div className="detail_star_div">
                                        <img
                                            src="/star.png"
                                            alt=""
                                            id="review_detail_star"
                                        />
                                    </div>
                                ) : (
                                    <div className="detail_star_div">
                                        <img
                                            src="/star_empty.png"
                                            alt=""
                                            id="review_detail_star"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="review_page_doctor_info_div">
                    <div className="doctor_image_div">
                        <img
                            src={reviewDetail?.hospitalImg}
                            alt={reviewDetail?.hospitalName}
                            id="doctor_image"
                        />
                    </div>
                    <div className="review_page_doctor_detail_info_div">
                        <p id="review_page_doctor_name">
                            {reviewDetail?.hospitalName}
                        </p>
                        <p id="review_page_hospital_name">
                            {reviewDetail?.location}
                        </p>
                    </div>
                    <div className="review_page_star_div">
                        {avgReages.map((avgReage) => {
                            return reviewDetail?.hospitalAvgRate !==
                                undefined &&
                                avgReage + 1 <=
                                    reviewDetail?.hospitalAvgRate ? (
                                <div className="star_div">
                                    <img
                                        src="/star.png"
                                        alt=""
                                        id="review_star"
                                    />
                                </div>
                            ) : (
                                <div className="star_div">
                                    <img
                                        src="/star_empty.png"
                                        alt=""
                                        id="review_star"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <div className="detail_quality_info_div">
                        <div className="detail_quality_info_left_div">
                            <p id="quality_right_data">facility</p>
                            <div className="review_page_detail_star_div">
                                {avgReages.map((avgReage) => {
                                    return reviewDetail?.hospitalFacility !==
                                        undefined &&
                                        avgReage + 1 <=
                                            reviewDetail?.doctorConsulting ? (
                                        <div className="detail_star_div">
                                            <img
                                                src="/star.png"
                                                alt=""
                                                id="review_detail_star"
                                            />
                                        </div>
                                    ) : (
                                        <div className="detail_star_div">
                                            <img
                                                src="/star_empty.png"
                                                alt=""
                                                id="review_detail_star"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <p id="quality_right_data">system</p>
                        <div className="review_page_detail_star_div">
                            {avgReages.map((avgReage) => {
                                return reviewDetail?.hospitalSystem !==
                                    undefined &&
                                    avgReage + 1 <=
                                        reviewDetail?.hospitalSystem ? (
                                    <div className="detail_star_div">
                                        <img
                                            src="/star.png"
                                            alt=""
                                            id="review_detail_star"
                                        />
                                    </div>
                                ) : (
                                    <div className="detail_star_div">
                                        <img
                                            src="/star_empty.png"
                                            alt=""
                                            id="review_detail_star"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="detail_quality_info_div">
                        <div className="detail_quality_info_left_div">
                            <p id="quality_right_data">price</p>
                            <div className="review_page_detail_star_div">
                                {avgReages.map((avgReage) => {
                                    return reviewDetail?.hospitalPrice !==
                                        undefined &&
                                        avgReage + 1 <=
                                            reviewDetail?.hospitalPrice ? (
                                        <div className="detail_star_div">
                                            <img
                                                src="/star.png"
                                                alt=""
                                                id="review_detail_star"
                                            />
                                        </div>
                                    ) : (
                                        <div className="detail_star_div">
                                            <img
                                                src="/star_empty.png"
                                                alt=""
                                                id="review_detail_star"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <p id="quality_right_data">location</p>
                        <div className="review_page_detail_star_div">
                            {avgReages.map((avgReage) => {
                                return reviewDetail?.hospitalLocation !==
                                    undefined &&
                                    avgReage + 1 <=
                                        reviewDetail?.hospitalLocation ? (
                                    <div className="detail_star_div">
                                        <img
                                            src="/star.png"
                                            alt=""
                                            id="review_detail_star"
                                        />
                                    </div>
                                ) : (
                                    <div className="detail_star_div">
                                        <img
                                            src="/star_empty.png"
                                            alt=""
                                            id="review_detail_star"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="review_comment">
                    <div className="comment_detail_div">
                        <p id="comments_length">{comments.length}</p>
                        <p id="comment_detail_text">comment</p>
                    </div>
                    <hr id="comment_horizontal_tag"/>
                </div>
                <div className="comment_list_div">
                    {
                        comments.map((comment) => {
                            return (
                                <CommentItem commentDto={comment} changeEvent={replyEvent} onDelete={deleteEvent} likeEvent={likeEvent} />
                            )
                        })
                    }
                </div>
                <div className="comment_text_area_div">
                    <div className="comment_input_profile_div">
                        <img src={userInfo.profile} alt="" id="comment_input_profile_img" />
                        <p id="comment_input_profile_nickname">{userInfo.nickname}</p>
                    </div>
                    <textarea id="comment_input_textarea" value={content} onChange={(e) => setContent(e.target.value)} placeholder={isReply !== 0 ? "input reply comment" : "input comment"}></textarea>
                    <div className="comment_input_bottom_div">
                        <img src="/comment_camera.png" alt="" id="comment_input_camera_img" />
                        <div className="comment_input_add_text_div">
                            <p id="comment_input_add_text" onClick={onSubmit}>Add</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ReviewPage;
