'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getToken, isTokenExpired } from '@/utils/auth';
import { decodeToken, JwtPayload } from '@/utils/decodeToken';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  price: string;
  image: string;
  status: 'active' | 'sold' | 'pending';
  views: number;
  createdAt: string;
}

export default function MyPostsPage() {
  const router = useRouter();
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'sold'>('all');

  useEffect(() => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      router.push('/login-register');
      return;
    }

    const decoded = decodeToken(token);
    setUser(decoded);

    // Fetch user posts
    fetchUserPosts(decoded.userId);
  }, [router]);

  const fetchUserPosts = async (userId: number) => {
    try {
      // Mock data - replace with actual API call
      const mockPosts: Post[] = [];
      
      setPosts(mockPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (activeTab === 'all') return true;
    return post.status === activeTab;
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-4">
                  <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tin đã đăng của tôi</h1>
          <p className="text-gray-600">Quản lý tất cả tin đăng của bạn</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                activeTab === 'all'
                  ? 'text-orange-500 border-b-3 border-orange-500 bg-orange-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Tất cả ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                activeTab === 'active'
                  ? 'text-orange-500 border-b-3 border-orange-500 bg-orange-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Đang hiển thị ({posts.filter(p => p.status === 'active').length})
            </button>
            <button
              onClick={() => setActiveTab('sold')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                activeTab === 'sold'
                  ? 'text-orange-500 border-b-3 border-orange-500 bg-orange-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              Đã bán ({posts.filter(p => p.status === 'sold').length})
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <svg className="w-32 h-32 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Bạn chưa có tin đăng nào
              </h3>
              <p className="text-gray-600 mb-6">
                Hãy bắt đầu đăng tin để bán những sản phẩm của bạn
              </p>
              <Link
                href="/create-post"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                ĐĂNG TIN NGAY
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                    post.status === 'active' ? 'bg-green-500 text-white' :
                    post.status === 'sold' ? 'bg-gray-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {post.status === 'active' ? 'Đang hiển thị' :
                     post.status === 'sold' ? 'Đã bán' : 'Chờ duyệt'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-orange-500 font-bold text-lg mb-2">{post.price}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {post.views} lượt xem
                    </span>
                    <span>{post.createdAt}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors text-sm">
                      Chỉnh sửa
                    </button>
                    <button className="flex-1 border-2 border-gray-300 hover:border-red-500 hover:text-red-500 text-gray-700 font-semibold py-2 rounded-lg transition-colors text-sm">
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
