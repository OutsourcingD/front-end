export type FindIdDto = {
    createdAt: string;
    userId: string;
    revert: (id: boolean) => void;
}