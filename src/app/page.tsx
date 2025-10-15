'use client';

import { useEffect, useState } from 'react';

import { fetchPosts } from '@/lib/api';

import { Post } from '@/types/post';

import PostCard from '../../components/HomePage/PostCard';

import FilterTabs from '../../components/HomePage/FilterTabs';

import PostModal from '../../components/CreatePost/PostModal';


// === PHẦN 1: COMPONENT GIỚI THIỆU (ĐÃ CẬP NHẬT VỚI SLIDESHOW) ===
function IntroSection() {
  // 1. Mảng chứa đường dẫn đến các ảnh nền
  const backgroundImages = [
    '/image/background.jpg',
    '/image/background2.jpg',
    '/image/background3.jpg',
    '/image/background4.jpg',
  ];

  // 2. State để theo dõi ảnh nền hiện tại
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3. Effect để tự động chuyển ảnh sau mỗi 5 giây
  useEffect(() => {
    // Thiết lập một bộ đếm thời gian
    const intervalId = setInterval(() => {
      // Chuyển sang ảnh tiếp theo, quay về ảnh đầu tiên nếu hết mảng
      setCurrentIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // 5000ms = 5 giây

    // Rất quan trọng: Dọn dẹp bộ đếm khi component bị unmount
    return () => clearInterval(intervalId);
  }, []); // [] đảm bảo effect này chỉ chạy một lần khi component được mount

  return (
    // Section cha cần 'relative' để chứa các lớp ảnh nền
    <section className="relative h-screen text-white bg-black">
      {/* 4. Dùng map để tạo các lớp ảnh nền xếp chồng lên nhau */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out
            ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {/* Lớp phủ màu gradient để làm nổi bật chữ */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/70 to-green-600/70 z-10"></div>

      {/* Nội dung sẽ nằm ở lớp trên cùng (z-20) */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        <div className="container mx-auto max-w-6xl px-6 text-center">
          <h1 
            className="text-5xl md:text-7xl font-bold leading-tight mb-4" 
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}
          >
            Chào mừng đến với EV-Shop
          </h1>
          <p 
            className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto"
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
          >
            EV-Shop là nền tảng hàng đầu tin mua bán xe điện đã qua sử dụng và pin.
            Chúng tôi cam kết mang lại trải nghiệm tốt nhất cho Khách hàng với các sản phẩm
            chất lượng cao và dịch vụ uy tín.
          </p>
          <a 
            href="/dang-tin" 
            className="header-button header-button-post text-xl font-bold px-10 py-5 inline-block"
          >
            Đăng tin ngay
          </a>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div><p className="text-4xl font-bold">1000+</p><p className="text-teal-200">Xe điện đang bán</p></div>
            <div><p className="text-4xl font-bold">500+</p><p className="text-teal-200">Khách hàng tin tưởng</p></div>
            <div><p className="text-4xl font-bold">50+</p><p className="text-teal-200">Thương hiệu xe</p></div>
            <div><p className="text-4xl font-bold">24/7</p><p className="text-teal-200">Hỗ trợ khách hàng</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}


// === PHẦN 2: COMPONENT TIN ĐĂNG NỔI BẬT (Giữ nguyên) ===
function FeaturedPostsSection() {
    // ... (Toàn bộ nội dung của function này giữ nguyên như trước)
    const [posts, setPosts] = useState<Post[]>([]);
    const [filter, setFilter] = useState<'Tất cả' | 'Xe Điện' | 'Pin Xe Điện'>('Tất cả');
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadPosts() {
        try {
            setLoading(true);
            const data = await fetchPosts(); 
            setPosts(data);
            setError(null);
        } catch (err) {
            setError("Không thể tải được dữ liệu. Vui lòng thử lại sau.");
            console.error(err);
        } finally {
            setLoading(false);
        }
        }
        loadPosts();
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
        const token = localStorage.getItem('userData');
        setIsLoggedIn(!!token);
        }
    }, []);

    const filteredPosts = posts.filter(post => {
        if (filter === 'Tất cả') return true;
        return post.category === filter;
    });

    return (
        <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-6xl px-4">
            <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Tin đăng nổi bật
            </h2>
            {isLoggedIn && (
                <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                >
                <span>➕</span>
                <span>Đăng Bài Viết</span>
                </button>
            )}
            </div>

            <div className="flex justify-center mb-8">
            <FilterTabs selected={filter} onChange={setFilter} />
            </div>
            
            {loading && <p className="text-center text-gray-500 py-8">Đang tải tin đăng...</p>}
            {error && <p className="text-center text-red-500 py-8">{error}</p>}
            
            {!loading && !error && filteredPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
                ))}
            </div>
            )}

            {!loading && !error && filteredPosts.length === 0 && (
                <p className="text-center text-gray-500 py-8">Không có tin đăng nào phù hợp.</p>
            )}

            <PostModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
        </section>
    );
}


// === KẾT HỢP TẤT CẢ LẠI TRONG COMPONENT TRANG CHỦ CHÍNH ===
export default function HomePage() {
  return (
    <main>
      <IntroSection />
      <FeaturedPostsSection />
    </main>
  );
}