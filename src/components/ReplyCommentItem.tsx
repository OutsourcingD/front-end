import React from "react";
import { CommentDto } from "../dto/CommentDto";
import "./ReplyCommentItem.css"

interface ReplyCommentItemProps {
    commentDto: CommentDto;
    deleteEvent: (commentId: number) => void;
    replyEvent: (reply: number) => void;
    likeEvent: (id: number, isLike: boolean) => void;
}

const ReplyCommentItem = (props: ReplyCommentItemProps) => {
    const onDeleted = () => {
        props.deleteEvent(props.commentDto.commentId);
    }

    const likeEvent = () => {
        props.likeEvent(props.commentDto.commentId, props.commentDto.isLiked);
    };

    return (
        <div className="comment_parent_div">
            {/* profile section */}
            <div className="comment_parent_profile_div">
                <div className="comment_parent_profile_left_div">
                    <div className="comment_item_profile_img_div">
                        <img src={props.commentDto.profileImg} alt="" id="comment_item_profile_img"/>
                    </div>
                    <div className="comment_item_profile_info_div">
                        <p id="comment_item_nickname">{props.commentDto.nickname}</p>
                        <p id="comment_item_created_at">{props.commentDto.updatedAt}</p>
                    </div>
                    <div className="comment_item_comment_icon_div">
                        <img src="/chat.png" alt="" id="comment_item_comment_icon"/>
                    </div>
                </div>
                <div className="comment_parent_profile_right_div">
                    <img src="like.png" alt="" id="like" onClick={likeEvent} />
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
            <div className="reply_comment_item_button_div">
                <div className="comment_item_edit_delete_button_div">
                    {
                        props.commentDto.isMyComment ? <>
                            {/*<div className="comment_item_edit_button_div">
                                <p id="comment_item_edit_button">edit</p>
                    </div>*/}
                            <div className="comment_item_delete_button_div">
                                <p id="comment_item_delete_button" onClick={onDeleted}>delete</p>
                            </div>
                        </> : null
                    }
                </div>
            </div>
        </div>
    )
};

export default ReplyCommentItem;