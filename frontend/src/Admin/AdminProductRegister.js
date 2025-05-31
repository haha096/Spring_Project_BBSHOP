import React, { useState, useEffect } from 'react';
import './admin_css/AdminProductRegister.css';
import AdminHeader from "./admin_components/AdminHeader";
import AdminNav from "./admin_components/AdminNav";
import {Link} from "react-router-dom";

function AdminProductRegister() {
    const [category, setCategory] = useState('소설/시');
    const [products, setProducts] = useState([]);

    const filteredProducts = products.filter((product) => product.category === category);

    useEffect(() => {
        fetch("http://localhost:8080/api/admin/products")
            .then(res => res.json())
            .then(data => {
                console.log("📦 받아온 상품 데이터:", data); // <-- 구조 확인
                setProducts(data);
            })
            .catch(err => console.error("상품 불러오기 실패:", err));
    }, []);

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

                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <div className="product" key={product.id}>
                                    <div className="product-card">
                                        <div className="product-image">
                                            <img
                                                src={product.imageUrl.startsWith('/images/')
                                                    ? process.env.PUBLIC_URL + product.imageUrl
                                                    : product.imageUrl}
                                                alt={product.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </div>
                                        <div className="product-title">{product.name}</div>
                                        <div className="product-price">{product.price.toLocaleString()}원</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>등록된 상품이 없습니다.</p>
                        )}




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