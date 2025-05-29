import React from 'react';
import './admin_css/AdminUserList.css';
import AdminHeader from "./admin_components/AdminHeader";
import AdminNav from "./admin_components/AdminNav";

function AdminUserList() {
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
                    <tr>
                        <td>testuser</td>
                        <td>서울시 강남구</td>
                        <td>test@bbshop.com</td>
                        <td>2025-05-28</td>
                        <td><button className="ban-button">탈퇴</button></td>
                    </tr>
                    <tr>
                        <td>user2</td>
                        <td>부산시 해운대구</td>
                        <td>user2@bbshop.com</td>
                        <td>2025-05-25</td>
                        <td><button className="ban-button">탈퇴</button></td>
                    </tr>


                    <tr>
                        <td>user2</td>
                        <td>부산시 해운대구</td>
                        <td>user2@bbshop.com</td>
                        <td>2025-05-25</td>
                        <td><button className="ban-button">탈퇴</button></td>
                    </tr>


                    <tr>
                        <td>user2</td>
                        <td>부산시 해운대구</td>
                        <td>user2@bbshop.com</td>
                        <td>2025-05-25</td>
                        <td><button className="ban-button">탈퇴</button></td>
                    </tr>
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default AdminUserList;