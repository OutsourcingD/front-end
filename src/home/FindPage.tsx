import React, { useEffect } from "react";
import "./FindPage.css";
import FindIdPageItem from "./FindIdPageItem";
import FindPwdPage from "./FindPwdPage";
import IdInfoPage from "./IdInfoPage";
import PwdSettingPage from "./PwdSettingPage";
import Footer from "../bottom/Footer";
import { FindIdDto } from "../dto/FindIdDto";

const FindPage = () => {
    const [isId, setIsId] = React.useState<boolean>(true);
    const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
    const [inResult, setInResult] = React.useState<FindIdDto>({} as FindIdDto);
    const [idResult, setIdResult] = React.useState<boolean>(false);

    const handleEmail = (email: string) => {};

    const setResult = (result: FindIdDto) => {
        setInResult(result);
        setIsSubmit(true);
        setIdResult(true);
    };

    const setPwdResult = (result: FindIdDto) => {
        setInResult(result);
        setIsSubmit(true);
        setIdResult(false);
    }

    const revert = (id: boolean) => {
        setIsId(id);
        setIsSubmit(false);
    };

    return (
        <div className="find_page_div">
            <div className="find_page_title_div">
                {isId ? (
                    <p id="find_id_sub_title">Find Id Page</p>
                ) : (
                    <p id="find_id_sub_title">Find PWD Page</p>
                )}
                <div className="find_div">
                    <div className="find_page_head_div">
                        <div
                            className={
                                isId
                                    ? "find_id_container"
                                    : "find_id_container_click"
                            }
                            onClick={() => setIsId(true)}
                        >
                            <p id="find_id_page_input_title">Find Id</p>
                        </div>
                        <div
                            className={
                                !isId
                                    ? "find_pwd_container"
                                    : "find_pwd_container_click"
                            }
                            onClick={() => setIsId(false)}
                        >
                            <p id="find_id_page_input_title">Find Pwd</p>
                        </div>
                    </div>
                    {!isSubmit ? (
                        <>
                            {isId ? (
                                <FindIdPageItem
                                    findId={handleEmail}
                                    setResult={setResult}
                                />
                            ) : (
                                <FindPwdPage setResult={setPwdResult} />
                            )}
                        </>
                    ) : (
                        <>
                            {isId === true && idResult === true ? (
                                <IdInfoPage
                                    createdAt={inResult.createdAt}
                                    userId={inResult.userId}
                                    revert={revert}
                                />
                            ) : isId === false && idResult === false ? (
                                <PwdSettingPage userId={inResult.userId} />
                            ) : <></>}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FindPage;
