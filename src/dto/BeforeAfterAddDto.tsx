export type BeforeAfterAddDto = {
    doctorId : number;
    hospitalId: number;
    doctorName: string;
    hospitalName: string;
    beforeImage: File[];
    afterImage: File[];
    part: string[];
    beforeAfterPeriod: string[];
}