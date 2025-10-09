'use client';

import { useState, useEffect } from 'react';

export default function CreatePostForm({ onSuccess }: { onSuccess: () => void }) {
    interface FormData {
        title: string;
        description: string;
        brand: string;
        price: number | string;
        categoryId: number;
        // thêm các field kỹ thuật
        seats?: number;
        battery?: string;
        range?: string;
        speed?: string;
        weight?: string;
        capacity?: string;
        type?: string;
        cycles?: number;
    }
    const [form, setForm] = useState<FormData>({
        title: '',
        description: '',
        brand: '',
        price: '',
        categoryId: 1,
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // 🧠 Handle input change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'categoryId' || name === 'seats' || name === 'cycles'
                ? Number(value)
                : value
        }));
    };

    // 🛠️ Render các trường riêng theo category
    const renderCategoryFields = () => {
        switch (form.categoryId) {
            case 1: // Xe hơi điện
                return (
                    <>
                        <input name="seats" value={form.seats || ''} onChange={handleChange} placeholder="Số chỗ" className="w-full p-2 border rounded" />
                        <input name="battery" value={form.battery || ''} onChange={handleChange} placeholder="Dung lượng pin" className="w-full p-2 border rounded" />
                        <input name="range" value={form.range || ''} onChange={handleChange} placeholder="Tầm hoạt động (km)" className="w-full p-2 border rounded" />
                    </>
                );
            case 2: // Xe máy điện
                return (
                    <>
                        <input name="speed" value={form.speed || ''} onChange={handleChange} placeholder="Tốc độ tối đa (km/h)" className="w-full p-2 border rounded" />
                        <input name="weight" value={form.weight || ''} onChange={handleChange} placeholder="Trọng lượng (kg)" className="w-full p-2 border rounded" />
                        <input name="battery" value={form.battery || ''} onChange={handleChange} placeholder="Loại pin" className="w-full p-2 border rounded" />
                    </>
                );
            case 3: // Pin xe điện
                return (
                    <>
                        <input name="capacity" value={form.capacity || ''} onChange={handleChange} placeholder="Dung lượng (kWh)" className="w-full p-2 border rounded" />
                        <input name="type" value={form.type || ''} onChange={handleChange} placeholder="Loại pin" className="w-full p-2 border rounded" />
                        <input name="cycles" value={form.cycles || ''} onChange={handleChange} placeholder="Số lần sạc" className="w-full p-2 border rounded" />
                    </>
                );
            default:
                return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {

            // Read stored userData (saved as { token, userId })
            const storedRaw = localStorage.getItem('userData');
            if (!storedRaw) throw new Error('Chưa đăng nhập');
            const stored = JSON.parse(storedRaw) as { token?: string; userId?: string };
            const token = stored.token;
            const userId = stored.userId;
            if (!token || !userId) throw new Error('Authentication information missing');

            // Client-side check: is token expired? (token is JWT)
            try {
                const parts = token.split('.');
                if (parts.length === 3) {
                    const payload = JSON.parse(atob(parts[1]));
                    const exp = payload.exp; // exp in seconds
                    if (exp && Date.now() / 1000 > exp) {
                        // expired -> clear auth and redirect to sign-in
                        localStorage.removeItem('userData');
                        localStorage.removeItem('token');
                        setErrorMessage('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                        setLoading(false);
                        setTimeout(() => { window.location.href = '/login-register'; }, 900);
                        return;
                    }
                }
            } catch (e) {
                // malformed token - let server handle it, but don't crash here
                console.warn('Unable to decode token on client', e);
            }

            // Build Listing-shaped payload expected by backend
            const body: any = {
                seller: { userID: userId },
                category: { categoryId: form.categoryId },
                title: form.title,
                description: form.description,
                brand: form.brand,
                price: Number(form.price),
                // map optional technical fields where present
                seats: form.seats ?? null,
                batteryCapacity: form.battery ?? null,
                mileage: form.range ?? null,
                vehicleType: form.type ?? null,
                capacity: form.capacity ?? null,
                cycleCount: form.cycles ?? null,
            };

            const res = await fetch('http://localhost:8080/api/listing/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                // try to read response body to show a helpful message
                let text: string | null = null;
                try {
                    // backend might return JSON or plain text
                    const contentType = res.headers.get('content-type') || '';
                    if (contentType.includes('application/json')) {
                        const j = await res.json();
                        text = JSON.stringify(j);
                    } else {
                        text = await res.text();
                    }
                } catch (e) {
                    text = null;
                }
                console.error('Create listing failed', { status: res.status, body: text });
                setErrorMessage(text || `Đăng bài thất bại (status ${res.status})`);
                throw new Error(text || `Đăng bài thất bại (status ${res.status})`);
            }

            onSuccess();
        } catch (error) {
            console.error('Lỗi khi đăng bài:', error);
            if (error instanceof Error) setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold">Tạo Bài Viết Mới</h2>

            <input name="title" value={form.title} onChange={handleChange} placeholder="Tiêu đề" className="w-full p-2 border rounded" required />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" className="w-full p-2 border rounded" required />
            <input name="brand" value={form.brand} onChange={handleChange} placeholder="Thương hiệu" className="w-full p-2 border rounded" required />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Giá (VND)" className="w-full p-2 border rounded" type="number" required />

            <select name="categoryId" value={form.categoryId} onChange={handleChange} className="w-full p-2 border rounded">
                <option value={1}>Xe hơi điện</option>
                <option value={2}>Xe máy điện</option>
                <option value={3}>Pin xe điện</option>
            </select>

            {/* 👇 Trường kỹ thuật riêng */}
            {renderCategoryFields()}

            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {loading ? 'Đang đăng...' : 'Đăng bài'}
            </button>
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </form>
    );
}
