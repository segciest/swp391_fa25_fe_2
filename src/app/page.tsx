'use client';

import { useEffect, useState } from 'react';
import { fetchPosts } from '@/lib/api';
import { Post } from '@/types/post';
import PostCard from '../../components/HomePage/PostCard';
import FilterTabs from '../../components/HomePage/FilterTabs';
import PostModal from '../../components/CreatePost/PostModal';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<'Tất cả' | 'Xe Điện' | 'Pin Xe Điện'>('Tất cả');
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ← thêm state này

  useEffect(() => {
    fetchPosts().then(setPosts).catch(console.error);
  }, []);

  // 👇 Kiểm tra access_token từ localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token); // nếu có token thì true
    }
  }, []);

  const filteredPosts = posts.filter(post => {
    if (filter === 'Tất cả') return true;
    return post.category === filter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 pt-[80px]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tin Tức Xe Điện & Pin</h1>

        {/* 👇 Chỉ hiện nếu đã đăng nhập */}
        {isLoggedIn && (
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ➕ Đăng Bài Viết
          </button>
        )}
      </div>

      <FilterTabs selected={filter} onChange={setFilter} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[1fr]">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>


      <PostModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
