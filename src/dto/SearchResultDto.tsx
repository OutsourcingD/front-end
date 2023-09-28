export type SearchResponseDto = {
    commentCount: number;
    createdAt: string;
    doctorId: number;
    doctorName: string;
    hospitalId: number;
    hospitalName: string;
    isMyReview: boolean;
    likeCount: number;
    nickname: string;
    part: string[];
    profile: string;
    reviewId: number;
    title: string;
    totalElements: number;
    totalPages: number;
    viewCount: number;
};
