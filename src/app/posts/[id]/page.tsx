// src/app/posts/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPostById } from '@/lib/api';
import { PostDetail } from '@/types/postDetail';

export default function PostDetailPage() {
    const { id } = useParams(); // lấy id từ URL
    const [post, setPost] = useState<PostDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetchPostById(id as string)
            .then(setPost)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center mt-10">Đang tải...</div>;
    if (!post) return <div className="text-center mt-10 text-red-500">Không tìm thấy bài viết</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 pt-[80px]">
            <img
                src={post.image}
                alt={post.title}
                className="w-full h-80 object-cover rounded-lg mb-6"
            />
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-6">{post.description}</p>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </div>
    );
}
