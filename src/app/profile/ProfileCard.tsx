"use client";

import { useState } from "react";
import "./profile.scss";

export default function ProfileCard({ user, ratings, ratingsLoading }: { user: any; ratings: any[]; ratingsLoading: boolean }) {
    const [activeTab, setActiveTab] = useState<"info" | "posts" | "sold" | "ratings">("info");
    const [isEditMode, setIsEditMode] = useState(false);
    const [editData, setEditData] = useState({
        userName: user.userName || "",
        userEmail: user.userEmail || "",
        dob: user.dob || "",
        phone: user.phone || "",
    });

    const safeRatings = ratings || [];
    const avgRating = safeRatings.length > 0 
        ? (safeRatings.reduce((sum, r) => sum + (r.rating || 0), 0) / safeRatings.length).toFixed(1)
        : 0;

    const ratingCounts = {
        5: safeRatings.filter(r => r.rating === 5).length,
        4: safeRatings.filter(r => r.rating === 4).length,
        3: safeRatings.filter(r => r.rating === 3).length,
        2: safeRatings.filter(r => r.rating === 2).length,
        1: safeRatings.filter(r => r.rating === 1).length,
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <div className="profile-wrapper">
            {/* Header Section */}
            <div className="profile-header-section">
                <div className="header-content">
                    <div className="avatar-section">
                        <div className="avatar-large">{getInitials(user.userName)}</div>
                    </div>
                    <div className="user-details">
                        <h1 className="user-name">{user.userName}</h1>
                        <div className="user-meta-info">
                            <span className="meta-badge">📅 Tham gia từ tháng 9/2024</span>
                            <span className="meta-badge">⭐ {avgRating}/5 ({safeRatings.length} đánh giá)</span>
                            <span className="meta-badge verified">✓ Tài khoản đã xác thực</span>
                        </div>
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn-action btn-primary">✏️ Chỉnh sửa hồ sơ</button>
                    <button className="btn-action btn-secondary">⚙️ Cài đặt</button>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="tabs-navigation">
                <button 
                    className={`tab-item ${activeTab === "info" ? "active" : ""}`}
                    onClick={() => setActiveTab("info")}
                >
                    👤 Thông tin cá nhân
                </button>
                <button 
                    className={`tab-item ${activeTab === "posts" ? "active" : ""}`}
                    onClick={() => setActiveTab("posts")}
                >
                    📝 Bài đăng đã đăng <span className="tab-badge">3</span>
                </button>
                <button 
                    className={`tab-item ${activeTab === "sold" ? "active" : ""}`}
                    onClick={() => setActiveTab("sold")}
                >
                    ✅ Đã bán <span className="tab-badge">2</span>
                </button>
                <button 
                    className={`tab-item ${activeTab === "ratings" ? "active" : ""}`}
                    onClick={() => setActiveTab("ratings")}
                >
                    ⭐ Đánh giá khách hàng <span className="tab-badge">{safeRatings.length}</span>
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content-wrapper">
                {/* Info Tab */}
                {activeTab === "info" && (
                    <div className="tab-pane">
                        <div className="content-layout">
                            <div className="content-left">
                                {/* Personal Info Section */}
                                <div className="info-section">
                                    <h3 className="section-title">👤 Thông tin cá nhân</h3>
                                    <div className="info-fields">
                                        <div className="info-field">
                                            <span className="field-label">ID người dùng:</span>
                                            <span className="field-value">{user.userID}</span>
                                        </div>
                                        <div className="info-field">
                                            <span className="field-label">Tên người dùng:</span>
                                            <span className="field-value">{user.userName}</span>
                                        </div>
                                        <div className="info-field">
                                            <span className="field-label">Email:</span>
                                            <span className="field-value">{user.userEmail}</span>
                                        </div>
                                        <div className="info-field">
                                            <span className="field-label">Ngày sinh:</span>
                                            <span className="field-value">{user.dob}</span>
                                        </div>
                                        <div className="info-field">
                                            <span className="field-label">Số điện thoại:</span>
                                            <span className="field-value">{user.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Info Section */}
                                <div className="info-section">
                                    <h3 className="section-title">👑 Thông tin tài khoản</h3>
                                    <div className="info-fields">
                                        <div className="info-field">
                                            <span className="field-label">Vai trò:</span>
                                            <span className="field-value">{user.role?.roleName || "USER"}</span>
                                        </div>
                                        <div className="info-field">
                                            <span className="field-label">Gói đăng ký:</span>
                                            <span className="field-value">{user.subid?.subName || "Free"}</span>
                                        </div>
                                        <div className="info-field">
                                            <span className="field-label">Chi tiết gói:</span>
                                            <span className="field-value">{user.subid?.subDetails || "N/A"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="content-right">
                                {/* Stats Box */}
                                <div className="stats-section">
                                    <h3 className="section-title">🎯 Thống kê hoạt động</h3>
                                    <div className="stats-cards">
                                        <div className="stat-card">
                                            <span className="stat-value">3</span>
                                            <span className="stat-name">Bài đăng</span>
                                        </div>
                                        <div className="stat-card">
                                            <span className="stat-value">2</span>
                                            <span className="stat-name">Đã bán</span>
                                        </div>
                                        <div className="stat-card">
                                            <span className="stat-value">490</span>
                                            <span className="stat-name">Lượt xem</span>
                                        </div>
                                        <div className="stat-card">
                                            <span className="stat-value">{avgRating}</span>
                                            <span className="stat-name">Đánh giá</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Box */}
                                <div className="status-section">
                                    <h3 className="section-title">📊 Trạng thái</h3>
                                    <div className="status-items">
                                        <div className="status-item">
                                            <span className="status-label">Trạng thái gói:</span>
                                            <span className="status-badge active">{user.subid?.status || "ACTIVE"}</span>
                                        </div>
                                        <div className="status-item">
                                            <span className="status-label">Trạng thái người dùng:</span>
                                            <span className="status-badge active">{user.userStatus || "ACTIVE"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Ratings Tab */}
                {activeTab === "ratings" && (
                    <div className="tab-pane">
                        <div className="ratings-section">
                            <div className="rating-stats">
                                <div className="rating-summary">
                                    <div className="summary-score">{avgRating}</div>
                                    <div className="summary-stars">{"⭐".repeat(Math.floor(avgRating as any))}</div>
                                    <div className="summary-text">({safeRatings.length} đánh giá) · 100% khách hàng hài lòng</div>
                                </div>

                                <div className="rating-bars">
                                    {[5, 4, 3, 2, 1].map(stars => (
                                        <div key={stars} className="rating-bar-row">
                                            <span className="bar-label">{stars} ⭐</span>
                                            <div className="bar-background">
                                                <div 
                                                    className="bar-fill" 
                                                    style={{
                                                        width: safeRatings.length > 0 
                                                            ? `${(ratingCounts[stars as keyof typeof ratingCounts] / safeRatings.length) * 100}%` 
                                                            : 0
                                                    }}
                                                />
                                            </div>
                                            <span className="bar-count">{ratingCounts[stars as keyof typeof ratingCounts]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {ratingsLoading ? (
                                <div className="loading-state">Đang tải đánh giá...</div>
                            ) : safeRatings.length > 0 ? (
                                <div className="ratings-list">
                                    {safeRatings.map((rating, idx) => (
                                        <div key={idx} className="rating-card">
                                            <div className="reviewer-header">
                                                <div className="reviewer-avatar">
                                                    {rating.reviewerName?.charAt(0).toUpperCase() || "?"}
                                                </div>
                                                <div className="reviewer-info">
                                                    <div className="reviewer-name">{rating.reviewerName}</div>
                                                    <div className="reviewer-badges">
                                                        <span className="badge-verified">✓ Đã xác minh</span>
                                                        <span className="review-date">{rating.createdAt && new Date(rating.createdAt).toLocaleDateString("vi-VN")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review-content">
                                                <div className="review-stars">{"⭐".repeat(rating.rating)}</div>
                                                <div className="review-product">cho sản phẩm: <strong>{rating.productName}</strong></div>
                                                <p className="review-text">{rating.comment}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-ratings">Chưa có đánh giá nào</div>
                            )}
                        </div>
                    </div>
                )}

                {/* Posts & Sold Tabs */}
                {(activeTab === "posts" || activeTab === "sold") && (
                    <div className="tab-pane">
                        <div className="empty-state">
                            <p>Phần này sẽ được cập nhật</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}