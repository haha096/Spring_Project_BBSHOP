import React, {useEffect, useState} from 'react';
import './admin_css/AdminUserList.css';
import AdminHeader from "./admin_components/AdminHeader";
import AdminNav from "./admin_components/AdminNav";
import {useNavigate} from "react-router-dom";

function AdminUserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/api/users/is-admin", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    alert("관리자만 접근할 수 있는 페이지입니다.");
                    navigate("/");  // 홈으로 리디렉트
                }
            });


        // 유저 목록 불러오기
        fetch("http://localhost:8080/api/users/all", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => {
                console.error("유저 목록 불러오기 실패:", err);
                alert("유저 목록을 불러오지 못했습니다.");
            });
    }, [navigate]);


    //유저 탈퇴하는 기능
    const handleDelete = (id) => {
        const token = localStorage.getItem("token");

        if (!window.confirm("정말로 탈퇴시키겠습니까?")) return;

        fetch(`http://localhost:8080/api/users/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    alert("탈퇴 성공");
                    setUsers(prev => prev.filter(user => user.id !== id)); // 화면에서 즉시 제거
                } else {
                    alert("탈퇴 실패");
                }
            });
    };

    return (
        <div>
            <AdminHeader />
            <AdminNav />

            <main className="admin-main">
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>주소</th>
                        <th>이메일</th>
                        <th>가입날짜</th>
                        <th>관리</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.isAdmin ? "O" : "X"}</td>
                            <td>{user.email}</td>
                            <td>{user.createdAt?.slice(0, 10)}</td>
                            <td><button className="ban-button" onClick={() => handleDelete(user.id)}>탈퇴</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default AdminUserList;