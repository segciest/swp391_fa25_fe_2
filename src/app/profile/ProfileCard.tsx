"use client";

import "./profile.scss";

export default function ProfileCard({ user }: { user: any }) {
    return (
        <div className="profile-card">
            <h2>Hồ sơ cá nhân</h2>

            <div className="profile-info">
                <div><strong>ID người dùng:</strong> {user.userID}</div>
                <div><strong>Tên người dùng:</strong> {user.userName}</div>
                <div><strong>Email:</strong> {user.userEmail}</div>
                <div><strong>Ngày sinh:</strong> {user.dob}</div>
                <div><strong>Số điện thoại:</strong> {user.phone}</div>
                <div><strong>Vai trò:</strong> {user.role?.roleName}</div>
                <div><strong>Gói đăng ký:</strong> {user.subid?.subName}</div>
                <div><strong>Chi tiết gói:</strong> {user.subid?.subDetails}</div>
                <div><strong>Giá gói:</strong> {user.subid?.subPrice} USD</div>
                <div><strong>Thời hạn:</strong> {user.subid?.duration} ngày</div>
                <div><strong>Trạng thái gói:</strong> {user.subid?.status}</div>
                <div><strong>Trạng thái người dùng:</strong> {user.userStatus}</div>
            </div>
        </div>
    );
}
