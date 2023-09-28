import React, { useEffect } from "react";
import "./FindPage.css";
import FindIdPageItem from "./FindIdPageItem";
import FindPwdPage from "./FindPwdPage";
import IdInfoPage from "./IdInfoPage";
import PwdSettingPage from "./PwdSettingPage";
import Footer from "../bottom/Footer";

const FindPage = () => {
  const [isId, setIsId] = React.useState<boolean>(true);
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);

  const handleEmail = (email: string) => {
    
  }

  return (
    <div className="find_page_div">
      <div className="find_page_title_div">
        {isId ? <p id="find_id_sub_title">Find Id Page</p> : <p id="find_id_sub_title">Find PWD Page</p>}
        <div className="find_div">
          <div className="find_page_head_div">
            <div
              className={isId ? "find_id_container" : "find_id_container_click"}
              onClick={() => setIsId(true)}
            >
              <p id="find_id_page_input_title">아이디 찾기</p>
            </div>
            <div
              className={
                !isId ? "find_pwd_container" : "find_pwd_container_click"
              }
              onClick={() => setIsId(false)}
            >
              <p id="find_id_page_input_title">비밀번호 찾기</p>
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
      <Footer />
    </div>
  );
};

export default FindPage;
