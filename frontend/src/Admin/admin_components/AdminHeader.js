import React from 'react';
import '../admin_css/admin_components/AdminHeader.css';

function AdminHeader() {
    return (
        <header className="admin-header">
            <h1 className="admin-title">BB Shop 관리자 페이지</h1>
            <button className="logout-button">로그아웃</button>
        </header>
    );
}

export default AdminHeader;