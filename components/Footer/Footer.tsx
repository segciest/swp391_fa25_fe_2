import 'flowbite';
export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 text-gray-200">
            <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Cột 1: Logo & Slogan */}
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex items-center gap-2">
                            <img src="/image/logo.jpg" alt="EV-Shop Logo" className="h-10 w-10 rounded-lg shadow" />
                            <span className="text-2xl font-bold text-white">EV-Shop</span>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs">Nền tảng mua bán xe điện & pin xe uy tín hàng đầu Việt Nam.</p>
                    </div>

                    {/* Cột 2: Thông tin liên hệ */}
                    <div>
                        <h4 className="font-semibold text-lg mb-2 text-white">Liên hệ</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                            <li>Hotline: <a href="tel:0123456789" className="text-blue-400 hover:underline">0123 456 789</a></li>
                            <li>Email: <a href="mailto:support@evshop.vn" className="text-blue-400 hover:underline">support@evshop.vn</a></li>
                            <li>Địa chỉ: 123 Đường EV, Quận 1, TP.HCM</li>
                        </ul>
                    </div>

                    {/* Cột 3: Chính sách */}
                    <div>
                        <h4 className="font-semibold text-lg mb-2 text-white">Chính sách</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                            <li><a href="#" className="hover:underline">Chính sách bảo mật</a></li>
                            <li><a href="#" className="hover:underline">Điều khoản sử dụng</a></li>
                            <li><a href="#" className="hover:underline">Hỗ trợ khách hàng</a></li>
                        </ul>
                    </div>

                    {/* Cột 4: Đăng ký nhận tin */}
                    <div>
                        <h4 className="font-semibold text-lg mb-2 text-white">Nhận ưu đãi mới</h4>
                        <form className="mt-2">
                            <div className="relative max-w-lg">
                                <label className="sr-only" htmlFor="email"> Email </label>
                                <input
                                    className="w-full rounded-full border-none bg-gray-800 p-4 pe-32 text-sm font-medium text-white placeholder-gray-400"
                                    id="email"
                                    type="email"
                                    placeholder="abc@gmail.com"
                                />
                                <button
                                    className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 cursor-pointer"
                                >
                                    Đăng ký
                                </button>
                            </div>
                        </form>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="text-gray-400 hover:text-blue-500"><i className="fab fa-facebook fa-lg"></i></a>
                            <a href="#" className="text-gray-400 hover:text-blue-400"><i className="fab fa-twitter fa-lg"></i></a>
                            <a href="#" className="text-gray-400 hover:text-pink-500"><i className="fab fa-instagram fa-lg"></i></a>
                            <a href="#" className="text-gray-400 hover:text-red-500"><i className="fab fa-youtube fa-lg"></i></a>
                        </div>
                    </div>
                </div>
                <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} EV-Shop. Đã đăng ký bản quyền. Thiết kế bởi EV-Shop Team.
                </div>
            </div>
        </footer>
    )
}