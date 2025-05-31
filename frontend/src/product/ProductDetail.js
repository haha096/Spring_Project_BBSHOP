import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import '../css/product/productdetail.css';

function ProductDetail() {
    const { id } = useParams(); // <-- URL에서 상품 ID 가져옴
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const reviews = [
        { user: 'user1', rating: 10, comment: '짱 재밌습니다' },
        { user: 'user1', rating: 10, comment: '짱 재밌습니다' }
    ];

    useEffect(() => {
        fetch(`http://localhost:8080/api/admin/products/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("📦 받아온 product:", data); // 여기를 확인!
                setProduct(data);
            })
            .catch(err => {
                console.error("상품 불러오기 실패:", err);
            });
    }, [id]);
    if (!product || product.price === undefined) return <div>상품 정보를 불러오는 중...</div>;

    return (
        <div className="product-container">
            <div className="product-top">
                <div className="product-image1">
                    <img src={product.imageUrl} alt={product.name} />
                </div>

                <div className="product-info">
                    <h2>{product.name}</h2>
                    <p className="price">{product.price.toLocaleString()}원</p>
                    <p className="description">{product.description}</p>
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