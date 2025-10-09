// src/app/posts/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPostById } from '@/lib/api';
import { PostDetail } from '@/types/postDetail';

function maskPhone(phone?: string) {
  if (!phone) return '';
  // show first 3 and last 3 digits
  if (phone.length <= 6) return phone.replace(/.(?=.{3})/g, '*');
  return phone.slice(0, 3) + phone.slice(3, -3).replace(/./g, '*') + phone.slice(-3);
}

function timeAgo(isoOrDate?: string | Date) {
    if (!isoOrDate) return '';
    const d = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate;
    const secs = Math.floor((Date.now() - d.getTime()) / 1000);
    if (secs < 60) return `Đăng ${secs} giây trước`;
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `Đăng ${mins} phút trước`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Đăng ${hours} giờ trước`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `Đăng ${days} ngày trước`;
    const months = Math.floor(days / 30);
    if (months < 12) return `Đăng ${months} tháng trước`;
    const years = Math.floor(months / 12);
    return `Đăng ${years} năm trước`;
}

function getLocation(post: any) {
    // Try a few common fields where location might be stored
    return post.location || post.address || post.seller?.address || post.seller?.location || null;
}

export default function PostDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState<PostDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetchPostById(id as string)
            .then(setPost)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center mt-10">Đang tải...</div>;
    if (!post) return <div className="text-center mt-10 text-red-500">Không tìm thấy bài viết</div>;

    const images: string[] = (post as any).images && (post as any).images.length > 0
        ? (post as any).images.map((im: any) => im.url || im.path || im)
        : [post.image];

    const mainImage = images[mainImageIndex] || post.image;

    return (
        <div className="max-w-6xl mx-auto px-4 pt-[80px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: images and details */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded shadow p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold">{post.title}</h1>
                                <div className="text-sm text-gray-500">{post.category?.categoryName || ''} • {post.year || ''}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setSaved(s => !s)} className={`px-3 py-1 rounded ${saved ? 'bg-yellow-400' : 'bg-gray-100'}`} title="Lưu">
                                    {/* bookmark icon */}
                                    {saved ? '★ Lưu' : '☆ Lưu'}
                                </button>
                                <button onClick={async () => {
                                    const url = window.location.href;
                                    if ((navigator as any).share) {
                                        try { await (navigator as any).share({ title: post.title, url }); } catch (e) { /* ignore */ }
                                    } else {
                                        await navigator.clipboard.writeText(url);
                                        alert('Đã sao chép liên kết vào clipboard');
                                    }
                                }} className="px-3 py-1 rounded bg-gray-100" title="Chia sẻ">🔗 Chia sẻ</button>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <img src={mainImage} alt={post.title} className="w-full h-[420px] object-cover rounded" />
                                <div className="mt-3 flex gap-2">
                                    {images.map((src: string, idx: number) => (
                                        <button key={idx} onClick={() => setMainImageIndex(idx)} className={`w-20 h-14 overflow-hidden rounded border ${idx === mainImageIndex ? 'ring-2 ring-blue-500' : ''}`}>
                                            <img src={src} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center justify-between mt-4">
                                <div>
                                    <div className="text-2xl text-red-600 font-semibold">{post.price?.toLocaleString()} đ</div>
                                    <div className="text-sm text-gray-500 mt-1">{post.category?.categoryName || ''} • {post.year || ''}</div>
                                </div>
                                <div className="text-sm text-gray-600">{timeAgo(post.createdAt)}</div>
                            </div>

                            <div className="mt-6 prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content || post.description || '' }} />
                        </div>
                    </div>
                </div>

                {/* Right: price & contact panel */}
                <div>
                    <div className="bg-white rounded shadow p-4 mb-4">
                        <div className="text-sm text-gray-500">Giá</div>
                        <div className="text-2xl font-bold text-red-600 mt-2">{post.price?.toLocaleString()} đ</div>

                        <div className="mt-4 flex gap-2">
                            <button className="flex-1 bg-blue-600 text-white py-2 rounded">Chat</button>
                            <a href={`tel:${post.contact}`} className="flex-1 bg-yellow-400 text-black py-2 rounded text-center">
                                Hiện số {maskPhone(post.contact)}
                            </a>
                        </div>

                        <div className="mt-4 text-sm text-gray-600">
                            <div>📍 {getLocation(post) || (post.seller?.userID ? post.seller?.userID : '')}</div>
                            <div className="mt-2">{post.status}</div>
                        </div>
                    </div>

                    <div className="bg-white rounded shadow p-4">
                        <div className="flex items-center gap-3">
                            <img src={(post.seller as any)?.avatar || (post.seller as any)?.avatarUrl || '/image/avatar1.png'} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <div className="font-semibold">{post.seller?.userName}</div>
                                <div className="text-sm text-gray-500">{post.seller?.userEmail}</div>
                            </div>
                        </div>

                        <div className="mt-4 text-sm">
                            <div>Đánh giá: ⭐⭐⭐⭐☆</div>
                            <div className="mt-2">Hoạt động gần đây</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
