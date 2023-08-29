import React from 'react';

const FooterBody = () => {
    return (
        <div className='footer-box'>
            <div className='parent_div'>
                <p className='inquiry'>
                    문의하기
                </p>
                <p className='privacy'>
                    | 개인정보처리방침
                </p>
                <p className='term-of-use'>
                    | 이용약관
                </p>
            </div>

            <div className='parent_div'>
                <p className='bussiness-name'>
                    상호명: K-Surgery-forum
                </p>
                <p className='register-number'>
                    사업자 등록번호: 000-00-00000
                </p>
                <p className='location'>
                    사업장 소재지: 서울시 강남구 OO동 OO-OO
                </p>
            </div>

            <div className='parent_div'>
                <p className='boss'>
                    대표자: 김철수
                </p>
                <p className='email'>
                    Email: ksurgeryforum@gmail.com
                </p>
                <p className='phone-number'>
                    전화번호: 0000-0000
                </p>
            </div>
        </div>
    );
};

export default FooterBody;