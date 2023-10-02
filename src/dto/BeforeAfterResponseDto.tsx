type BeforeAfterVo = {
    beforeImg: string;
    afterImg: string;
    beforeAfterPeriod: string;
};

export type BeforeAfterResponseDto = {
    beforeAfterVo: BeforeAfterVo;
    id: number;
    totalPages: number;
};
