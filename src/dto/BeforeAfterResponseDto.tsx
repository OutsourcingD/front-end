type BeforeAfterVo = {
    "beforeImg": string,
    "afterImg": string,
    "beforeAfterPeriod": string
  }

export type BeforeAfterResponseDto = {
    "beforeAfterVo": BeforeAfterVo
    "hospitalName": string,
    "doctorName": string,
    "partList": string[],
    "totalPages": number,
    "createdAt": string,
    "nickname": string,
    "profileImg": string,
    "isMyBeforeAfter": boolean
  }