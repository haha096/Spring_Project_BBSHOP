import React, { useState } from 'react';
import './admin_css/AdminProductRegister.css';
import AdminHeader from "./admin_components/AdminHeader";
import AdminNav from "./admin_components/AdminNav";
import {Link} from "react-router-dom";

function AdminProductRegister() {
    const [category, setCategory] = useState('소설/시');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 상품 등록 처리 예정
        alert(`등록 완료!\n장르: ${category}\n제목: ${title}\n가격: ${price}`);
    };

    return (
        <div>
            <AdminHeader />
            <AdminNav />

            <div className="admin-product-page">
                <aside className="admin-sidebar">
                    {['소설/시', '자연과학', '역사', '수험서/전공'].map((cat) => (
                        <button
                            key={cat}
                            className={`sidebar-btn ${category === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </aside>

                <main className="admin-product-content">
                    <div className="product-list">

                        <div className="product">
                            <div className="product-card">
                                <div className="product-image" />
                                <div className="product-title">가면산장 살인사건</div>
                                <div className="product-price">12000원</div>
                            </div>
                        </div>

                        <div className="product">
                            <div className="product-card">
                                <div className="product-image" />
                                <div className="product-title">가면산장 살인사건</div>
                                <div className="product-price">12000원</div>
                            </div>
                        </div>

                        <div className="product">
                            <div className="product-card">
                                <div className="product-image" />
                                <div className="product-title">가면산장 살인사건</div>
                                <div className="product-price">12000원</div>
                            </div>
                        </div>


                    </div>

                    <div className="product_register-btn-wrapper">
                        <Link to="/admin/products/new" className="product_register-btn">
                            상품등록
                        </Link>
                    </div>

                </main>

            </div>

        </div>
    );
}

export default AdminProductRegister;