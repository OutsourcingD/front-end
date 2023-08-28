import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
        <div className='footerDiv'>
            <p>문의하기</p>
            <p>|</p>
            <p>개인정보처리방침</p>
            <p>|</p>
            <p>이용약관</p>
        </div>
        <div id='info' style={{flex: 1, display: 'flex', backgroundColor: 'red'}}>
            <p>이용약관s</p>
        </div>
    </div>
  );
}

export default Footer;