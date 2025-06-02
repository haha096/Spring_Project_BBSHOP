import React, { useState } from "react";
import "../css/Mypage/updatePassword.css";

function UpdatePassword() {
    const [currentPw, setCurrentPw] = useState("");
    const [newPw, setNewPw] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 비밀번호 수정 API 호출 넣기
        alert(`비밀번호가 수정되었습니다.`);
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