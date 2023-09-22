import React, { useEffect } from "react";
import "./FindPage.css";
import FindIdPageItem from "./FindIdPageItem";
import FindPwdPage from "./FindPwdPage";
import IdInfoPage from "./IdInfoPage";
import PwdSettingPage from "./PwdSettingPage";

const FindPage = () => {
  const [isId, setIsId] = React.useState<boolean>(true);
  const [isSubmit, setIsSubmit] = React.useState<boolean>(true);

  const handleEmail = (email: string) => {
    
  }

  return (
    <div className="find_page_div">
      <div className="find_page_title_div">
        {isId ? <h1>Find Id Page</h1> : <h1>Find PWD Page</h1>}
        <div className="find_div">
          <div className="find_page_head_div">
            <div
              className={isId ? "find_id_container" : "find_id_container_click"}
              onClick={() => setIsId(true)}
            >
              <p>아이디 찾기</p>
            </div>
            <div
              className={
                !isId ? "find_pwd_container" : "find_pwd_container_click"
              }
              onClick={() => setIsId(false)}
            >
              <p>비밀번호 찾기</p>
            </div>
          </div>
          {
            !isSubmit ?
          <>{
            isId ? 
                <FindIdPageItem findId={handleEmail} />
            : <FindPwdPage />
          }</>
          : <>{isId ? <IdInfoPage /> : <PwdSettingPage />}</>
          }
        </div>
      </div>
    </div>
  );
};

export default FindPage;
