import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/components/header.css";

function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/users/check", {
            method: "GET",
            credentials: "include"
        })
            .then(res => {
                if (res.ok) setLoggedIn(true);
                else throw new Error();
            })
            .catch(() => setLoggedIn(false));
    }, []);


    const handleLogout = async () => {
        const res = await fetch("http://localhost:8080/api/users/logout", {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) {
            alert("로그아웃 되었습니다.");
            setLoggedIn(false);
            navigate("/login");
        }
    };

    const handleMyPageClick = (e) => {
        e.preventDefault(); // 기본 이동 막고 조건에 따라 이동
        if (!loggedIn) {
            alert("로그인이 필요합니다!");
            navigate("/login");
        } else {
            navigate("/mypage");
        }
    };

    return (
        <header>
            <Link to="/" className="logo">BB Shop</Link>
            <div className="header-links">
                <button onClick={handleMyPageClick} className="mypage-button">마이페이지</button>

                {loggedIn ? (
                    <button onClick={handleLogout} className="logout-button">로그아웃</button>
                ) : (
                    <Link to="/login" className="login-button">로그인</Link>
                )}
            </div>
        </header>
    );
}

export default Header;