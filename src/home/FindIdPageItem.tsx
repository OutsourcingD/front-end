import React from "react";

interface FindIdPageItemProps {
  findId: (email: string) => void;
}

const FindIdPageItem = (props: FindIdPageItemProps) => {
  const [isId, setIsId] = React.useState<boolean>(true);
  const [email, setEmail] = React.useState<string>("");
  
  const onClick = () => {
    isId ? props.findId(email + "hi") : alert("잘못된 접근입니다.");
  }

  return (
    <>
      <div className="find_page_email_input_div">
        <p id="find_id_page_input_title">이메일 주소</p>
        <div className="find_page_email_container">
          <div className="find_page_email_form_div">
            <form id="find_page_email_form">
              <input
                id="find_id_page_email_input"
                placeholder="이메일 주소를 입력해주세요."
                type="email"
              />
            </form>
          </div>
          <div className="find_page_email_push_button_div">
            <p id="find_page_email_push_button_text">push code</p>
          </div>
        </div>
      </div>
      <div className="find_page_email_code_div">
        <p id="find_id_page_input_title">인증번호</p>
        <div className="find_page_email_container">
          <div className="find_page_verify_code_form_div">
            <form id="find_page_email_form">
              <input
                id="find_id_page_email_input"
                placeholder="인증번호 6자리를 입력해주세요."
                type="email"
              />
            </form>
            <p
              style={{
                color: "red",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
              }}
            >
              6:00
            </p>
          </div>
        </div>
      </div>
      <div className="find_page_verify_code_button_div" onClick={() => onClick()}>
        <div className="find_page_email_push_button_div">
          <p id="find_page_code_verify_button_text">verify code</p>
        </div>
      </div>
    </>
  );
}

export default FindIdPageItem;