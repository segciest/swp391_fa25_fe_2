'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function DangTinPage() {
  const searchParams = useSearchParams()
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState('create-post')
  const [selectedProductType, setSelectedProductType] = useState('xe-hoi-dien') // Default to xe-hoi-dien
  
  // Đọc URL parameters để tự động chọn loại sản phẩm
  useEffect(() => {
    const typeParam = searchParams.get('type')
    if (typeParam) {
      setSelectedProductType(typeParam)
    }
  }, [searchParams])

  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: '',
    color: '',
    warranty: '',
    price: '',
    description: '',
    sellerType: '',
    location: '',
    isFree: false,
    // Thêm trường cho pin xe điện
    capacity_kwh: '',
    health_percentage: '',
    charge_cycles: '',
    manufacturing_date: '',
    // Thêm trường cho xe điện
    mileage: '',
    condition: '',
    transmission: '',
    charging_type: '',
    range_km: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { ...formData, productType: selectedProductType })
    // Handle form submission logic here
    alert('Tin đăng đã được gửi thành công!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Navbar - Synchronized with Homepage */}
      <nav className="bg-gradient-to-r from-teal-600 to-green-600 shadow-lg fixed top-0 left-0 right-0 z-50" style={{height: '60px'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            {/* Left: Logo + Trang chủ */}
            <div className="flex items-center space-x-6">
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
                href="/pin-xe-dien" 
                onClick={() => setActiveNavItem('pin-xe-dien')}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-500 ease-in-out rounded-md transform-gpu ${
                  activeNavItem === 'pin-xe-dien' 
                    ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg scale-105 animate-pulse ring-2 ring-orange-300 ring-opacity-50' 
                    : 'text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:scale-102 hover:shadow-md'
                } active:scale-95`}
              >
                Pin xe điện
              </Link>
              <Link 
                href="/listings" 
                onClick={() => setActiveNavItem('listings')}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-500 ease-in-out rounded-md transform-gpu ${
                  activeNavItem === 'listings' 
                    ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg scale-105 animate-pulse ring-2 ring-orange-300 ring-opacity-50' 
                    : 'text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:scale-102 hover:shadow-md'
                } active:scale-95`}
              >
                Tin đăng
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              {/* Đăng tin button */}
              <div className="relative">
                <Link
                  href="/create-post"
                  onClick={() => setActiveNavItem('create-post')}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-md transition-all duration-500 ease-in-out transform-gpu ${
                    activeNavItem === 'create-post' 
                      ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg scale-105 animate-pulse ring-2 ring-orange-300 ring-opacity-50' 
                      : 'text-white bg-white/20 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:shadow-md hover:scale-102'
                  } active:scale-95`}
                >
                  ✍️ Đăng tin
                </Link>
              </div>

              {/* Account Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-200 p-2 rounded-md hover:bg-white/10"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">U</span>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isAccountMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
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
        {/* Page Header */}
        <div className="bg-gradient-to-r from-teal-500 to-green-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Đăng tin mua bán</h1>
              <p className="text-xl text-teal-100">Đăng tin bán xe điện và phụ kiện của bạn</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Post Form */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800">
                  Đăng tin {selectedProductType === 'xe-hoi-dien' ? 'xe hơi điện' : 'pin xe điện'}
                </h2>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Product Type Selection */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Loại sản phẩm <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedProductType('xe-hoi-dien')}
                    className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                      selectedProductType === 'xe-hoi-dien'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedProductType === 'xe-hoi-dien' ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">🚗 Xe hơi điện</h3>
                        <p className="text-sm text-gray-500">Tesla, VinFast, BMW...</p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProductType('pin-xe-dien')}
                    className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                      selectedProductType === 'pin-xe-dien'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedProductType === 'pin-xe-dien' ? 'bg-orange-500' : 'bg-green-500'
                      }`}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">🔋 Pin xe điện</h3>
                        <p className="text-sm text-gray-500">Pin, sạc, phụ kiện...</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>Bước 1: Thông tin sản phẩm</span>
                  <span>1/3</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full w-1/3"></div>
                </div>
              </div>

              {/* Hình ảnh sản phẩm */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Hình ảnh sản phẩm <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-orange-400 transition-colors duration-200 bg-gray-50">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {selectedProductType === 'pin-xe-dien' ? 'Tải ảnh pin/phụ kiện' : 'Tải ảnh xe điện'}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {selectedProductType === 'pin-xe-dien' 
                      ? 'Chụp ảnh pin, nhãn mác, các góc khác nhau để tăng độ tin cậy'
                      : 'Chụp ảnh toàn cảnh xe, nội thất, bảng điều khiển, và các chi tiết quan trọng'
                    }
                  </p>
                  <button
                    type="button"
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
                  >
                    📷 Chọn ảnh từ thiết bị
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Tối đa 10 ảnh, mỗi ảnh không quá 5MB</p>
                </div>
              </div>

              {/* Thông tin cơ bản */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Tiêu đề tin đăng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder={selectedProductType === 'pin-xe-dien' 
                    ? "VD: Pin Lithium 48V 20Ah chính hãng" 
                    : "VD: Tesla Model 3 2023 màu trắng"
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    {selectedProductType === 'pin-xe-dien' ? 'Thương hiệu pin' : 'Hãng xe'} <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  >
                    <option value="">
                      {selectedProductType === 'pin-xe-dien' ? 'Chọn thương hiệu pin' : 'Chọn hãng xe'}
                    </option>
                    {selectedProductType === 'pin-xe-dien' ? (
                      <>
                        <option value="panasonic">Panasonic</option>
                        <option value="lg-chem">LG Chem</option>
                        <option value="catl">CATL</option>
                        <option value="byd-battery">BYD Battery</option>
                        <option value="samsung-sdi">Samsung SDI</option>
                        <option value="tesla-battery">Tesla Battery</option>
                        <option value="vinfast-battery">VinFast Battery</option>
                        <option value="gs-yuasa">GS Yuasa</option>
                        <option value="bosch">Bosch</option>
                        <option value="khac">Thương hiệu khác</option>
                      </>
                    ) : (
                      <>
                        <option value="tesla">Tesla</option>
                        <option value="vinfast">VinFast</option>
                        <option value="bmw">BMW</option>
                        <option value="audi">Audi</option>
                        <option value="mercedes">Mercedes-Benz</option>
                        <option value="nissan">Nissan</option>
                        <option value="hyundai">Hyundai</option>
                        <option value="kia">KIA</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    {selectedProductType === 'pin-xe-dien' ? 'Loại pin/sản phẩm' : 'Loại xe'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                    placeholder={selectedProductType === 'pin-xe-dien' 
                      ? "VD: Lithium 48V, Sạc nhanh 60A, BMS 13S..."
                      : "VD: Model 3, VF8, i3..."
                    }
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>

              {/* Thông tin kỹ thuật khác nhau theo loại sản phẩm */}
              {selectedProductType === 'pin-xe-dien' ? (
                // Layout cho Pin xe điện
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Dung lượng pin (Ah) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="capacity_kwh"
                        value={formData.capacity_kwh}
                        onChange={handleInputChange}
                        required
                        placeholder="VD: 20, 40, 60..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Điện áp (V) <span className="text-red-500">*</span>
                      </label>
                      <select 
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      >
                        <option value="">Chọn điện áp</option>
                        <option value="12V">12V</option>
                        <option value="24V">24V</option>
                        <option value="36V">36V</option>
                        <option value="48V">48V</option>
                        <option value="60V">60V</option>
                        <option value="72V">72V</option>
                        <option value="96V">96V</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Tình trạng sức khỏe (%)
                      </label>
                      <input
                        type="number"
                        name="health_percentage"
                        value={formData.health_percentage}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        placeholder="VD: 95, 80..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Số chu kỳ sạc
                      </label>
                      <input
                        type="number"
                        name="charge_cycles"
                        value={formData.charge_cycles}
                        onChange={handleInputChange}
                        placeholder="VD: 500, 1200..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Ngày sản xuất
                      </label>
                      <input
                        type="month"
                        name="manufacturing_date"
                        value={formData.manufacturing_date}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      />
                    </div>
                  </div>
                </>
              ) : (
                // Layout cho Xe điện
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Đời xe <span className="text-red-500">*</span>
                      </label>
                      <select 
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      >
                        <option value="">Chọn đời xe</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Màu sắc
                      </label>
                      <select 
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      >
                        <option value="">Chọn màu sắc</option>
                        <option value="trang">Trắng</option>
                        <option value="den">Đen</option>
                        <option value="xam">Xám</option>
                        <option value="do">Đỏ</option>
                        <option value="xanh-duong">Xanh dương</option>
                        <option value="xanh-la">Xanh lá</option>
                        <option value="vang">Vàng</option>
                        <option value="bac">Bạc</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Số km đã đi
                      </label>
                      <input
                        type="number"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleInputChange}
                        placeholder="VD: 15000, 30000..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Tình trạng xe <span className="text-red-500">*</span>
                      </label>
                      <select 
                        name="condition"
                        value={formData.condition}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      >
                        <option value="">Chọn tình trạng</option>
                        <option value="moi">Mới</option>
                        <option value="cu-chat-luong-cao">Cũ chất lượng cao</option>
                        <option value="cu-binh-thuong">Cũ bình thường</option>
                        <option value="can-sua-chua">Cần sửa chữa</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Dạng sạc
                      </label>
                      <select 
                        name="charging_type"
                        value={formData.charging_type}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      >
                        <option value="">Chọn dạng sạc</option>
                        <option value="ac-cham">AC (Sạc chậm)</option>
                        <option value="dc-nhanh">DC (Sạc nhanh)</option>
                        <option value="ca-hai">Cả hai</option>
                        <option value="thay-pin">Thay pin</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Phạm vi hoạt động (km)
                    </label>
                    <input
                      type="number"
                      name="range_km"
                      value={formData.range_km}
                      onChange={handleInputChange}
                      placeholder="VD: 300, 500, 1000..."
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    />
                  </div>
                </>
              )}

              {/* Bảo hành và giá cả - chung cho cả hai loại */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Bảo hành
                  </label>
                  <input
                    type="text"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleInputChange}
                    placeholder={selectedProductType === 'pin-xe-dien' 
                      ? "VD: 2 năm, 6 tháng, còn bảo hành..."
                      : "VD: Còn bảo hành hãng 2 năm..."
                    }
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Giá bán <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      placeholder="VD: 500000000, 15000000..."
                      className="w-full p-4 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">VNĐ</span>
                  </div>
                  <div className="flex items-center mt-3">
                    <input
                      type="checkbox"
                      id="isFree"
                      name="isFree"
                      checked={formData.isFree}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <label htmlFor="isFree" className="ml-3 text-gray-700 font-medium">
                      Cho tặng miễn phí
                    </label>
                  </div>
                </div>
              </div>

              {/* Thông tin liên hệ */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Thông tin liên hệ</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Bạn là <span className="text-red-500">*</span>
                    </label>
                    <select 
                      name="sellerType"
                      value={formData.sellerType}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    >
                      <option value="">Chọn loại người bán</option>
                      <option value="ca-nhan">Cá nhân</option>
                      <option value="cua-hang">Cửa hàng/Đại lý</option>
                      <option value="cong-ty">Công ty</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Địa chỉ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="VD: Quận 1, TP.HCM hoặc Hà Nội, Ba Đình..."
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Mô tả chi tiết */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Mô tả chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={8}
                  placeholder={selectedProductType === 'pin-xe-dien' 
                    ? `Mô tả chi tiết về pin:
- Loại pin, dung lượng, điện áp
- Tình trạng sức khỏe, số chu kỳ sạc đã sử dụng
- Lý do bán, chính sách bảo hành
- Phụ kiện đi kèm (sạc, BMS, cáp...)
- Thời gian sử dụng, xuất xứ`
                    : `Mô tả chi tiết về sản phẩm:
- Xuất xứ, tình trạng chiếc xe
- Chính sách bảo hành, lịch sử bảo dưỡng
- Ưu điểm nổi bật của xe
- Thời gian sử dụng, số km đã đi`
                  }
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg resize-vertical min-h-[120px]"
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                <Link
                  href="/"
                  className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-lg font-medium text-center"
                >
                  ← Quay lại
                </Link>
                <button
                  type="button"
                  className="flex-1 px-8 py-4 border-2 border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-lg font-medium"
                >
                  Xem trước
                </button>
                <button
                  type="button"
                  className="flex-1 px-8 py-4 border-2 border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-lg font-medium"
                >
                  Lưu nháp
                </button>
                <button
                  type="submit"
                  className="flex-1 px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Đăng tin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-teal-500 rounded text-white flex items-center justify-center font-bold text-sm">
                  E
                </div>
                <span className="ml-2 text-lg font-semibold">EcoCarMarket</span>
              </div>
              <p className="text-gray-300 text-sm">
                Nền tảng mua bán xe điện và phụ kiện hàng đầu Việt Nam. 
                Kết nối người mua và người bán một cách tin cậy.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Facebook</span>
                  📘
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Instagram</span>
                  📷
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Sản phẩm</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Xe hơi điện</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Pin xe điện</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Phụ kiện</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Sạc xe điện</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Hướng dẫn mua</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Hướng dẫn bán</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Quy định</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Liên hệ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📞 Hotline: 1900-XXX-XXX</p>
                <p>✉️ Email: support@ecocarmarket.vn</p>
                <p>📍 Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
                <p>🕒 Thời gian: 8:00 - 22:00 (T2-CN)</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2024 EcoCarMarket. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}