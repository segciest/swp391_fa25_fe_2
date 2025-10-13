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
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
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
}
