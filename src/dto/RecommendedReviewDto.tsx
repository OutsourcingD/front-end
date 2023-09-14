export type ImageVo = {
    "description": string,
    "imageId": number,
    "url": string,
}


export type RecommendedReviewDto = {
    "imageVo": ImageVo,
    "parts": string[],
    "reviewId": number,
    "starRate": number,
    "hospitalName": string,
    "content": string,
    "doctorName": string,
    "title": string,
};