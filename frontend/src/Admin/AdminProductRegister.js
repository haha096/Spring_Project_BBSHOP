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
        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/api/admin/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` //이거 꼭 필요함
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("상품 불러오기 실패");
                return res.json();
            })
            .then(data => {
                setProducts(data);
            })
            .catch(err => {
                console.error("상품 불러오기 에러:", err);
            });
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
                                                src={`http://localhost:8080${product.imageUrl}`}
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