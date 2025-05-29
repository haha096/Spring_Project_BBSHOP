import React, { useState } from 'react';
import AdminHeader from "./admin_components/AdminHeader";
import AdminNav from "./admin_components/AdminNav";
import "./admin_css/AdminProductDetailForm.css"

function AdminProductDetailForm() {
    const [form, setForm] = useState({
        title: '',
        price: '',
        genre: '',
        description: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`상품 등록: ${form.title}`);
        // TODO: 백엔드 연동
    };

    const [category, setCategory] = useState('');

    const handleSubmitCategory = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <AdminHeader />
            <AdminNav />

            <form className="product-detail-form" onSubmit={handleSubmit}>
                <div className="left-panel">
                    <div className="image-preview">[이미지 자리]</div>

                    <div className="product-img">
                        <label className="product-img-file-title">
                            상품 이미지
                        </label>
                        <input type="file" name="image" className="product-img-file" onChange={handleFileChange} />
                    </div>
                </div>

                <div className="right-panel">
                    <label>
                        상품 이름
                        <input type="text" name="title" value={form.title} onChange={handleChange} required />
                    </label>
                    <label>
                        상품 가격
                        <input type="number" name="price" value={form.price} onChange={handleChange} required />
                    </label>


                    <label htmlFor="category">상품 장르</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">장르 선택</option>
                        <option value="소설/시">소설/시</option>
                        <option value="자연과학">자연과학</option>
                        <option value="역사">역사</option>
                        <option value="수험서/전공">수험서/전공</option>
                    </select>


                    <label>
                        상품 설명
                        <textarea name="description" rows="4" value={form.description} onChange={handleChange} />
                    </label>
                    <button type="submit" className="submit-btn">상품등록</button>
                </div>
            </form>
        </div>
    );
}

export default AdminProductDetailForm;