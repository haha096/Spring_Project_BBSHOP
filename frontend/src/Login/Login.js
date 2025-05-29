import React from 'react';

import "../css/Login/login.css"

function Login (){
    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>

            <form method="POST" action="/login" className="login-form">
                <div className="form-group">
                    <label htmlFor="userId">아이디</label>
                    <input type="text" id="userId" name="userId" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" name="password" required/>
                </div>

                <div className="form-check">
                    <input type="checkbox" id="saveLogin" name="saveLogin"  />
                        <label for="saveLogin">로그인 내역 저장</label>
                    </div>

                <div class="form-links">
                    <a href="/find-id">아이디 찾기</a> |
                    <a href="/find-password">비밀번호 찾기</a> |
                    <a href="/signup">회원가입</a>
                </div>

            </form>
            <button type="submit" class="login-btn">로그인</button>
        </div>
    );
} export default Login;