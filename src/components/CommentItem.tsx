import React from "react";
import { CommentDto } from "../dto/CommentDto";
import "./CommentItem.css";
import ReplyCommentItem from "./ReplyCommentItem";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface CommentItemProps {
    commentDto: CommentDto;
    changeEvent: (reply: number) => void;
    onDelete: (commentId: number) => void;
    likeEvent: (id: number, isLike: boolean) => void;
}

const CommentItem = (props: CommentItemProps) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [commentList, setCommentList] = React.useState<CommentDto[]>([]);
    const [count, setCount] = React.useState<number>(0);

    const replyEvent = (reply: number) => {
        props.changeEvent(reply);
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
            setCount((count) => count + 1);
        }).catch((err) => {
            alert(err.status);
        })
    };

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
            setCount((count) => count + 1);
        }).catch((err) => {
            console.log(err)
        });
    }

    React.useEffect(() => {
        const reviewId = queryParams.get("reviewId");

        axios({
            method: "get",
            url: `/api/comment/child`,
            params: {
                reviewId: reviewId,
                parentId: props.commentDto.commentId,
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
    }, [count]);

    return (
        <div className="comment_parent_div">
            {/* profile section */}
            <div className="comment_parent_profile_div">
                <div className="comment_parent_profile_left_div">
                    <div className="comment_item_profile_img_div">
                        <img
                            src={props.commentDto.profileImg}
                            alt=""
                            id="comment_item_profile_img"
                        />
                    </div>
                    <div className="comment_item_profile_info_div">
                        <p id="comment_item_nickname">{props.commentDto.nickname}</p>
                        <p id="comment_item_created_at">{props.commentDto.updatedAt}</p>
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
                    <img src="like.png" alt="" id="like" onClick={() => props.likeEvent(props.commentDto.commentId, props.commentDto.isLiked)}/>
                    <p id="comment_item_like_count">{props.commentDto.likeCount}</p>
                    <img src="hate.png" alt="" id="like" />
                    <p id="comment_item_unlike_count">{props.commentDto.unlikeCount}</p>
                </div>
            </div>
            {/* 본문 */}
            <div className="comment_item_content_div">
                <p id="comment_item_content">{props.commentDto.content}</p>
            </div>
            {/* 버튼 섹션 */}
            <div className="comment_item_button_div">
                <div className="comment_item_add_button_div">
                    <p id="comment_item_add_button" onClick={() => props.changeEvent(props.commentDto.commentId)}>Add</p>
                </div>
                <div className="comment_item_edit_delete_button_div">
                    {props.commentDto.isMyComment ? (
                        <>
                            {/*
                            <div className="comment_item_edit_button_div">
                                <p id="comment_item_edit_button">edit</p>
                            </div>
                    */}
                            <div className="comment_item_delete_button_div">
                                <p id="comment_item_delete_button" onClick={() => props.onDelete(props.commentDto.commentId)}>delete</p>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
            <div className="reply_comment_div">
                {commentList.map((comment) => {
                    return <ReplyCommentItem commentDto={comment} deleteEvent={deleteEvent} replyEvent={replyEvent} likeEvent={likeEvent}/>;
                })}
            </div>
        </div>
    );
};

export default CommentItem;
