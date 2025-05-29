import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';

function AppWrapperInner() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <>
            {!isAdmin && <Header />}
            <App />
            {!isAdmin && <Footer />}
        </>
    );
}

function AppWrapper() {
    return (
        <BrowserRouter>
            <AppWrapperInner />
        </BrowserRouter>
    );
}

export default AppWrapper;