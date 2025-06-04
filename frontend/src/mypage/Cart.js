import React, { useEffect, useState } from 'react';
import '../css/Mypage/cart.css'; // CSS 경로 확인

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch("http://localhost:8080/api/cart", {
            credentials: "include"
        })
            .then(res => {
                if (!res.ok) throw new Error("로그인이 필요합니다.");
                return res.json();
            })
            .then(data => {
                setCartItems(data);
                const sum = data.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
                setTotal(sum);
            })
            .catch(err => alert(err.message));
    }, []);

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

                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <div className="cart-img">
                                <img src={`http://localhost:8080${item.productImageUrl}`} alt={item.productName} />
                            </div>
                            <div className="cart-detail">
                                <div>{item.productName}</div>
                                <div>{item.quantity} 권</div>
                                <div>{(item.productPrice * item.quantity).toLocaleString()} 원</div>
                            </div>
                            <div className="cart-buttons">
                                <button className="buy-btn">구매</button>
                                <button className="delete-btn">삭제</button>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="cart-bottom">
                    <button className="buy-all">전체 구매</button>
                    <div className="total">총 금액 : {total.toLocaleString()}원</div>
                </div>
            </section>
        </div>
    );
}

export default Cart;