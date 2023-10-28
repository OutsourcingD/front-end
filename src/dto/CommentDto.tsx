type ImageUrl = {
    description: string;
    imageId: number;
    url: string;
};

export type CommentDto = {
    commentId: number;
    content: string;
    createdAt: string;
    imgUrl: ImageUrl[];
    isLiked: boolean;
    isMyComment: boolean;
    likeCount: number;
    nickname: string;
    parentId: number;
    profileImg: string;
    unlikeCount: number;
    updatedAt: string;
};
