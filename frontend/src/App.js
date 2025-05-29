import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Main from './main/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Login from "./Login/Login";
import Signup from "./Login/SignUp";
import MyPage from "./mypage/MyPage";
import Cart from "./mypage/Cart";
import Orders from "./mypage/Orders";
import ProductDetail from "./product/ProductDetail";
import AdminUserList from "./Admin/AdminUserList";
import AdminProductRegister from "./Admin/AdminProductRegister";
import AdminProductDetailForm from "./Admin/AdminProductDetailForm";

function App() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products/1" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminUserList />} />
            <Route path="/admin/products" element={<AdminProductRegister />} />
            <Route path="/admin/products/new" element={<AdminProductDetailForm />} />
        </Routes>
    );
}

export default App;
