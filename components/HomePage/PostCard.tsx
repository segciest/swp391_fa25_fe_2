'use client';

import Link from "next/link";
import { Post } from "@/types/post";
import './PostCard.css';

export default function PostCard({ post }: { post: Post }) {
    return (
        <Link href={`/posts/${post.id}`} className="post-card-link">
            <div className="post-card">
                <img
                    src={post.image}
                    alt={post.title}
                    className="post-card-image"
                />

                <div className="post-card-content">
                    <h2 className="post-card-title">{post.title}</h2>
                    <p className="post-card-description">
                        {post.description}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                        <div className="post-card-tags">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="post-card-tag"
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