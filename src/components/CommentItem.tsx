import React from "react";
import { CommentDto } from "../dto/CommentDto";
import "./CommentItem.css";
import ReplyCommentItem from "./ReplyCommentItem";
import axios from "axios";
import { useLocation } from "react-router-dom";

const CommentItem = (props: CommentDto) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [commentList, setCommentList] = React.useState<CommentDto[]>([]);

    React.useEffect(() => {
        const reviewId = queryParams.get("reviewId");

        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/api/comment/child`,
            params: {
                reviewId: reviewId,
                parentId: props.commentId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((res) => {
                setCommentList(res.data);
            })
            .catch((err) => {
                console.log(err.status);
            });
    }, []);

    return (
        <div className="comment_parent_div">
            {/* profile section */}
            <div className="comment_parent_profile_div">
                <div className="comment_parent_profile_left_div">
                    <div className="comment_item_profile_img_div">
                        <img
                            src={props.profileImg}
                            alt=""
                            id="comment_item_profile_img"
                        />
                    </div>
                    <div className="comment_item_profile_info_div">
                        <p id="comment_item_nickname">{props.nickname}</p>
                        <p id="comment_item_created_at">{props.updatedAt}</p>
                    </div>
                    <div className="comment_item_comment_icon_div">
                        <img
                            src="/chat.png"
                            alt=""
                            id="comment_item_comment_icon"
                        />
                    </div>
                </div>
                <div className="comment_parent_profile_right_div">
                    <img src="like.png" alt="" id="like" />
                    <p id="comment_item_like_count">{props.likeCount}</p>
                    <img src="hate.png" alt="" id="like" />
                    <p id="comment_item_unlike_count">{props.unlikeCount}</p>
                </div>
            </div>
            {/* 본문 */}
            <div className="comment_item_content_div">
                <p id="comment_item_content">{props.content}</p>
            </div>
            {/* 버튼 섹션 */}
            <div className="comment_item_button_div">
                <div className="comment_item_add_button_div">
                    <p id="comment_item_add_button">Add</p>
                </div>
                <div className="comment_item_edit_delete_button_div">
                    <div className="comment_item_edit_button_div">
                        <p id="comment_item_edit_button">edit</p>
                    </div>
                    <div className="comment_item_delete_button_div">
                        <p id="comment_item_delete_button">delete</p>
                    </div>
                </div>
            </div>
            <div className="reply_comment_div">
                {commentList.map((comment) => {
                    return <ReplyCommentItem {...comment} />;
                })}
            </div>
        </div>
    );
};

export default CommentItem;
