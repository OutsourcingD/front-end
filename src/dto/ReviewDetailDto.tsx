export type ChildReview = {
    "content": string,
    "createdAt": string,
    "id": number,
    "isLiked": boolean,
    "likeCount": number,
    "unLikeCount": number,
    "updatedAt": string
}

export type Image = {
    "description": string,
      "imageId": number,
      "url": string
}

export type ReviewDetailDto = {
    "childReviewList": ChildReview[],

    "content": "string",
  "createdAt": "2023-09-14",
  "doctorAvgRate": number,
  "doctorCare": number,
  "doctorCommunication": number,
  "doctorConsulting": number,
  "doctorImg": string,
  "doctorManner": number,
  "doctorName": string,
  "doctorSatisfy": number,
  "employeeManner": number,
  "hospitalAvgRate": number,
  "hospitalFacility": number,
  "hospitalImg": string,
  "hospitalLocation": number,
  "hospitalName": string,
  "hospitalPrice": number,
  "hospitalSystem": number,
  "isLiked": boolean,
  "likeCount": number,
  "location": string,
  "nickname": string,
  "partList": string[],

  "imageList": Image[],

  "profileImgUrl": string,
  "reviewId": number,
  "title": string,
  "unLikeCount": number
}