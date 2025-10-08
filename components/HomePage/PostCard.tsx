'use client';

import Link from "next/link";
import { Post } from "@/types/post";

export default function PostCard({ post }: { post: Post }) {
    return (
        <Link href={`/posts/${post.id}`}>
            <div className="flex flex-col h-full border rounded-md p-4 shadow hover:shadow-lg transition cursor-pointer bg-white">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded"
                />

                <div className="flex flex-col flex-grow">
                    <h2 className="text-lg font-semibold mt-2">{post.title}</h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3 flex-grow min-h-[60px]">
                        {post.description}
                    </p>


                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
