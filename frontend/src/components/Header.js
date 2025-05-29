import React from 'react';
import { Link } from 'react-router-dom';
import "../css/components/header.css"

function Header() {
    return (
        <header>
            <Link to="/" className="logo">BB Shop</Link>
            <div className="header-links">
                <a href="/mypage" className="mypage-button">마이 페이지</a>
                <a href="/login" className="login-button">로그인</a>
            </div>
        </header>
    );
}

export default Header;