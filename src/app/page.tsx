'use client';

import { useEffect, useState } from 'react';
import { fetchPosts } from '@/lib/api';
import { Post } from '@/types/post';
import PostCard from '../../components/HomePage/PostCard';
import FilterTabs from '../../components/HomePage/FilterTabs';
import PostModal from '../../components/CreatePost/PostModal';

// === PHẦN 1: COMPONENT GIỚI THIỆU ===
function IntroSection({ onOpenModal }: { onOpenModal: () => void }) {
  const backgroundImages = [
    '/image/background.jpg',
    '/image/background2.jpg',
    '/image/background3.jpg',
    '/image/background4.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative w-full h-screen text-white bg-gradient-to-r from-teal-600 to-green-600 overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out
            ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ backgroundImage: `url(${image})` }}
          onError={(e) => {
            e.currentTarget.style.backgroundImage = 'none';
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/50 to-green-600/50 z-10"></div>

      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-6xl text-center">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6" 
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}
          >
            Chào mừng đến với EV-Shop
          </h1>
          <p 
            className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto"
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
          >
            EV-Shop là nền tảng hàng đầu mua bán xe điện đã qua sử dụng và pin.
            Chúng tôi cam kết mang lại trải nghiệm tốt nhất cho Khách hàng với các sản phẩm chất lượng cao và dịch vụ uy tín.
          </p>
          
          <button 
            onClick={onOpenModal}
            className="header-button header-button-post text-base md:text-lg font-bold px-8 md:px-10 py-4 md:py-5 inline-block mb-12"
          >
            Đăng tin ngay
          </button>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            <div>
              <p className="text-3xl md:text-4xl font-bold">1000+</p>
              <p className="text-teal-200 text-sm md:text-base mt-2">Xe điện đang bán</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">500+</p>
              <p className="text-teal-200 text-sm md:text-base mt-2">Khách hàng tin tưởng</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">50+</p>
              <p className="text-teal-200 text-sm md:text-base mt-2">Thương hiệu xe</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">24/7</p>
              <p className="text-teal-200 text-sm md:text-base mt-2">Hỗ trợ khách hàng</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// === PHẦN 2: COMPONENT TIN ĐĂNG NỔI BẬT ===
function FeaturedPostsSection({ onOpenModal }: { onOpenModal: () => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<'Tất cả' | 'Xe Điện' | 'Pin Xe Điện'>('Tất cả');
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Tin đăng nổi bật
        </h2>

        <div className="flex justify-center mb-8">
          <FilterTabs selected={filter} onChange={setFilter} />
        </div>

        {isLoggedIn && (
          <div className="flex justify-center mb-8">
            <button
              onClick={onOpenModal}
              className="add-post-button-new"
            >
              <span className="add-post-icon">➕</span>
              <span>Đăng Bài Viết</span>
            </button>
          </div>
        )}
        
        {loading && <p className="text-center text-gray-500 py-8">Đang tải tin đăng...</p>}
        {error && <p className="text-center text-red-500 py-8">{error}</p>}
        
        {!loading && !error && filteredPosts.length > 0 && (
                  <div className="posts-container">
                  <div className="post-grid">
                        {filteredPosts.map(post => (
                                <PostCard key={post.id} post={post} />
                                           ))}
                      </div>
                    </div>
                  )}

        {!loading && !error && filteredPosts.length === 0 && (
          <p className="text-center text-gray-500 py-8">Không có tin đăng nào phù hợp.</p>
        )}
      </div>
    </section>
  );
}

// === COMPONENT TRANG CHỦ CHÍNH ===
export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main>
      <IntroSection onOpenModal={() => setShowModal(true)} />
      
      <PostModal isOpen={showModal} onClose={() => setShowModal(false)} />
      
      <FeaturedPostsSection onOpenModal={() => setShowModal(true)} />
    </main>
  );
}