import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

import "../css/main/main.css"

function Main (){
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("토큰:", token);

        const headers = {
            "Content-Type": "application/json"
        };

        // ✅ 인증 없어도 되는 API니까 이 조건 자체 생략 가능!
        // 하지만 혹시 future-proof로 남기고 싶다면 아래처럼
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        fetch("http://localhost:8080/api/products", {
            method: "GET",
            headers: headers
        })
            .then(res => {
                console.log("응답 상태 코드:", res.status);  // 여기 상태 꼭 봐봐
                if (!res.ok) throw new Error("서버 응답 오류");
                return res.json();
            })
            .then(data => {
                console.log("받은 상품 목록:", data);
                setProducts(data);
            })
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