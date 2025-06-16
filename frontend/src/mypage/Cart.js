import React, { useEffect, useState } from 'react';
import '../css/Mypage/cart.css'; // CSS 경로 확인

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    //토큰 불러오기
    const token = localStorage.getItem("token"); // 또는 sessionStorage

    //공통 fetch 옵션
    const getAuthHeader = () => ({
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const fetchCartItems = () => {
        fetch("http://localhost:8080/api/cart", {
            ...getAuthHeader(),
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
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleDeleteItem = async (productId) => {
        if (!window.confirm("정말 이 상품을 삭제하시겠습니까?")) return;

        const res = await fetch(`http://localhost:8080/api/cart/delete/${productId}`, {
            method: "DELETE",
            ...getAuthHeader(),
        });

        if (res.ok) {
            alert("상품이 삭제되었습니다.");
            fetchCartItems();
        } else {
            alert("삭제 실패");
        }
    };

    const handleClearCart = async () => {
        if (!window.confirm("정말 장바구니를 비우시겠습니까?")) return;

        const res = await fetch("http://localhost:8080/api/cart/clear", {
            method: "DELETE",
            ...getAuthHeader(),
        });

        if (res.ok) {
            alert("장바구니를 비웠습니다.");
            fetchCartItems();
        } else {
            alert("비우기 실패");
        }
    };

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
                                <button className="delete-btn" onClick={() => handleDeleteItem(item.productId)}>삭제</button>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="cart-bottom">
                    <button className="buy-all" onClick={handleClearCart}>전체 비우기</button>
                    <div className="total">총 금액 : {total.toLocaleString()}원</div>
                </div>
            </section>
        </div>
    );
}

export default Cart;