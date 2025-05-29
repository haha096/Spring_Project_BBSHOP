import React from 'react';
import '../css/Mypage/cart.css'; // CSS 경로 확인

function Cart() {
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
                <h2>장바구니</h2>
                <div className="cart-box">

                    {/* 장바구니 항목 3개 수동 작성 */}
                    <div className="cart-item">
                        <div className="cart-img">[이미지 자리]</div>
                        <div className="cart-detail">
                            <div>가면산장 살인사건</div>
                            <div>1 권</div>
                            <div>12000 원</div>
                        </div>
                        <div className="cart-buttons">
                            <button className="buy-btn">구매</button>
                            <button className="delete-btn">삭제</button>
                        </div>
                    </div>

                    <div className="cart-item">
                        <div className="cart-img">[이미지 자리]</div>
                        <div className="cart-detail">
                            <div>가면산장 살인사건</div>
                            <div>1 권</div>
                            <div>12000 원</div>
                        </div>
                        <div className="cart-buttons">
                            <button className="buy-btn">구매</button>
                            <button className="delete-btn">삭제</button>
                        </div>
                    </div>

                    <div className="cart-item">
                        <div className="cart-img">[이미지 자리]</div>
                        <div className="cart-detail">
                            <div>가면산장 살인사건</div>
                            <div>1 권</div>
                            <div>12000 원</div>
                        </div>
                        <div className="cart-buttons">
                            <button className="buy-btn">구매</button>
                            <button className="delete-btn">삭제</button>
                        </div>
                    </div>

                </div>

                <div className="cart-bottom">
                    <button className="buy-all">전체 구매</button>
                    <div className="total">총 금액 : 24000원</div>
                </div>
            </section>
        </div>
    );
}

export default Cart;