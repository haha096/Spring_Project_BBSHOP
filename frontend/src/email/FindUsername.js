import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/email/FindUsername.css";

function FindUsername() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleFind = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/users/find-username", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const text = await res.text();
            setMessage(text);
        } catch (err) {
            setMessage("오류가 발생했습니다.");
            console.error(err);
        }
    };

    return (
        <div className="find-container">
            <h2>아이디 찾기</h2>
            <div className="find-box">
                <label>이메일</label>
                <input
                    type="text"
                    placeholder="아이디 찾을 이메일 입력"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button className="find-button" onClick={handleFind}>
                이메일 전송
            </button>
        </div>
    );
}

export default FindUsername;