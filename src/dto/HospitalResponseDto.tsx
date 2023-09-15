type HospitalImg = {
  description: string;
  imageId: number;
  url: string;
};

export type HospitalResponseDto = {
  hospitalId: number;
  hospitalImg: HospitalImg;
  hospitalName: string;
  location: string;
  totalPages: number;
};
