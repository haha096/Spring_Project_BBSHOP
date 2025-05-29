import React, { useState } from 'react';
import '../css/product/productdetail.css';

function ProductDetail() {
    const [quantity, setQuantity] = useState(1);

    const reviews = [
        { user: 'user1', rating: 10, comment: '짱 재밌습니다' },
        { user: 'user1', rating: 10, comment: '짱 재밌습니다' }
    ];

    return (
        <div className="product-container">
            <div className="product-top">
                <div className="product-image1">
                    <img src="/images/sample.png" alt="상품 이미지" />
                </div>

                <div className="product-info">
                    <h2>가면산장 살인사건</h2>
                    <p className="price">12000원</p>
                    <p className="description">
                        어쩌고저쩌고저쩌고저쩌고저쩌고저쩌고 어쩌고저쩌고저쩌고 저쩌고...
                    </p>
                    <p className="shipping">배송도착 예정일<br />12/30</p>

                    <div className="quantity-box">
                        <span>수량</span>
                        <span>{quantity} 권</span>
                        <button onClick={() => setQuantity(q => q + 1)}>▲</button>
                        <button onClick={() => setQuantity(q => Math.max(q - 1, 1))}>▼</button>
                    </div>

                    <div className="button-group">
                        <button className="buy-ebook">ebook 구매</button>
                        <button className="add-cart">장바구니에 넣기</button>
                    </div>
                </div>
            </div>

            <div className="review-section">
                <h3>리뷰</h3>
                {reviews.map((r, idx) => (
                    <div key={idx} className="review-item">
                        <strong>**{r.user} ({r.rating}/10)</strong>
                        <p>{r.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductDetail;