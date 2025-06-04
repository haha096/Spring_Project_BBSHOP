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

        fetch("http://localhost:8080/api/users/updatepassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                currentPassword: currentPw,
                newPassword: newPw
            }),
        })
            .then((res) => {
                if (res.ok) {
                    alert("비밀번호가 수정되었습니다.");
                    navigate("/mypage");
                } else {
                    return res.text().then((text) => {
                        throw new Error(text || "비밀번호 수정 실패");
                    });
                }
            })
            .catch((err) => {
                alert(err.message);  // ex: "현재 비밀번호가 틀렸습니다." 등
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