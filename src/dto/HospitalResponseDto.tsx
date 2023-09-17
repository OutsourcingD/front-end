type HospitalImg = {
  description: string;
  imageId: number;
  url: string;
};

export type HospitalResponseDto = {
  postId: number;
  hospitalImg: HospitalImg;
  name: string;
  location: string;
  totalPages: number;
};
