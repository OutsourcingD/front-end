type ImageVo = {
  imageId: number;
  description: string;
  url: string;
};

export type DoctorDetailDto = {
  postId: number;
  partList: string[];
  imageVo: ImageVo[];
  title: string;
  introduction: string;
  content: string;
  doctorName: string;
  mainImage: string;
  hospitalName: string;
  location: string;
  avgRate: number;
  createdAt: string;
};
