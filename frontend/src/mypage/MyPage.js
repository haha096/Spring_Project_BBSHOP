import React, { useState } from 'react';
import '../css/Mypage/mypage.css'; // CSS 경로 확인

function MyPage() {
    const [userId, setUserId] = useState("test_user");
    const [email, setEmail] = useState("test@example.com");
    const [address, setAddress] = useState("서울특별시 어딘가");

    return (
        <div className="mypage-container">
            <aside className="mypage-sidebar">
                <a href="/mypage">내정보</a>
                <a href="/cart">장바구니</a>
                <a href="/orders">구매내역</a>
                <a href="#">ebook 장바구니</a>
                <a href="#">ebook 구매내역</a>
                <a href="#">배송/품절</a>
                <a href="#">리뷰/한 줄평</a>
            </aside>

            <section className="mypage-content">
                <h2>내 정보</h2>
                <div className="mypage-box">
                    <div className="mypage-info" id="mypage-id">아이디 : {userId}</div>
                    <div className="mypage-info" id="mypage-email">이메일 : {email}</div>
                    <div className="mypage-info" id="mypage-address">주소 : {address}</div>
                </div>

                <div className="mypage-links">
                    <div className="mypage-update">
                        <a href="#">아이디 수정</a> |
                        <a href="#">비밀번호 수정</a> |
                        <a href="#">이메일 수정</a>
                    </div>

                    <button className="user-secession">회원탈퇴</button>
                </div>

                <div className="address-register">
                    <a href="#">주소등록</a>
                </div>
            </section>
        </div>
    );
}

export default MyPage;