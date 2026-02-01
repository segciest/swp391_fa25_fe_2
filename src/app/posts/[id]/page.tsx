// src/app/posts/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPostById } from '@/lib/api';
import { PostDetail } from '@/types/postDetail';
import './post-detail.css';

function maskPhone(phone?: string) {
  if (!phone) return '';
  if (phone.length <= 6) return phone.replace(/./g, '*');
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

function renderStars(rating: number) {
  return (
    <div className="post-detail__stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < Math.floor(rating) ? 'star-filled' : 'star-empty'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    fetchPostById(id as string)
      .then(setPost)
      .catch((err) => {
        console.error('Error fetching post:', err);
        setError('Không thể tải bài viết');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="post-detail__loading">Đang tải...</div>;
  }

  if (error || !post) {
    return <div className="post-detail__error">{error || 'Không tìm thấy bài viết'}</div>;
  }

  const images: string[] = (post as any).images && (post as any).images.length > 0
    ? (post as any).images.map((im: any) => im.url || im.path || im)
    : [post.image];

  const mainImage = images[mainImageIndex] || post.image;

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({ title: post.title, url });
      } catch (e) {
        // ignore
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Đã sao chép liên kết vào clipboard');
    }
  };

  return (
    <div className="post-detail">
      {/* Breadcrumb */}
      <div className="post-detail__breadcrumb">
        <span>Trang chủ</span>
        <span className="separator">/</span>
        <span>{post.category?.categoryName || 'Pin xe'}</span>
        <span className="separator">/</span>
        <span className="current">{post.title}</span>
      </div>

      <div className="post-detail__container">
        <div className="post-detail__layout">
          {/* Left: Images & Details */}
          <div className="post-detail__left">
            {/* Image Gallery */}
            <div className="post-detail__gallery">
              <div className="post-detail__main-image">
                <img src={mainImage} alt={post.title} />
              </div>

              <div className="post-detail__thumbnails">
                {images.map((src: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setMainImageIndex(idx)}
                    className={`post-detail__thumbnail ${
                      idx === mainImageIndex ? 'active' : ''
                    }`}
                  >
                    <img src={src} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="post-detail__info">
              <h1 className="post-detail__title">{post.title}</h1>

              <div className="post-detail__meta">
                {renderStars(post.rating || 0)}
                <span className="post-detail__rating-count">
                  ({post.ratingCount || 0})
                </span>
                <span className="post-detail__status">• {post.status || 'Còn hàng'}</span>
              </div>

              <div className="post-detail__price">
                {post.price?.toLocaleString('vi-VN')} ₫
              </div>

              {/* Specs */}
              {(post as any).specs && (post as any).specs.length > 0 && (
                <div className="post-detail__specs">
                  <h3 className="post-detail__section-title">Thông số kỹ thuật</h3>
                  <div className="post-detail__specs-grid">
                    {(post as any).specs.map((spec: any, idx: number) => (
                      <div key={idx} className="post-detail__spec-item">
                        <span className="post-detail__spec-label">{spec.label}</span>
                        <span className="post-detail__spec-value">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {(post as any).features && (post as any).features.length > 0 && (
                <div className="post-detail__features">
                  <h3 className="post-detail__section-title">Tính năng nổi bật</h3>
                  <ul className="post-detail__feature-list">
                    {(post as any).features.map((feature: string, idx: number) => (
                      <li key={idx} className="post-detail__feature-item">
                        <span className="bullet">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warranty */}
              {(post as any).warranty && (post as any).warranty.length > 0 && (
                <div className="post-detail__warranty">
                  <h3 className="post-detail__section-title">Chính sách bảo hành</h3>
                  <ul className="post-detail__warranty-list">
                    {(post as any).warranty.map((item: string, idx: number) => (
                      <li key={idx} className="post-detail__warranty-item">
                        <span className="bullet">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              {post.content || post.description ? (
                <div className="post-detail__description">
                  <h3 className="post-detail__section-title">Mô tả sản phẩm</h3>
                  <div className="post-detail__description-content">
                    {post.content ? (
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    ) : (
                      <p>{post.description}</p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Right: Contact Panel */}
          <div className="post-detail__right">
            {/* Contact Card */}
            <div className="post-detail__contact-card">
              <div className="post-detail__price-section">
                <span className="post-detail__price-label">Giá</span>
                <div className="post-detail__price-value">
                  {post.price?.toLocaleString('vi-VN')} ₫
                </div>
              </div>

              <div className="post-detail__contact-buttons">
                <button className="post-detail__btn post-detail__btn--chat">
                  <span className="post-detail__icon">💬</span>
                  <span>Chat ngay</span>
                </button>
                <a
                  href={`tel:${post.contact}`}
                  className="post-detail__btn post-detail__btn--call"
                >
                  <span className="post-detail__icon">📞</span>
                  <span>Gọi điện</span>
                </a>
              </div>

              <div className="post-detail__action-buttons">
                <button
                  onClick={() => setSaved(!saved)}
                  className={`post-detail__btn post-detail__btn--favorite ${
                    saved ? 'active' : ''
                  }`}
                >
                  <span className="post-detail__icon">{saved ? '❤️' : '🤍'}</span>
                  <span>Yêu thích</span>
                </button>
                <button
                  onClick={handleShare}
                  className="post-detail__btn post-detail__btn--share"
                >
                  <span className="post-detail__icon">📤</span>
                  <span>Chia sẻ</span>
                </button>
              </div>
            </div>

            {/* Seller Card */}
            <div className="post-detail__seller-card">
              <div className="post-detail__seller-header">
                <img
                  src={
                    (post.seller as any)?.avatar ||
                    (post.seller as any)?.avatarUrl ||
                    '/image/avatar1.png'
                  }
                  alt={post.seller?.userName}
                  className="post-detail__seller-avatar"
                />
                <div className="post-detail__seller-info">
                  <div className="post-detail__seller-name">
                    {post.seller?.userName || 'Người bán'}
                  </div>
                  <div className="post-detail__seller-status">
                    ● Hoạt động gần đây
                  </div>
                  <div className="post-detail__seller-time">
                    {timeAgo(post.createdAt)}
                  </div>
                </div>
              </div>

              <div className="post-detail__seller-details">
                <div className="post-detail__detail-row">
                  <span className="post-detail__detail-label">Đánh giá:</span>
                  {renderStars(post.rating || 0)}
                </div>
                <div className="post-detail__detail-row">
                  <span className="post-detail__detail-label">Số điện thoại:</span>
                  <span className="post-detail__phone-badge">
                    Hiển số {maskPhone(post.contact)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}