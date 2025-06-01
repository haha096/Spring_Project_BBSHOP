import React, {useState} from 'react';

import "../css/Login/login.css"
import {useNavigate} from "react-router-dom";

function Login (){
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: form.userId,
                password: form.password
            }),
            credentials: "include" // ✅ 세션 쿠키 포함!
        });

        const result = await response.json();

        if (result === true) {
            alert("로그인 성공!");
            window.location.href = "/mypage";  // 예시로 마이페이지 이동
        } else {
            alert("로그인 실패! 아이디/비번 확인하세요.");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="userId">아이디</label>
                    <input type="text" id="userId" name="userId" value={form.userId} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
                </div>

                <div className="form-check">
                    <input type="checkbox" id="saveLogin" name="saveLogin" />
                    <label htmlFor="saveLogin">로그인 내역 저장</label>
                </div>

                <button type="submit" className="login-btn">로그인</button>

                <div className="form-links">
                    <a href="/find-id">아이디 찾기</a> |
                    <a href="/find-password">비밀번호 찾기</a> |
                    <a href="/signup">회원가입</a>
                </div>
            </form>
        </div>
    );
} export default Login;