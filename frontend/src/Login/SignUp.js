import React from 'react';
import '../css/Login/signup.css';

function Signup() {
    return (
        <div>
            <div className="signup-container">
                <h2 className="login-title">회원가입</h2>

                <form method="POST" action="/signup" className="signup-form">
                    <div className="form-group">
                        <label htmlFor="userId">아이디</label>
                        <input type="text" id="userId" name="userId" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" id="password" name="password" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwordConfirm">비밀번호 확인</label>
                        <input type="password" id="passwordConfirm" name="passwordConfirm" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" name="email" />
                    </div>

                    <button type="submit" className="signup-btn">회원가입</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;