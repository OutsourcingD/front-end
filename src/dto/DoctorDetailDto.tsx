type ImageVo = {
  imageId: number;
  description: string;
  url: string;
};

export type DoctorDetailDto = {
  postId: number;
  partList: string[];
  imageVo: ImageVo[];
  introduction: string;
  content: string;
  location: string;
  avgRate: number;
  createdAt: string;
};
