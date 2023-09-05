import React, { useState } from 'react';
import styled from 'styled-components';
import './Header.css';
import { IoPaperPlaneOutline } from 'react-icons/io5';

const HeaderDiv = styled.div``;

const LeftDiv = styled.div``;

const RightDiv = styled.div``;

const Menu = styled.p``;

function Header() {
  const [isLogin] = useState(false);

  return (
    <HeaderDiv className='header'>
      <LeftDiv className='left'>
        <img src='/logo/logo.png' alt='logo' id='logo'/>
        <Menu id="menu">병원정보</Menu>
        <Menu id="menu">원장정보</Menu>
        <Menu id="menu">전후사진</Menu>
      </LeftDiv>
      <RightDiv className='right'>
        {
          isLogin === true ? 
            <>
              <img src='/logo/profile.png' alt='profile' sizes='1%' id='profile'/>
              <div className='nameDiv'>
                  <p id="name">지승언</p>
                  <p id="name_">님</p>
              </div>
              <div className='chatDiv'>
                  <IoPaperPlaneOutline size="19%"/>
                  <p id="chat">chat</p>
              </div>
            </>
            : 
              <>
                <div className="login_div">
                  <img src="/login.png" alt="login" />
                </div>
              </>
        }
      </RightDiv>
    </HeaderDiv>
  );
}

export default Header;