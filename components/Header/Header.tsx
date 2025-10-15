'use client';

import './Header.css'; 
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { decodeToken, JwtPayload } from '../../utils/decodeToken';
import { getToken, isTokenExpired, removeToken } from '@/utils/auth';

export default function Header() {
    // Toàn bộ logic của bạn được giữ nguyên
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<JwtPayload | null>(null);

    const handleToggle = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const navLinks = [
        { name: 'TRANG CHỦ', href: '/' },
        { name: 'XE ĐIỆN', href: '/xe-dien' },
        { name: 'PIN XE', href: '/pin-xe-dien' },
    ];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = getToken();
            if (!token || isTokenExpired(token)) {
                removeToken();
                setUser(null);
                return;
            }
            const decoded = decodeToken(token);
            setUser(decoded);
        }
    }, []);

    const handleLogout = () => {
        removeToken();
        setUser(null);
        window.location.href = '/';
    };

    return (
        <header className="header">
            <div className="header-inner">
                {/* Logo */}
                <Link href="/" className="header-logo">
                    {/* === SỬA ĐƯỜNG DẪN Ở ĐÂY === */}
                    <Image 
                        src="/image/logo.jpg" 
                        alt="EV-Shop Logo" 
                        className="header-logo-image" 
                        width={120}
                        height={120}
                    />
                    <span className="header-logo-text">EV-Shop</span>
                </Link>

                {/* Navigation cho Desktop */}
                <nav className="header-nav">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="header-link">
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Các nút hành động */}
                <div className="header-actions">
                    <Link href="/dang-tin" className="header-button header-button-post">
                        Đăng tin
                    </Link>
                    {!user ? (
                        <Link href="/login-register" className="header-button header-button-login">
                            Đăng nhập
                        </Link>
                    ) : (
                        <div className="header-user-menu">
                            <button onClick={handleToggle} className="header-user-toggle">
                                <span className="header-user-avatar">👤</span>
                                <span className="header-user-name">
                                    {user.userName || 'Người dùng'}
                                </span>
                            </button>
                            {isOpen && (
                                <div className="header-dropdown">
                                    <Link href="/profile" className="header-dropdown-item" onClick={closeMenu}>
                                        <span>👤</span> Hồ sơ
                                    </Link>
                                    <button onClick={handleLogout} className="header-dropdown-item">
                                        <span>🚪</span> Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                {/* Nút Hamburger cho Mobile */}
                <button
                    type="button"
                    onClick={handleToggle}
                    className="header-mobile-toggle"
                >
                    {isOpen ? (
                        <svg className="icon" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    ) : (
                        <svg className="icon" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 5h14a1 1 0 010 2H3a1 1 0 110-2z" clipRule="evenodd" /></svg>
                    )}
                </button>

                {/* Menu cho Mobile */}
                <div className={`header-mobile-menu ${isOpen ? 'is-open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="header-mobile-link" onClick={closeMenu}>
                            {link.name}
                        </Link>
                    ))}
                     <div className="header-mobile-actions">
                        <Link href="/dang-tin" className="header-button header-button-post" onClick={closeMenu}>
                            Đăng tin
                        </Link>
                        {!user && (
                             <Link href="/login-register" className="header-button header-button-login" onClick={closeMenu}>
                                Đăng nhập
                            </Link>
                        )}
                     </div>
                </div>
            </div>
        </header>
    );
}