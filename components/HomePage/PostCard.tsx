'use client';

import Link from "next/link";
import { Post } from "@/types/post";

export default function PostCard({ post }: { post: Post }) {
    return (
        <Link href={`/posts/${post.id}`}>
            <div className="post-card flex flex-col h-full border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-2xl transition cursor-pointer bg-white overflow-hidden">
                <div className="overflow-hidden rounded-lg mb-3">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-40 object-cover"
                    />
                </div>

                <div className="flex flex-col flex-grow">
                    <h2 className="text-lg font-bold mt-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent hover:from-green-600 hover:to-emerald-500 transition-all">
                        {post.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3 flex-grow min-h-[60px] leading-relaxed">
                        {post.description}
                    </p>


                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full font-medium hover:from-green-200 hover:to-emerald-200 transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
