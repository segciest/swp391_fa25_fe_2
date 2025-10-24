'use client';

import './Header.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { decodeToken, JwtPayload } from '../../utils/decodeToken';
import { getToken, isTokenExpired, removeToken } from '@/utils/auth';
import PostModal from '../CreatePost/PostModal';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleToggle = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'TRANG CHỦ', href: '/' },
    { name: 'XE ĐIỆN', href: '/xe-dien' },
    { name: 'PIN XE', href: '/pin-xe-dien' },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const token = getToken();
        if (!token || isTokenExpired(token)) {
          removeToken();
          setUser(null);
        } else {
          const decoded = decodeToken(token);
          console.log('Decoded user:', decoded); // Debug
          setUser(decoded);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        removeToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem('userData'); // Xóa userData
    sessionStorage.removeItem('userData'); // Nếu dùng sessionStorage
    setUser(null);
    window.location.href = '/';
  };

  // Lấy tên hiển thị - ưu tiên: fullName > userName > email > "Người dùng"
  const getDisplayName = () => {
    if (!user) return 'Người dùng';
    console.log('Available fields:', {
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      sub: user.sub,
      iat: user.iat,
    });
    console.log('All user keys:', Object.keys(user));
    return user.fullName || user.userName || user.email || user.sub || 'Người dùng';
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
                    {getDisplayName()}
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

      <PostModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}