import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Mypage/updatePassword.css";

function UpdatePassword() {
    const [currentPw, setCurrentPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!currentPw || !newPw) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        fetch("http://localhost:8080/api/users/updatepassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // 기존 토큰 포함
            },
            body: JSON.stringify({
                currentPassword: currentPw,
                newPassword: newPw
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", data.token);  // ✅ 토큰 갱신
                    alert("비밀번호가 성공적으로 변경되었습니다!");
                    navigate("/mypage");
                } else {
                    throw new Error("토큰이 반환되지 않았습니다.");
                }
            })
            .catch((err) => {
                alert("비밀번호 변경 실패: " + err.message);
            });
    };

    return (
        <div className="pw-update-container">
            <h2>비밀번호 수정</h2>
            <form onSubmit={handleSubmit}>
                <div className="pw-update-box">
                    <div className="pw-update-box-2">
                        <label className="pw-update-box-2-title">현재 비밀번호</label>
                        <input
                            type="password"
                            value={currentPw}
                            onChange={(e) => setCurrentPw(e.target.value)}
                        />
                    </div>
                    <div className="pw-update-box-3">
                        <label  className="pw-update-box-3-title">수정된 비밀번호</label>
                        <input
                            type="password"
                            value={newPw}
                            onChange={(e) => setNewPw(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="pw-update-button">
                    비밀번호 수정
                </button>
            </form>
        </div>
    );
}

export default UpdatePassword;