'use client';

import { useEffect, useState } from 'react';
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
        <header>
            <nav className="fixed w-full z-50 bg-white border-b-4 border-gray-200 px-4 lg:px-6 py-2.5 shadow-md">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    {/* Logo */}
                    <a href="/" className="flex items-center">
                        <img src="#" className="mr-3 h-6 sm:h-9" alt="logo" />
                        <span className="self-center text-base font-semibold text-red-600 lg:text-lg whitespace-nowrap">
                            EV-Shop
                        </span>
                    </a>

                    {/* Nút đăng nhập hoặc user info */}
                    <div className="flex items-center lg:order-2 relative">
                        {!user ? (
                            <a
                                href="/login-register"
                                className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 focus:outline-none"
                            >
                                Đăng nhập
                            </a>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={handleToggle}
                                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
                                >
                                    <span className="text-lg">👤</span>
                                    <span className="text-sm font-medium text-gray-700">
                                        {user.userName || 'Người dùng'}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                                        <a
                                            href="/profile"
                                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            <span>👤</span> Hồ sơ
                                        </a>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                                        >
                                            <span>🚪</span> Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Toggle menu mobile */}
                        <button
                            type="button"
                            onClick={handleToggle}
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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

                    {/* Menu links */}
                    <div
                        id="mobile-menu"
                        className={`${isOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:order-1`}
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={closeMenu}
                                        className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
