export type RecommendReviewDto = {
    "reviewId": number, 
    "totalPages": number,
    "title": string,
    "profile": string,
    "nickname": string,
    "createdAt": string,
    "hospitalName": string,
    "doctorName": string,
    "part": string[],
    "commentCount": number,
    "likeCount": number,
    "viewCount": number,
}