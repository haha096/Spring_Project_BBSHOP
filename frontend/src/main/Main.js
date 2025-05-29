import React from 'react';
import { Link } from 'react-router-dom';

import "../css/main/main.css"

function Main (){
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
                        <div className="banner"></div>
                    </section>
                </div>

                <div className="page-layout2">
                    <section className="main-content2">
                        <div className="book-section">
                            <h2>따끈따끈 신작</h2>
                            <div className="newbook-list">
                                <div className="newbook-grid">
                                    <Link to="/products/1">
                                        <div className="newbook-card"></div>
                                        <div className="newbook-card-title">가면산장 살인사건</div>
                                        <div className="newbook-card-price">12000원</div>
                                    </Link>
                                </div>
                                <div className="newbook-grid">
                                    <div className="newbook-card"></div>
                                    <div className="newbook-card-title">셜록홈즈</div>
                                    <div className="newbook-card-price">12000원</div>
                                </div>
                                <div className="newbook-grid">
                                    <div className="newbook-card"></div>
                                    <div className="newbook-card-title">셜록홈즈</div>
                                    <div className="newbook-card-price">12000원</div>
                                </div>
                                <div className="newbook-grid">
                                    <div className="newbook-card"></div>
                                    <div className="newbook-card-title">셜록홈즈</div>
                                    <div className="newbook-card-price">12000원</div>
                                </div>
                                <div className="newbook-grid">
                                    <div className="newbook-card"></div>
                                    <div className="newbook-card-title">셜록홈즈</div>
                                    <div className="newbook-card-price">12000원</div>
                                </div>
                                <div className="newbook-grid">
                                    <div className="newbook-card"></div>
                                    <div className="newbook-card-title">셜록홈즈</div>
                                    <div className="newbook-card-price">12000원</div>
                                </div>
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