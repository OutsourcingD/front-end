import React, { useState } from 'react';
import styled from 'styled-components';
import './Header.css';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { BiLogIn } from 'react-icons/bi';

const HeaderDiv = styled.div``;

const LeftDiv = styled.div``;

const RightDiv = styled.div``;

const Menu = styled.p``;

function Header() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <HeaderDiv className='header'>
      <LeftDiv className='left'>
        <img src='/logo/logo.png' alt='logo' sizes='1%' id='logo'/>
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
                <div style={{display: "flex", flexDirection: "row"}}>
                  <BiLogIn size="13%" style={{paddingTop: "7%"}}/>
                  <p id="chat" style={{marginLeft: "2%"}}>SignIn/SignUp</p>
                </div>
              </>
        }
      </RightDiv>
    </HeaderDiv>
  );
}

export default Header;