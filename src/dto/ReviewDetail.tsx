type ChildReviewList = {
  content: string;
  createdAt: string;
  id: number;
  isLiked: boolean;
  likeCount: number;
  unLikeCount: number;
  updatedAt: string;
};

type ImageVo = {
  description: string;
  imageId: number;
  url: string;
};

export type ReviewDetailDto = {
  childReviewList: ChildReviewList[];
  content: string;
  createdAt: string;
  doctorAvgRate: number;
  doctorCare: number;
  doctorCommunication: number;
  doctorConsulting: number;
  doctorImg: string;
  doctorManner: number;
  doctorName: string;
  doctorSatisfy: number;
  employeeManner: number;
  hospitalAvgRate: number;
  hospitalFacility: number;
  hospitalImg: string;
  hospitalLocation: number;
  hospitalName: string;
  hospitalPrice: number;
  hospitalSystem: number;
  imageList: ImageVo[];
  isLiked: boolean;
  likeCount: number;
  location: string;
  nickname: string;
  partList: string[];
  profileImgUrl: string;
  reviewId: number;
  title: string;
  unLikeCount: number;
};
