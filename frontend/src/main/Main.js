import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "../css/main/main.css"

function Main (){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/admin/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("상품 불러오기 실패:", err));
    }, []);

    return(
        <div>
            <div className="main">
                <div className="page-layout">
                    <aside className="sidebar">
                        <a href="#">소설/시</a>
                        <a href="#">자연과학</a>
                        <a href="#">역사</a>
                        <a href="#">수험서/전공</a>
                    </aside>

                    <section className="main-content">
                        <div className="search-box">
                            <input type="text" placeholder="검색어를 입력해주세요" />
                        </div>
                        <div className="banner">
                            <img src="/images/main_page_title.png" alt="메인 배너"/>
                        </div>
                    </section>
                </div>

                <div className="page-layout2">
                    <section className="main-content2">
                        <div className="book-section">
                            <h2>따끈따끈 신작</h2>
                            <div className="newbook-list">
                                {products.map(product => (
                                    <div className="newbook-grid" key={product.id}>
                                        <Link to={`/products/${product.id}`}>
                                            <div className="newbook-card">
                                                <img
                                                    src={`http://localhost:8080${product.imageUrl}`}
                                                    alt={product.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="newbook-card-title">{product.name}</div>
                                            <div className="newbook-card-price">{product.price}원</div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="main-content3">
                        <div className="bestbook-section">
                            <h2>베스트 셀러</h2>
                            <div className="bestbook-list">
                                <div className="bestbook-grid">
                                    <div className="bestbook-card"></div>
                                    <div className="bestbook-card-title">가면산장 살인사건</div>
                                    <div className="bestbook-card-price">12000원</div>
                                </div>
                                <div className="bestbook-grid">
                                    <div className="bestbook-card"></div>
                                    <div className="bestbook-card-title">가면산장 살인사건</div>
                                    <div className="bestbook-card-price">12000원</div>
                                </div>
                                <div className="bestbook-grid">
                                    <div className="bestbook-card"></div>
                                    <div className="bestbook-card-title">가면산장 살인사건</div>
                                    <div className="bestbook-card-price">12000원</div>
                                </div>
                                <div className="bestbook-grid">
                                    <div className="bestbook-card"></div>
                                    <div className="bestbook-card-title">가면산장 살인사건</div>
                                    <div className="bestbook-card-price">12000원</div>
                                </div>
                                <div className="bestbook-grid">
                                    <div className="bestbook-card"></div>
                                    <div className="bestbook-card-title">가면산장 살인사건</div>
                                    <div className="bestbook-card-price">12000원</div>
                                </div>
                                <div className="bestbook-grid">
                                    <div className="bestbook-card"></div>
                                    <div className="bestbook-card-title">가면산장 살인사건</div>
                                    <div className="bestbook-card-price">12000원</div>
                                </div>
                            </div>
                        </div>
                    </section>



                </div>
            </div>
        </div>
    )
}

export default Main;