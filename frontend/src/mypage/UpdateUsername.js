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

        fetch("http://localhost:8080/api/users/updateusername", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ newUsername }),
        })
            .then(res => {
                if (res.ok) {
                    alert("아이디가 성공적으로 변경되었습니다!");
                    navigate("/mypage");
                } else {
                    return res.text().then(text => {
                        throw new Error(text || "아이디 변경 실패");
                    });
                }
            })
            .catch(err => {
                console.error(err);
                alert("아이디 변경에 실패했습니다.");
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