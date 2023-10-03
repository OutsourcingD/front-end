type Image = {
    imageId: number;
    description: string;
    url: string;
}

export type HospitalDetailDto = {
    partList: string[];
    imageList: Image[];
    title: string;
    content: string;
    location: string;
    avgRage: number;
    createdAt: string;
    hospitalId: number;
    hospitalName: string;
    introduction: string;
    mainImage: string;
}