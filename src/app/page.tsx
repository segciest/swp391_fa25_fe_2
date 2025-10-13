'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPosts } from '@/lib/api';
import { Post } from '@/types/post';
import PostCard from '../../components/HomePage/PostCard';
import PostModal from '../../components/CreatePost/PostModal';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setError('Không thể tải tin đăng. Vui lòng thử lại sau.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('userData');
      setIsLoggedIn(!!token);
    }
  }, []);

<<<<<<< HEAD
  return (
    <>
      {/* Hero Section - Intro with Background Image */}
      <section className="hero-section relative overflow-hidden pt-32 pb-20 px-4">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/image/BackgroundHome.jpg)',
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-pink-900/70"></div>
        </div>

        {/* Animated Light Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-300 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl animate-fadeIn">
            Chào mừng đến với <span className="text-yellow-300 animate-pulse">EV-Shop</span>
          </h1>
          
          {/* Description */}
          <p className="text-base md:text-lg text-white mb-8 max-w-3xl mx-auto leading-relaxed animate-slideUp drop-shadow-lg">
            EV-Shop là nền tảng hàng đầu đáng tin mua bán xe điện đã qua sử dụng và pin.
            Chúng tôi cam kết mang lại trải nghiệm tốt nhất cho khách hàng với các sản phẩm
            chất lượng cao và dịch vụ uy tín.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-base px-10 py-4 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110"
          >
            ✨ Đăng tin ngay
          </button>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
            <div className="stat-card bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center animate-fadeIn shadow-2xl border border-white/30 hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.2s'}}>
              <h3 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2 drop-shadow-lg">1000+</h3>
              <p className="text-white text-sm md:text-base font-semibold drop-shadow">Xe điện đang bán</p>
            </div>
            
            <div className="stat-card bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center animate-fadeIn shadow-2xl border border-white/30 hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.4s'}}>
              <h3 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2 drop-shadow-lg">500+</h3>
              <p className="text-white text-sm md:text-base font-semibold drop-shadow">Khách hàng tin tưởng</p>
            </div>
            
            <div className="stat-card bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center animate-fadeIn shadow-2xl border border-white/30 hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.6s'}}>
              <h3 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2 drop-shadow-lg">50+</h3>
              <p className="text-white text-sm md:text-base font-semibold drop-shadow">Thương hiệu xe</p>
            </div>
            
            <div className="stat-card bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center animate-fadeIn shadow-2xl border border-white/30 hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.8s'}}>
              <h3 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2 drop-shadow-lg">24/7</h3>
              <p className="text-white text-sm md:text-base font-semibold drop-shadow">Hỗ trợ khách hàng</p>
=======
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState('trang-chu')
  const [showProductSelection, setShowProductSelection] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Navbar */}
      <nav className="bg-gradient-to-r from-teal-600 to-green-600 shadow-lg fixed top-0 left-0 right-0 z-50" style={{height: '60px'}}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left Side - Menu + Logo + Trang chủ */}
            <div className="flex items-center space-x-2">
              {/* Hamburger Menu */}
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-white hover:text-teal-100 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="py-2">
                      <Link 
                        href="/" 
                        className={`block px-4 py-2 text-sm font-medium transition-all duration-400 ease-in-out transform ${
                          activeNavItem === 'trang-chu' 
                            ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg scale-105 animate-pulse' 
                            : 'text-teal-600 bg-teal-50 hover:bg-gradient-to-r hover:from-orange-100 hover:to-orange-200 hover:text-orange-600 hover:scale-102 active:scale-95'
                        }`}
                        onClick={() => {
                          setActiveNavItem('trang-chu');
                          setIsMenuOpen(false);
                        }}
                      >
                        🏠 Trang chủ
                      </Link>

                      <Link 
                        href="/xe-hoi-dien" 
                        className={`block px-4 py-2 text-sm font-medium transition-all duration-400 ease-in-out transform ${
                          activeNavItem === 'xe-hoi-dien' 
                            ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg scale-105 animate-pulse' 
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-orange-200 hover:text-orange-600 hover:scale-102 active:scale-95'
                        }`}
                        onClick={() => {
                          setActiveNavItem('xe-hoi-dien');
                          setIsMenuOpen(false);
                        }}
                      >
                        🚗 Xe hơi điện
                      </Link>
                      <Link 
                        href="/pin" 
                        className={`block px-4 py-2 text-sm font-medium transition-all duration-400 ease-in-out transform ${
                          activeNavItem === 'pin' 
                            ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg scale-105 animate-pulse' 
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-orange-200 hover:text-orange-600 hover:scale-102 active:scale-95'
                        }`}
                        onClick={() => {
                          setActiveNavItem('pin');
                          setIsMenuOpen(false);
                        }}
                      >
                        🔋 Pin
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded text-teal-600 flex items-center justify-center font-bold text-sm shadow-sm">
                    E
                  </div>
                  <span className="ml-2 text-lg font-semibold text-white">EcoCarMarket</span>
                </Link>
              </div>

              {/* Trang chủ button - next to logo */}
              <div className="hidden md:block">
                <Link 
                  href="/" 
                  onClick={() => setActiveNavItem('trang-chu')}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-500 ease-in-out transform-gpu ${
                    activeNavItem === 'trang-chu' 
                      ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg scale-105 animate-pulse ring-2 ring-orange-300 ring-opacity-50' 
                      : 'text-white bg-white/20 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:shadow-md hover:scale-102'
                  } active:scale-95`}
                >
                  🏠 TRANG CHỦ
                </Link>
              </div>
            </div>

            {/* Center Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                href="/thuong-hieu" 
                onClick={() => setActiveNavItem('thuong-hieu')}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-500 ease-in-out rounded-md transform-gpu ${
                  activeNavItem === 'thuong-hieu' 
                    ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg scale-105 animate-pulse ring-2 ring-orange-300 ring-opacity-50' 
                    : 'text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:scale-102 hover:shadow-md'
                } active:scale-95`}
              >
                Thương hiệu
              </Link>
              <Link 
                href="/xe-hoi-dien" 
                onClick={() => setActiveNavItem('xe-hoi-dien')}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-500 ease-in-out rounded-md transform-gpu ${
                  activeNavItem === 'xe-hoi-dien' 
                    ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg scale-105 animate-pulse ring-2 ring-orange-300 ring-opacity-50' 
                    : 'text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:scale-102 hover:shadow-md'
                } active:scale-95`}
              >
                Xe hơi điện
              </Link>
              <Link 
                href="/pin" 
                onClick={() => setActiveNavItem('pin')}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-500 ease-in-out rounded-md transform-gpu ${
                  activeNavItem === 'pin' 
                    ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg scale-105 animate-pulse ring-2 ring-orange-300 ring-opacity-50' 
                    : 'text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:scale-102 hover:shadow-md'
                } active:scale-95`}
              >
                Pin
              </Link>

              
    
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Post Button */}
              <div className="relative group">
                <button
                  onClick={() => {
                    setActiveNavItem('create-post');
                    setShowProductSelection(true);
                  }}
                  className={`relative text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 ease-in-out transform-gpu flex items-center gap-2 ${
                    activeNavItem === 'create-post' 
                      ? 'scale-110 shadow-2xl ring-4 ring-orange-300 ring-opacity-60 animate-bounce' 
                      : 'hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95'
                  }`}
                  style={{
                    background: activeNavItem === 'create-post' 
                      ? 'linear-gradient(45deg, #ea580c, #c2410c, #ea580c)' 
                      : 'linear-gradient(to right, #f97316, #ea580c)',
                    boxShadow: activeNavItem === 'create-post' 
                      ? '0 8px 25px -5px rgba(234, 88, 12, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    backgroundSize: activeNavItem === 'create-post' ? '200% 200%' : '100% 100%',
                    animation: activeNavItem === 'create-post' ? 'gradient-shift 2s ease-in-out infinite' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (activeNavItem !== 'create-post') {
                      e.currentTarget.style.background = 'linear-gradient(to right, #ea580c, #c2410c)';
                      e.currentTarget.style.boxShadow = '0 8px 25px -5px rgba(234, 88, 12, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeNavItem !== 'create-post') {
                      e.currentTarget.style.background = 'linear-gradient(to right, #f97316, #ea580c)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                    }
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Đăng tin</span>
                </button>
              </div>

              {/* Notification Bell */}
              <div className="relative">
                <button 
                  onClick={() => setActiveNavItem('thong-bao')}
                  className={`p-2 relative transition-all duration-500 ease-in-out rounded-md transform-gpu ${
                    activeNavItem === 'thong-bao' 
                      ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg scale-110 animate-pulse ring-2 ring-orange-300 ring-opacity-50' 
                      : 'text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:scale-105 hover:shadow-md active:scale-95'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>

              {/* User Profile */}
              <div className="hidden md:flex items-center relative">
                <button 
                  className={`flex items-center text-sm transition-all duration-500 ease-in-out rounded-md px-2 py-1 transform-gpu ${
                    activeNavItem === 'tai-khoan' 
                      ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg scale-105 animate-pulse ring-2 ring-orange-300 ring-opacity-50' 
                      : 'text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:scale-102 hover:shadow-md active:scale-95'
                  }`}
                  onClick={() => {
                    setActiveNavItem('tai-khoan');
                    setIsAccountMenuOpen(!isAccountMenuOpen);
                  }}
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-2">Tài khoản</span>
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Account Dropdown Menu */}
                {isAccountMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="py-2">
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsAccountMenuOpen(false)}
                      >
                        👤 Profile
                      </Link>
                      <Link 
                        href="/quan-ly-dang-tin" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsAccountMenuOpen(false)}
                      >
                        📝 Quản lý đăng tin
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setIsAccountMenuOpen(false)
                          // Handle logout logic here
                          console.log('Logging out...')
                        }}
                      >
                        🚪 Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="p-2 text-white/90 hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Container with padding for fixed navbar */}
      <div style={{paddingTop: '60px'}}>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-teal-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Chào mừng đến với EcoCarMarket
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              EcoCarMarket là nền tảng hàng đầu đăng tin mua bán xe điện đã qua sử dụng và  pin. Chúng tôi cam kết mang lại trải nghiệm tốt nhất cho khách hàng với các sản phẩm chất lượng cao và dịch vụ uy tín.
            </p>
            <div className="flex justify-center items-center">
              <div className="relative inline-block group">
                {/* Main button */}
                <button 
                  onClick={() => setShowProductSelection(true)}
                  className="relative text-white px-16 py-5 rounded-2xl text-2xl font-bold transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex items-center gap-4 group overflow-hidden"
                  style={{
                    background: 'linear-gradient(to right, #f97316, #ea580c, #c2410c)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(249, 115, 22, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #ea580c, #c2410c, #9a3412)';
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(249, 115, 22, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #f97316, #ea580c, #c2410c)';
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(249, 115, 22, 0.3)';
                  }}
                >
                  
                  {/* Animated icon */}
                  <div className="transform group-hover:rotate-12 transition-transform duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  
                  <span className="relative z-10">Đăng tin ngay</span>
                  
                  {/* Pulsing dot */}
                  <div className="relative">
                    <div className="w-3 h-3 bg-white rounded-full animate-ping absolute"></div>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
                  
                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
                </button>
              </div>
            </div>
            
            {/* Call to action text */}
            <div className="text-center mt-6">
              <p className="text-teal-100 text-lg animate-bounce">
                ✨ Miễn phí đăng tin - Bán nhanh trong ngày! ✨
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-teal-100">Xe điện đăng bán</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-teal-100">Khách hàng tin tưởng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-teal-100">Thương hiệu xe</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-teal-100">Hỗ trợ khách hàng</div>
              </div>
>>>>>>> dde74fe5d0e256f83692a7c6435563b1c001f215
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
<<<<<<< HEAD
      <section className="py-16 px-4 bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Tin đăng nổi bật
            </h2>
            <p className="text-purple-600 text-base md:text-lg font-medium">
              Những mẫu xe điện và pin được quan tâm nhất
            </p>
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😔</div>
              <p className="text-red-600 font-semibold text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-lg transition-colors"
              >
                Thử lại
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-600 font-semibold text-lg">Chưa có tin đăng nào</p>
              <button 
                onClick={() => setShowModal(true)}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-lg transition-colors"
              >
                Đăng tin đầu tiên
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* View All Button - Show only if there are posts */}
          {!loading && !error && posts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/listings"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Xem tất cả {posts.length} bài đăng →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Post Modal */}
      <PostModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
=======
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tin đăng nổi bật</h2>
          <p className="text-lg text-gray-600">Những mẫu xe điện và pin được quan tâm nhất</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Car 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <Image 
                src="/image/banner1.png" 
                alt="Tesla Model 3" 
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                HOT
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tesla Model 3 - Xe tự lái cấp độ 3</h3>
              <p className="text-gray-600 mb-4">Mẫu xe điện thông minh với công nghệ tự lái tiên tiến</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-red-500">1.200.000.000 đ</span>
                <span className="text-sm text-gray-500">Đã qua sử dụng</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>📍 TP.HCM</span>
                <span>⚡ 400km</span>
                <span>📅 2023</span>
              </div>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md font-medium transition duration-200">
                Xem chi tiết
              </button>
            </div>
          </div>

          {/* Featured Car 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <Image 
                src="/image/banner2.png" 
                alt="VinFast VF8" 
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                MỚI
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">VinFast VF8 - SUV điện cao cấp</h3>
              <p className="text-gray-600 mb-4">SUV điện 5 chỗ với thiết kế hiện đại và trang bị đầy đủ</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-red-500">900.000.000 đ</span>
                <span className="text-sm text-gray-500">Hàng mới 100%</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>📍 Hà Nội</span>
                <span>⚡ 350km</span>
                <span>📅 2024</span>
              </div>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md font-medium transition duration-200">
                Xem chi tiết
              </button>
            </div>
          </div>

          {/* Featured Car 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <Image 
                src="/image/banner3.png" 
                alt="BMW i4" 
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm font-semibold">
                SALE
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">BMW i4 - Sedan điện thể thao</h3>
              <p className="text-gray-600 mb-4">Sedan điện với hiệu suất cao và thiết kế thể thao</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-red-500">2.500.000.000 đ</span>
                <span className="text-sm text-gray-500">Xe đã qua SD</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>📍 Đà Nẵng</span>
                <span>⚡ 450km</span>
                <span>📅 2023</span>
              </div>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md font-medium transition duration-200">
                Xem chi tiết
              </button>
            </div>
          </div>

          {/* Featured Battery 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <Image 
                src="/image/banner4.png" 
                alt="Pin Tesla" 
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pin Tesla Model S - 100kWh</h3>
              <p className="text-gray-600 mb-4">Pin lithium-ion cao cấp cho Tesla Model S</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-red-500">150.000.000 đ</span>
                <span className="text-sm text-gray-500">Còn bảo hành</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>📍 TP.HCM</span>
                <span>🔋 100kWh</span>
                <span>📅 2022</span>
              </div>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md font-medium transition duration-200">
                Xem chi tiết
              </button>
            </div>
          </div>

          {/* Featured Battery 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <Image 
                src="/image/cc1.jpg" 
                alt="Pin VinFast" 
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pin VinFast VF8 - 82kWh</h3>
              <p className="text-gray-600 mb-4">Pin chính hãng cho xe VinFast VF8</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-red-500">120.000.000 đ</span>
                <span className="text-sm text-gray-500">Mới 100%</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>📍 Hà Nội</span>
                <span>🔋 82kWh</span>
                <span>📅 2024</span>
              </div>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md font-medium transition duration-200">
                Xem chi tiết
              </button>
            </div>
          </div>

          {/* Featured Accessory */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <Image 
                src="/image/cc2.jpg" 
                alt="Sạc điện" 
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bộ sạc nhanh AC 22kW</h3>
              <p className="text-gray-600 mb-4">Trạm sạc AC tiêu chuẩn Châu Âu cho mọi loại xe điện</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-red-500">25.000.000 đ</span>
                <span className="text-sm text-gray-500">Mới 100%</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>📍 Cần Thơ</span>
                <span>⚡ 22kW</span>
                <span>📅 2024</span>
              </div>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md font-medium transition duration-200">
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 mb-8">
          <div className="relative inline-block group">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            
            {/* Main button */}
            <Link 
              href="/listings"
              className="relative bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
                </svg>
                <span>Xem tất cả tin đăng</span>
              </div>
              
              {/* Animated arrow */}
              <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
            </Link>
          </div>
          
          {/* Additional info text */}
          <p className="text-gray-500 text-sm mt-4 max-w-md mx-auto">
            Khám phá thêm hàng nghìn tin đăng xe điện và phụ kiện chất lượng cao
          </p>
        </div>
      </section>

      {/* Product Selection Modal */}
      {showProductSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full transform transition-all duration-300 scale-100 animate-fadeIn shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white px-8 py-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Chọn sản phẩm bạn muốn đăng</h2>
                  <p className="text-teal-100 mt-1">Lựa chọn danh mục phù hợp với sản phẩm của bạn</p>
                </div>
                <button
                  onClick={() => setShowProductSelection(false)}
                  className="text-white hover:text-red-200 transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Xe hơi điện */}
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <Link href="/create-post?type=xe-hoi-dien" onClick={() => setShowProductSelection(false)}>
                    <div className="bg-gradient-to-br from-blue-50 to-teal-50 border-2 border-blue-200 rounded-xl p-8 h-full group-hover:border-blue-400 group-hover:shadow-xl transition-all duration-300">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">🚗 Xe hơi điện</h3>
                        <p className="text-gray-600 mb-4">Đăng tin mua bán xe điện các loại, từ xe cá nhân đến xe thương mại</p>
                        
                        {/* Features */}
                        <div className="space-y-2 text-sm text-gray-500">
                          <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Tesla, VinFast, BMW...</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Xe mới & xe cũ</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Đăng tin miễn phí</span>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <div className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium group-hover:bg-blue-600 transition-colors duration-200">
                            Chọn danh mục này
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Pin xe điện */}
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <Link href="/create-post?type=pin-xe-dien" onClick={() => setShowProductSelection(false)}>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 h-full group-hover:border-green-400 group-hover:shadow-xl transition-all duration-300">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">🔋 Pin xe điện</h3>
                        <p className="text-gray-600 mb-4">Đăng tin pin, sạc, phụ kiện và linh kiện xe điện</p>
                        
                        {/* Features */}
                        <div className="space-y-2 text-sm text-gray-500">
                          <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Pin Lithium, LFP...</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Sạc nhanh & phụ kiện</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Bảo hành chính hãng</span>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <div className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium group-hover:bg-green-600 transition-colors duration-200">
                            Chọn danh mục này
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  💡 <strong>Mẹo:</strong> Chọn đúng danh mục giúp tin đăng của bạn được nhiều người xem hơn
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-4 rounded-b-2xl border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Đăng tin an toàn & miễn phí</span>
                </div>
                <div className="text-teal-600 font-medium">EcoCarMarket</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center font-bold text-lg mr-3">
                  E
                </div>
                <span className="text-xl font-bold text-white">EcoCarMarket</span>
              </div>
              <p className="text-gray-300 text-sm">
                Nền tảng hàng đầu đăng tin mua bán xe điện và pin Việt Nam
              </p>
            </div>

            {/* Danh mục */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/xe-hoi-dien" className="text-gray-300 hover:text-white transition-colors">Xe hơi điện</Link></li>
                <li><Link href="/pin" className="text-gray-300 hover:text-white transition-colors">Pin xe điện</Link></li>
                <li><Link href="/phu-kien" className="text-gray-300 hover:text-white transition-colors">Phụ kiện</Link></li>
                <li><Link href="/dich-vu" className="text-gray-300 hover:text-white transition-colors">Dịch vụ</Link></li>
              </ul>
            </div>

            {/* Hỗ trợ */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/huong-dan-dang-tin" className="text-gray-300 hover:text-white transition-colors">Hướng dẫn đăng tin</Link></li>
                <li><Link href="/quy-dinh-su-dung" className="text-gray-300 hover:text-white transition-colors">Quy định sử dụng</Link></li>
                <li><Link href="/chinh-sach-bao-mat" className="text-gray-300 hover:text-white transition-colors">Chính sách bảo mật</Link></li>
                <li><Link href="/lien-he" className="text-gray-300 hover:text-white transition-colors">Liên hệ</Link></li>
              </ul>
            </div>

            {/* Liên hệ */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Email: support@ecocarmarket.vn
                </p>
                <p className="text-gray-300">
                  Hotline: 1900 1234
                </p>
                <p className="text-gray-300">
                  Địa chỉ: 123 Đường ABC, TP. HCM
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 EcoCarMarket. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex justify-center items-center mt-2">
              <span className="text-xs text-gray-500 mr-2">Designed by</span>
              <div className="bg-white px-2 py-1 rounded text-xs text-gray-800 font-medium">
                MinhPNQ(Call_Me_Steve ) - SWP391
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
>>>>>>> dde74fe5d0e256f83692a7c6435563b1c001f215
}
