import React from 'react';
import '../admin_css/admin_components/AdminNav.css';

function AdminNav() {
    return (
        <nav className="admin-nav">
            <a href="/admin">사용자 목록</a>
            <a href="/admin/products">상품 등록</a>
            <a href="#">주문 관리</a>
            <a href="#">문의내역</a>
            <a href="#">리뷰 관리</a>
        </nav>
    );
}

export default AdminNav;