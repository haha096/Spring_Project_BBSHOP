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
    const [previewUrl, setPreviewUrl] = useState(null);
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, image: e.target.files[0] });

        // 파일 미리보기 URL 생성
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result); // Base64로 된 이미지
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("dto", new Blob([JSON.stringify({
            name: form.title,
            price: parseInt(form.price),
            category: category,
            description: form.description
        })], { type: "application/json" }));
        formData.append("image", form.image); // 이미지 파일 추가

        const response = await fetch("http://localhost:8080/api/admin/products", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`  // <-- 이 줄 추가 필요!
            },
            body: formData
        });

        if (response.ok) {
            alert("상품 등록 성공!");
        } else {
            alert("상품 등록 실패!");
        }
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
                    <div className="image-preview">
                        {previewUrl ? (
                            <img src={previewUrl} alt="미리보기" style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }} />
                        ) : (
                            "[이미지 자리]"
                        )}
                    </div>

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