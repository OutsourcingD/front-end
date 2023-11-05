export type DoctorPostAddDto = {
    type: number;
    title: string;
    name: string;
    part: string;
    introduction: string;
    postImageList: File[];
}