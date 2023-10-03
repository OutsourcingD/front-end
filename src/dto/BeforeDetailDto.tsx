type BeforeAfterVo = {
    afterImg: string;
    beforeAfterPeriod: string;
    beforeImg: string;
};

export type BeforeDto = {
    beforeAfterVo: BeforeAfterVo[];
    createdAt: string;
    doctorName: string;
    hospitalName: string;
    id: number;
    nickname: string;
    partList: string[];
    profileImg: string;
};
