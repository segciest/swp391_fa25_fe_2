'use client';

import CreatePostForm from './CreatePostForm';
import { useEffect, useState } from 'react';

export default function PostModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) setTimeout(() => setShow(true), 10);
        else setShow(false);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div
                className={`bg-white w-full max-w-xl mx-4 md:mx-0 rounded-2xl shadow-2xl p-8 relative transition-all duration-300 ease-in-out transform ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-semibold transition"
                    aria-label="Close modal"
                >
                    ×
                </button>

                {/* Modal Title */}
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 flex items-center justify-center gap-2">
                    📝 Tạo Bài Viết Mới
                </h2>

                {/* Form Component */}
                <CreatePostForm onSuccess={onClose} />
            </div>
        </div>
    );
}
