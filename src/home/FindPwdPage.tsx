import React from "react";
import "./FindPwdPage.css"

function FindPwdPage() {
  return (
    <>
      <div className="find_page_email_input_div">
        <p id="find_id_page_input_title">Email</p>
        <div className="find_page_email_container">
          <div className="find_page_email_form_div">
            <form id="find_page_email_form">
              <input
                id="find_id_page_email_input"
                placeholder="Enter an email."
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
        <p id="find_id_page_input_title">Authentication code</p>
        <div className="find_page_email_container">
          <div className="find_page_verify_code_form_div">
            <form id="find_page_email_form">
              <input
                id="find_id_page_email_input"
                placeholder="Enter 6 digits of the authentication number."
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
      <div className="find_page_verify_code_button_div">
        <div className="find_page_email_push_button_div">
          <p id="find_page_code_verify_button_text">verify</p>
        </div>
      </div>
    </>
  );
}

export default FindPwdPage;
