type ImageVo = {
  description: string;
  imageId: number;
  url: string;
};

export type DoctorResponseDto = {
  doctorId: number;
  doctorName: string;
  hospitalName: string;
  imageVo: ImageVo;
  totalPages: number;
};
