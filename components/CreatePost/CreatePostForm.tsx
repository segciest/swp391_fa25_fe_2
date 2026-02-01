'use client';
import './CreatePostForm.css';
import { useState } from 'react';

export default function CreatePostForm({ onSuccess }: { onSuccess: () => void }) {
    interface FormData {
        title: string;
        description: string;
        brand: string;
        price: number | string;
        categoryId: number;
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

    const [images, setImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const maxFiles = 5;
        
        if (images.length + files.length > maxFiles) {
            setErrorMessage(`Tối đa ${maxFiles} ảnh`);
            return;
        }

        const newImages = [...images, ...files];
        setImages(newImages);

        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls([...previewUrls, ...newPreviewUrls]);
        setErrorMessage(null);
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
        URL.revokeObjectURL(previewUrls[index]);
        setPreviewUrls(previewUrls.filter((_, i) => i !== index));
    };

    const categories = [
        { id: 1, name: 'Xe hơi điện', icon: '🚗' },
        { id: 2, name: 'Xe máy điện', icon: '🏍️' },
        { id: 3, name: 'Pin xe điện', icon: '🔋' },
    ];

    const renderCategoryFields = () => {
        switch (form.categoryId) {
            case 1:
                return (
                    <>
                        <div className="form-grid-2">
                            <input name="seats" value={form.seats || ''} onChange={handleChange} placeholder="Số chỗ" type="number" className="form-input" />
                            <input name="battery" value={form.battery || ''} onChange={handleChange} placeholder="Dung lượng pin" className="form-input" />
                        </div>
                        <input name="range" value={form.range || ''} onChange={handleChange} placeholder="Tầm hoạt động (km)" className="form-input" />
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="form-grid-2">
                            <input name="speed" value={form.speed || ''} onChange={handleChange} placeholder="Tốc độ tối đa (km/h)" className="form-input" />
                            <input name="weight" value={form.weight || ''} onChange={handleChange} placeholder="Trọng lượng (kg)" className="form-input" />
                        </div>
                        <input name="battery" value={form.battery || ''} onChange={handleChange} placeholder="Loại pin" className="form-input" />
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="form-grid-2">
                            <input name="capacity" value={form.capacity || ''} onChange={handleChange} placeholder="Dung lượng (kWh)" className="form-input" />
                            <input name="cycles" value={form.cycles || ''} onChange={handleChange} placeholder="Số lần sạc" type="number" className="form-input" />
                        </div>
                        <input name="type" value={form.type || ''} onChange={handleChange} placeholder="Loại pin (LiFePO4, Li-ion...)" className="form-input" />
                    </>
                );
            default:
                return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        try {
            const storedRaw = localStorage.getItem('userData');
            if (!storedRaw) throw new Error('Chưa đăng nhập');
            const stored = JSON.parse(storedRaw) as { token?: string; userId?: string };
            const token = stored.token;
            const userId = stored.userId;
            if (!token || !userId) throw new Error('Thông tin xác thực không hợp lệ');

            try {
                const parts = token.split('.');
                if (parts.length === 3) {
                    const payload = JSON.parse(atob(parts[1]));
                    const exp = payload.exp;
                    if (exp && Date.now() / 1000 > exp) {
                        localStorage.removeItem('userData');
                        localStorage.removeItem('token');
                        setErrorMessage('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                        setLoading(false);
                        setTimeout(() => { window.location.href = '/login-register'; }, 900);
                        return;
                    }
                }
            } catch (e) {
                console.warn('Unable to decode token on client', e);
            }

            const body = {
                seller: { userID: userId },
                category: { categoryId: form.categoryId },
                title: form.title,
                description: form.description,
                brand: form.brand,
                price: Number(form.price),
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
                let text: string | null = null;
                try {
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
                throw new Error(text || `Đăng bài thất bại (status ${res.status})`);
            }

            setSuccessMessage('✅ Đăng bài thành công!');
            setTimeout(() => onSuccess(), 1500);
        } catch (error) {
            if (error instanceof Error) setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-post-form">
            {/* Header */}
            <div className="form-header">
                <h2>Tạo Bài Viết Mới</h2>
                <p>Chia sẻ sản phẩm của bạn với cộng đồng</p>
            </div>

            {/* Thông tin cơ bản */}
            <div className="form-section">
                <h3 className="section-title">📋 Thông Tin Cơ Bản</h3>
                <input 
                    name="title" 
                    value={form.title} 
                    onChange={handleChange} 
                    placeholder="Tiêu đề (vd: Honda SH Mode 125cc zin chất)" 
                    className="form-input" 
                    required 
                />
                <textarea 
                    name="description" 
                    value={form.description} 
                    onChange={handleChange} 
                    placeholder="Mô tả chi tiết về sản phẩm..." 
                    className="form-input form-textarea" 
                    rows={4}
                    required 
                />
            </div>

            {/* Thông tin sản phẩm */}
            <div className="form-section">
                <h3 className="section-title">🏷️ Thông Tin Sản Phẩm</h3>
                <div className="form-grid-2">
                    <input 
                        name="brand" 
                        value={form.brand} 
                        onChange={handleChange} 
                        placeholder="Thương hiệu (vd: Honda, Yamaha)" 
                        className="form-input" 
                        required 
                    />
                    <input 
                        name="price" 
                        value={form.price} 
                        onChange={handleChange} 
                        placeholder="Giá (VND)" 
                        className="form-input" 
                        type="number" 
                        required 
                    />
                </div>
            </div>

            {/* Upload ảnh */}
            <div className="form-section">
                <h3 className="section-title">Hình Ảnh Sản Phẩm</h3>
                <label className="image-upload-label">
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleImageSelect}
                        hidden
                    />
                    <span className="image-upload-placeholder">
                        📸 Chọn hình ảnh (tối đa 5 ảnh)
                    </span>
                </label>
                
                {previewUrls.length > 0 && (
                    <div className="image-preview-grid">
                        {previewUrls.map((url, index) => (
                            <div key={index} className="image-preview-item">
                                <img src={url} alt={`Preview ${index}`} />
                                <button 
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="image-remove-btn"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                
                {previewUrls.length === 0 && (
                    <p className="image-no-select">Chưa có ảnh nào được chọn</p>
                )}
            </div>

            {/* Chọn danh mục */}
            <div className="form-section">
                <h3 className="section-title">📦 Danh Mục</h3>
                <div className="category-selector">
                    {categories.map(cat => (
                        <label key={cat.id} className={`category-option ${form.categoryId === cat.id ? 'active' : ''}`}>
                            <input 
                                type="radio" 
                                name="categoryId" 
                                value={cat.id} 
                                checked={form.categoryId === cat.id}
                                onChange={handleChange} 
                                hidden 
                            />
                            <span className="category-icon">{cat.icon}</span>
                            <span className="category-name">{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Thông tin kỹ thuật */}
            {form.categoryId && (
                <div className="form-section">
                    <h3 className="section-title">⚙️ Thông Tin Kỹ Thuật</h3>
                    {renderCategoryFields()}
                </div>
            )}

            {/* Thông báo */}
            {errorMessage && (
                <div className="alert alert-error">
                    <span>❌</span>
                    {errorMessage}
                </div>
            )}
            {successMessage && (
                <div className="alert alert-success">
                    {successMessage}
                </div>
            )}

            {/* Button */}
            <button 
                type="submit" 
                disabled={loading} 
                className="form-button"
            >
                {loading ? (
                    <>
                        <span className="spinner"></span>
                        Đang đăng...
                    </>
                ) : (
                    '✨ Đăng Bài'
                )}
            </button>
        </form>
    );
}