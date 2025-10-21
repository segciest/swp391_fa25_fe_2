'use client';

import './Header.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { decodeToken, JwtPayload } from '../../utils/decodeToken';
import { getToken, isTokenExpired, removeToken } from '@/utils/auth';
import PostModal from '../CreatePost/PostModal'; // ✅ Thêm import

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ State cho modal

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
    <>
      <header className="header">
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="header-logo">
            <Image
              src="/image/logo.jpg"
              alt="EV-Shop Logo"
              className="header-logo-image"
              width={80}
              height={80}
            />
            <span className="header-logo-text">EV-Shop</span>
          </Link>

          {/* Navigation menu */}
          <nav className="header-nav">
            <ul>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="header-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            {/* ✅ SỬA: Thay href bằng onClick để mở modal */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="header-button header-button-post"
            >
              Đăng tin
            </button>
            
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
        </div>
      </header>

      {/* ✅ Thêm PostModal component */}
      <PostModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}