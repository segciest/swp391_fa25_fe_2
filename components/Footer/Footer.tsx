// src/components/Footer/Footer.tsx

import './Footer.css'; 

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
                        
                        {/* Đã thêm logo vào đây */}
                        <div className="footer-logo-container">
                            {/* * ⚡ LƯU Ý QUAN TRỌNG: 
                              * Thay đổi 'logo.png' thành đường dẫn chính xác 
                              * đến file logo của bạn (ví dụ: /images/logo.svg)
                            */}
                            <img 
                                src="/image/logo.jpg" 
                                alt="EV-Shop Logo" 
                                className="footer-logo-image" 
                                width={80}
                                height={80}
                            />
                            <p className="footer-logo-text">EV-Shop</p>
                        </div>
                        
                        <p>Nền tảng hàng đầu tin mua bán xe điện và pin đã qua sử dụng tại Việt Nam.</p>
                    
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
                    &copy; 2025 EV-Shop by Team 8.
                </div>
            </div>
        </footer>
    )
}