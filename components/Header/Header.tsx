'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { decodeToken, JwtPayload } from '../../utils/decodeToken';
import { getToken, isTokenExpired, removeToken } from '@/utils/auth';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<JwtPayload | null>(null);

    const handleToggle = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const navLinks = [
        { name: 'TRANG CHỦ', href: '/' },
        { name: 'XE ĐIỆN', href: '/xe-dien' },
        { name: 'PIN XE', href: '/pin-xe' },
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
        <header>
            <nav className="fixed w-full z-50 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 px-4 lg:px-6 py-4 shadow-2xl">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    {/* Logo with Text */}
                    <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                        <img 
                            src="/image/logo.jpg" 
                            className="h-12 sm:h-14 w-auto rounded-xl shadow-xl ring-2 ring-white/50 hover:ring-white transition-all" 
                            alt="EV-Shop Logo" 
                        />
                        <span className="text-2xl font-extrabold text-white lg:text-3xl whitespace-nowrap drop-shadow-lg">
                            EV-Shop
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-white font-bold text-base hover:text-yellow-300 transition-colors px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section - Login/User + Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        {/* Notification Icon (if logged in) */}
                        {user && (
                            <button className="relative p-2 hover:bg-white/20 rounded-full transition-colors">
                                <span className="text-2xl">🔔</span>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                        )}

                        {/* Đăng tin Button - Always show - Enhanced with stronger shadow */}
                        <Link
                            href="/create-post"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ring-2 ring-white/30"
                        >
                            Đăng tin
                        </Link>

                        {/* Login Button or User Menu */}
                        {!user ? (
                            <Link
                                href="/login-register"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ring-2 ring-white/30"
                            >
                                Đăng nhập
                            </Link>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={handleToggle}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <span className="text-2xl">👤</span>
                                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                        {user.userName || 'Tài khoản'}
                                    </span>
                                    <span className="text-gray-400">▼</span>
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-xl">👤</span> Hồ sơ của tôi
                                        </Link>
                                        <Link
                                            href="/my-posts"
                                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-xl">📝</span> Tin đã đăng
                                        </Link>
                                        <hr className="my-1" />
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-left text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <span className="text-xl">🚪</span> Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            type="button"
                            onClick={handleToggle}
                            className="lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm"
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 5h14a1 1 0 010 2H3a1 1 0 110-2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        id="mobile-menu"
                        className={`${isOpen ? 'block' : 'hidden'} w-full lg:hidden mt-4 border-t border-white/20 pt-4`}
                    >
                        <ul className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        onClick={closeMenu}
                                        className="block py-2.5 px-4 text-white hover:bg-white/20 hover:text-yellow-300 rounded-lg font-bold transition-colors backdrop-blur-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
