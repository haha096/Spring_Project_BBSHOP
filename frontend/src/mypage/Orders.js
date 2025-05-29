import React from 'react';
import '../css/Mypage/orders.css'; // CSS 따로 작성

function Orders() {
    return (
        <div className="mypage-container">
            <aside className="mypage-sidebar">
                <a href="/mypage">내정보</a>
                <a href="/cart">장바구니</a>
                <a href="/orders">구매내역</a>
                <a href="#">ebook 장바구니</a>
                <a href="#">ebook 구매내역</a>
                <a href="#">배송/품절</a>
                <a href="#">리뷰/한 줄평</a>
            </aside>

            <section className="mypage-content">
                <h2>구매내역</h2>
                <div className="orders-box">

                    {/* 첫 번째 주문 */}
                    <div className="order-item">
                        <div className="order-img">[이미지 자리]</div>
                        <div className="order-detail">
                            <div>가면산장 살인사건</div>
                            <div>1 권</div>
                            <div>12000원</div>
                        </div>
                        <div className="order-buttons">
                            <button className="status-btn">상품 확인 중</button>
                            <button className="order-delete-btn">삭제</button>
                        </div>
                    </div>

                    {/* 두 번째 주문 */}
                    <div className="order-item">
                        <div className="order-img">[이미지 자리]</div>
                        <div className="order-detail">
                            <div>가면산장 살인사건</div>
                            <div>1 권</div>
                            <div>12000원</div>
                        </div>
                        <div className="order-buttons">
                            <button className="status-btn complete">구매 완료</button>
                            <button className="review-btn">리뷰작성</button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default Orders;