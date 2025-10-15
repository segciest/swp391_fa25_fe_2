// src/components/Footer/Footer.tsx

import './Footer.css'; // Quan trọng: Import file CSS mới

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Phần kêu gọi đăng ký */}
                <div className="footer-subscribe-section">
                    <strong className="footer-subscribe-title">
                        LIÊN HỆ CHÚNG TÔI ĐỂ CÓ NHỮNG ƯU ĐÃI MỚI NHẤT
                    </strong>
                    <form className="footer-subscribe-form">
                        <label className="sr-only" htmlFor="email"> Email </label>
                        <input
                            className="footer-subscribe-input"
                            id="email"
                            type="email"
                            placeholder="abc@gmail.com"
                        />
                        <button className="footer-subscribe-button">
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Phần nội dung chính của Footer */}
                <div className="footer-main">
                    {/* Cột 1: Logo và Social */}
                    <div className="footer-column">
                        <p className="footer-logo-text">EV-Shop</p>
                        <p>Nền tảng hàng đầu tin mua bán xe điện và pin đã qua sử dụng tại Việt Nam.</p>
                        <div className="footer-social-links">
                            <a href="#" aria-label="Facebook"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg></a>
                            <a href="#" aria-label="Instagram"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg></a>
                            <a href="#" aria-label="Twitter"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.215 3.793 4.65-1.002.274-2.053.293-3.085.118.63 1.953 2.448 3.377 4.604 3.417-2.093 1.641-4.732 2.53-7.588 2.226.963.623 2.11.977 3.337.977 4.549 0 7.82-3.967 7.42-8.351 1.018-.73 1.892-1.643 2.593-2.688z"/></svg></a>
                        </div>
                    </div>

                    {/* Cột 2: Danh mục */}
                    <div className="footer-column">
                        <p className="footer-title">Danh mục</p>
                        <ul>
                            <li><a href="/xe-dien">Xe điện</a></li>
                            <li><a href="/pin-xe-dien">Pin xe điện</a></li>
                            <li><a href="#">Phụ kiện</a></li>
                            <li><a href="#">Thương hiệu</a></li>
                        </ul>
                    </div>

                    {/* Cột 3: Hỗ trợ */}
                    <div className="footer-column">
                        <p className="footer-title">Hỗ trợ</p>
                        <ul>
                            <li><a href="#">Trung tâm trợ giúp</a></li>
                            <li><a href="#">Chính sách bảo mật</a></li>
                            <li><a href="#">Quy định sử dụng</a></li>
                            <li><a href="#">Câu hỏi thường gặp</a></li>
                        </ul>
                    </div>

                    {/* Cột 4: Liên hệ */}
                    <div className="footer-column">
                        <p className="footer-title">Liên hệ</p>
                        <ul>
                            <li>Email: support@evshop.com</li>
                            <li>Hotline: 1900 1234</li>
                            <li>Địa chỉ: 123 Đường ABC, TP.HCM</li>
                        </ul>
                    </div>
                </div>

                {/* Phần bản quyền */}
                <div className="footer-copyright">
                    &copy; 2025 EV-Shop. Đã đăng ký bản quyền.
                </div>
            </div>
        </footer>
    )
}