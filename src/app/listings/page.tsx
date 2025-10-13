 'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function TinDangPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState('listings')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(8)
  const [totalPosts] = useState(1247)
  const [showProductSelection, setShowProductSelection] = useState(false)

  // Calculate pagination
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const startPost = (currentPage - 1) * postsPerPage + 1
  const endPost = Math.min(currentPage * postsPerPage, totalPosts)

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      // Scroll to top when changing page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Generate more sample posts for demonstration
  const basePosts = [
    {
      title: "Tesla Model 3 2020 - Trình trạng tốt, pin còn 85%",
      price: "1,200,000,000",
      location: "TP HCM",
      year: "2020",
      condition: "Xe cũ",
      km: "45,000",
      badge: "Tin nổi bật",
      badgeColor: "bg-blue-500",
      image: "/image/banner1.png"
    },
    {
      title: "VinFast VF8 2022 - Xe gia đình, bảo hành còn 2 năm",
      price: "950,000,000",
      location: "Hà Nội",
      year: "2022",
      condition: "Xe cũ",
      km: "12,000",
      badge: "Tin vip nhất",
      badgeColor: "bg-orange-500",
      image: "/image/banner2.png"
    },
    {
      title: "Pin Lithium 60kWh cho Tesla Model S - Còn bảo hành",
      price: "180,000,000",
      location: "Đà Nẵng",
      year: "2021",
      condition: "Còn tốt",
      km: "- -",
      badge: "Pin vip",
      badgeColor: "bg-green-500",
      image: "/image/banner3.png"
    },
    {
      title: "Hyundai Kona Electric 2021 - Trả kiểm nhận hiểu",
      price: "720,000,000",
      location: "Cần Thơ",
      year: "2021",
      condition: "Xe cũ",
      km: "28,000",
      badge: "Tin nổi bật",
      badgeColor: "bg-blue-500",
      image: "/image/banner4.png"
    },
    {
      title: "Pin LiFePO4 48V 100Ah cho xe điện nhỏ",
      price: "25,000,000",
      location: "TP HCM",
      year: "2023",
      condition: "Mới",
      km: "- -",
      badge: "Pin vip",
      badgeColor: "bg-green-500",
      image: "/image/banner1.png"
    },
    {
      title: "BMW i3 2019 - Xe điện cao cấp, nội thất sang trọng",
      price: "850,000,000",
      location: "Hà Nội",
      year: "2019",
      condition: "Xe cũ",
      km: "35,000",
      badge: "Xe nổi bật có",
      badgeColor: "bg-blue-500",
      image: "/image/banner2.png"
    },
    {
      title: "Nissan Leaf 2020 - Xe nhập khẩu chính hãng",
      price: "650,000,000",
      location: "TP HCM",
      year: "2020",
      condition: "Xe cũ",
      km: "32,000",
      badge: "Tin nổi bật",
      badgeColor: "bg-blue-500",
      image: "/image/banner3.png"
    },
    {
      title: "Sạc nhanh DC 50kW - Dành cho các dòng xe điện",
      price: "120,000,000",
      location: "Hà Nội",
      year: "2023",
      condition: "Mới",
      km: "- -",
      badge: "Pin vip",
      badgeColor: "bg-green-500",
      image: "/image/banner4.png"
    }
  ]

  // Generate posts for current page
  const allSamplePosts = Array.from({ length: postsPerPage }, (_, index) => {
    const baseIndex = ((currentPage - 1) * postsPerPage + index) % basePosts.length
    const postNumber = (currentPage - 1) * postsPerPage + index + 1
    return {
      id: postNumber,
      ...basePosts[baseIndex],
      title: basePosts[baseIndex].title + ` (Trang ${currentPage})`,
      price: (parseInt(basePosts[baseIndex].price.replace(/,/g, '')) + index * 50000000).toLocaleString()
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Navbar - Synchronized with Homepage */}
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
                        href="/thuong-hieu" 
                        className={`block px-4 py-2 text-sm font-medium transition-all duration-400 ease-in-out transform ${
                          activeNavItem === 'thuong-hieu' 
                            ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg scale-105 animate-pulse' 
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-orange-200 hover:text-orange-600 hover:scale-102 active:scale-95'
                        }`}
                        onClick={() => {
                          setActiveNavItem('thuong-hieu');
                          setIsMenuOpen(false);
                        }}
                      >
                        🏢 Thương hiệu
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

            {/* Center Search Bar - Replaces Navigation Links */}
            <div className="hidden lg:flex items-center flex-1 max-w-4xl mx-6">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm xe điện, pin, phụ kiện..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    type="submit"
                    className="h-full px-4 text-white bg-teal-500 hover:bg-teal-600 rounded-r-lg transition-colors duration-200 flex items-center"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
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
        {/* Breadcrumb */}
        <section className="bg-gray-50 py-3 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-teal-600">Trang chủ</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800 font-medium">Đăng tin bán xe hơi điện cũ và pin</span>
            </nav>
          </div>
        </section>

        {/* Page Header */}
        <section className="bg-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Đăng tin bán xe hơi điện cũ và pin
                </h1>
                <p className="text-gray-600">
                  Tìm thấy <span className="font-semibold text-orange-600">{totalPosts.toLocaleString()}</span> tin đăng phù hợp
                </p>
              </div>
              
              {/* Mobile Search Bar */}
              <div className="mt-4 lg:hidden">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm xe điện, pin..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                      type="submit"
                      className="h-full px-3 text-white bg-teal-500 hover:bg-teal-600 rounded-r-lg transition-colors duration-200 flex items-center"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sort Options */}
              <div className="mt-4 lg:mt-0 flex items-center gap-2">
                <span className="text-sm text-gray-500">Sắp xếp:</span>
                <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                  <option value="newest">Tin mới trước</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                  <option value="popular">Phổ biến nhất</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Filter Bar */}
        <section className="bg-white py-4 border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 mr-2">Danh mục:</label>
                <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 min-w-[120px]">
                  <option value="">Tất cả</option>
                  <option value="xe-dien">Xe điện</option>
                  <option value="pin">Pin xe điện</option>
                  <option value="phu-kien">Phụ kiện</option>
                </select>
              </div>

              {/* Price Filter */}
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 mr-2">Giá:</label>
                <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 min-w-[140px]">
                  <option value="">Tất cả</option>
                  <option value="0-500">Dưới 500 triệu</option>
                  <option value="500-1000">500 triệu - 1 tỷ</option>
                  <option value="1000-2000">1 - 2 tỷ</option>
                  <option value="2000+">Trên 2 tỷ</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 mr-2">Khu vực:</label>
                <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 min-w-[130px]">
                  <option value="">Toàn quốc</option>
                  <option value="hcm">TP. HCM</option>
                  <option value="hn">Hà Nội</option>
                  <option value="dn">Đà Nẵng</option>
                  <option value="ct">Cần Thơ</option>
                </select>
              </div>

              {/* Condition Filter */}
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 mr-2">Tình trạng:</label>
                <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 min-w-[100px]">
                  <option value="">Tất cả</option>
                  <option value="moi">Xe mới</option>
                  <option value="cu">Xe cũ</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allSamplePosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((post) => (
              <div key={post.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300">
                <div className="relative">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    width={300}
                    height={180}
                    className="w-full h-44 object-cover"
                  />
                  <div className={`absolute top-3 left-3 ${post.badgeColor} text-white px-2 py-1 rounded text-xs font-medium`}>
                    {post.badge}
                  </div>
                  <button className="absolute top-3 right-3 p-1.5 bg-white/80 hover:bg-white rounded-full transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 leading-5">
                    {post.title}
                  </h3>
                  <div className="text-lg font-bold text-red-600 mb-3">
                    {post.price} đ
                  </div>
                  
                  <div className="space-y-1 text-xs text-gray-600 mb-3">
                    <div className="flex items-center justify-between">
                      <span>Năm sản xuất:</span>
                      <span className="font-medium">{post.year}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tình trạng:</span>
                      <span className="font-medium">{post.condition}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Km đã đi:</span>
                      <span className="font-medium">{post.km} km</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{post.location}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>1 ngày trước</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium transition duration-200 flex items-center justify-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Xem chi tiết
                    </button>
                    <button className="px-3 py-2 border border-blue-500 text-blue-500 rounded text-sm hover:bg-blue-50 transition duration-200">
                      Liên hệ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-1">
              <span className="text-sm text-gray-500 mr-4">{startPost}-{endPost} của {totalPosts} tin đăng</span>
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                ‹
              </button>
              
              {/* Page Numbers */}
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const pageNum = currentPage <= 3 ? index + 1 : 
                                currentPage >= totalPages - 2 ? totalPages - 4 + index : 
                                currentPage - 2 + index;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pageNum === currentPage
                        ? 'bg-blue-500 text-white'
                        : 'border border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {/* Show ellipsis and last page if needed */}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="px-3 py-2 text-gray-500 text-sm">...</span>
                  <button 
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {totalPages}
                  </button>
                </>
              )}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                ›
              </button>
              <span className="text-sm text-gray-500 ml-4">Trang</span>
            </nav>
          </div>
        </section>
      </div>

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
                Nền tảng hàng đầu đăng tin mua bán xe điện và linh kiện tại Việt Nam
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

      {/* Product Selection Modal */}
      {showProductSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-green-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Chọn sản phẩm bạn muốn đăng</h2>
                  <p className="text-teal-100 mt-2">Lựa chọn danh mục phù hợp với sản phẩm của bạn</p>
                </div>
                <button
                  onClick={() => setShowProductSelection(false)}
                  className="text-white hover:text-gray-200 transition-colors duration-200"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </div>
  )
}