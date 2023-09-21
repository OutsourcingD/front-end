export type HospitalReviewDto = {
  id: number;
  title: string;
  doctorName: string;
  partList: string[];
  createdAt: string;
  viewCount: number;
  commentCount: number;
  totalPages: number;
};
