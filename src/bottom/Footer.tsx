import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
        <div className='footerDiv' style={{display: 'flex', justifyContent: 'start', width: "100%"}}>
            <p style={{marginRight: "1%"}}>문의하기</p>
            <p style={{marginRight: "1%"}}>|</p>
            <p style={{marginRight: "1%"}}>개인정보처리방침</p>
            <p style={{marginRight: "1%"}}>|</p>
            <p>이용약관</p>
        </div>
        <div className='info' style={{backgroundColor: 'red'}}>
            <p></p>
            
        </div>
    </div>
  );
}

export default Footer;