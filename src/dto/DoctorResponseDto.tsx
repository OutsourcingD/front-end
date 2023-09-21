type ImageVo = {
  description: string;
  imageId: number;
  url: string;
};

export type DoctorResponseDto = {
  postId: number;
  name: string;
  hospitalName: string;
  imageVo: ImageVo;
  totalPages: number;
};
