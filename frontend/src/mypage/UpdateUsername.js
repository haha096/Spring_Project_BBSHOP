import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Mypage/updateUsername.css";

function UpdateUsername() {
    const [newUsername, setNewUsername] = useState("");
    const navigate = useNavigate();

    const handleUpdate = () => {
        if (!newUsername.trim()) {
            alert("새로운 아이디를 입력해주세요.");
            return;
        }

        // JWT 토큰 가져오기 (localStorage에서 꺼내기)
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        fetch("http://localhost:8080/api/users/updateusername", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, // 기존 토큰 전송
            },
            body: JSON.stringify({ newUsername }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token); //토큰 갱신
                    alert("아이디가 성공적으로 변경되었습니다!");
                    navigate("/mypage");
                } else {
                    throw new Error("토큰 없음");
                }
            })
            .catch(err => {
                console.error(err);
                alert("아이디 변경 실패: " + err.message);
            });
    };

    return (
        <div className="update-container">
            <h2>아이디 수정</h2>
            <div className="update-box">
                <label>수정된 아이디</label>
                <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="새 아이디 입력"
                />
            </div>
            <button className="update-button" onClick={handleUpdate}>
                아이디 수정
            </button>
        </div>
    );
}

export default UpdateUsername;