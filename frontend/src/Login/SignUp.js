import React, { useState } from 'react';
import '../css/Login/signup.css';

function Signup() {
    const [form, setForm] = useState({
        userId: '',
        password: '',
        passwordConfirm: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const response = await fetch("http://localhost:8080/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: form.userId,
                password: form.password,
                email: form.email
            })
        });

        if (response.ok) {
            alert("회원가입 성공!");
            window.location.href = "/login";
        } else {
            alert("회원가입 실패!");
        }
    };

    return (
        <div>
            <div className="signup-container">
                <h2 className="login-title">회원가입</h2>

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="userId">아이디</label>
                        <input type="text" id="userId" name="userId" value={form.userId} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" id="password" name="password" value={form.password} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwordConfirm">비밀번호 확인</label>
                        <input type="password" id="passwordConfirm" name="passwordConfirm" value={form.passwordConfirm} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} />
                    </div>

                    <button type="submit" className="signup-btn">회원가입</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;