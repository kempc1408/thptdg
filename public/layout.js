/* ==========================================================================
   LAYOUT DÙNG CHUNG: HEADER, MENU TOÀN VAI TRÒ, AI CHATBOT VÀ FOOTER (THPT DẦU GIÂY)
   ========================================================================== */

// 1. Tự động chèn Topbar, Header và Menu Dynamic vào đầu trang
function injectHeaderAndNav() {
    const headerHtml = `
    <!-- TOPBAR CHUẨN -->
    <div class="bg-slate-900 text-slate-300 text-[11px] md:text-xs py-1.5 px-3 md:px-8 flex justify-between items-center border-b border-slate-800 relative z-50">
        <div class="flex items-center space-x-4">
            <span class="truncate"><i class="fa-solid fa-phone text-yellow-500 mr-1.5"></i>02513762810</span>
            <span class="hidden md:inline"><i class="fa-solid fa-envelope text-yellow-500 mr-1.5"></i>c3.daugiay@dongnai.edu.vn</span>
        </div>
        <div class="flex items-center space-x-3">
            <span class="text-yellow-400 font-semibold uppercase tracking-wider hidden lg:inline">Cổng Thông Tin Học Tập & Nề Nếp</span>
            <button id="theme-toggle" class="bg-slate-800 hover:bg-slate-700 text-yellow-400 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[11px] font-bold flex items-center gap-1 border border-slate-700">
                <i id="theme-toggle-dark-icon" class="fa-solid fa-moon"></i>
                <i id="theme-toggle-light-icon" class="fa-solid fa-sun hidden"></i>
                <span id="theme-text" class="hidden sm:inline">Giao diện</span>
            </button>
        </div>
    </div>

    <!-- HEADER CHUẨN -->
    <header class="bg-white/95 backdrop-blur dark:bg-slate-800 border-b dark:border-slate-700 shadow-sm sticky top-0 z-50">
        <div class="container mx-auto px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
            <a href="/index" class="flex items-center space-x-2 md:space-x-3">
                <img src="/IMAGE/logothptdg.jpg" onerror="this.onerror=null; this.src='/image/logothptdg.jpg';" alt="Logo THPT Dầu Giây" class="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full border-2 border-red-800 shadow">
                <div>
                    <h1 class="text-base sm:text-xl md:text-2xl font-black text-hust-red dark:text-red-400 tracking-tight uppercase leading-tight">THPT Dầu Giây</h1>
                    <p class="text-[9px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium tracking-widest uppercase">Dau Giay High School Portal</p>
                </div>
            </a>
            
            <div id="user-area" class="flex items-center gap-2"></div>
        </div>

        <!-- NAVBAR -->
        <nav class="bg-hust-red text-white shadow-inner relative z-50">
            <div id="main-nav-container" class="container mx-auto px-2 flex flex-wrap space-x-1 text-xs md:text-sm font-bold uppercase relative overflow-visible">
            </div>
        </nav>
    </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHtml);
}

// 2. Tự động chèn Nút Chatbot AI và Footer vào cuối trang
function injectFooterAndAI() {
    const footerAndAIHtml = `
    <!-- WIDGET TRỢ LÝ AI CHATBOT -->
    <div id="ai-widget-btn" class="fixed bottom-6 right-6 z-50">
        <button onclick="toggleAIChat()" class="relative group bg-hust-red hover:bg-red-700 text-yellow-400 p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center border-2 border-yellow-400">
            <i class="fa-solid fa-robot text-2xl"></i>
            <span class="absolute right-16 top-1/2 -translate-y-1/2 hidden group-hover:block bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap shadow-md">
                Hỏi Trợ Lý AI Dầu Giây ✨
            </span>
            <span class="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </button>
    </div>

    <div id="ai-chat-box" class="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[380px] h-[520px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl hidden flex-col overflow-hidden transition-all duration-300">
        <div class="bg-hust-red text-white p-4 flex justify-between items-center border-b border-red-800">
            <div class="flex items-center space-x-2.5">
                <div class="w-9 h-9 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center font-black text-lg shadow">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                <div>
                    <h4 class="font-bold text-sm leading-tight text-yellow-300 uppercase">Trợ Lý AI Dầu Giây</h4>
                    <p class="text-[10px] text-slate-200">Sẵn sàng giải đáp 24/7</p>
                </div>
            </div>
            <button onclick="toggleAIChat()" class="text-white/80 hover:text-white text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-800 transition">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div id="ai-messages" class="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50 dark:bg-slate-900/50">
            <div class="flex items-start gap-2">
                <div class="w-7 h-7 rounded-full bg-hust-red text-yellow-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div class="bg-white dark:bg-slate-800 border dark:border-slate-700 text-slate-800 dark:text-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] leading-relaxed">
                    Xin chào! Tôi là Trợ Lý AI của Trường THPT Dầu Giây. Bạn cần tôi hỗ trợ thông tin gì về học tập, lịch học hay nề nếp nhà trường hôm nay? ✨
                </div>
            </div>
        </div>
        <div class="p-3 bg-white dark:bg-slate-800 border-t dark:border-slate-700 flex items-center gap-2">
            <input type="text" id="ai-input" placeholder="Nhập câu hỏi của bạn..." onkeypress="if(event.key === 'Enter') sendAIMessage()" class="flex-1 border dark:border-slate-600 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-800">
            <button onclick="sendAIMessage()" class="bg-hust-red hover:bg-yellow-400 hover:text-slate-900 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow transition flex items-center justify-center">
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </div>
    </div>

    <!-- FOOTER CHUẨN 4 CỘT -->
    <footer class="bg-slate-900 text-slate-400 text-xs py-6 md:py-8 border-t border-slate-800 mt-auto">
        <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div class="space-y-2 md:space-y-3">
                <div class="flex items-center space-x-3">
                    <img src="/IMAGE/logothptdg.jpg" onerror="this.onerror=null; this.src='/image/logothptdg.jpg';" class="w-8 h-8 rounded-full border">
                    <span class="font-bold text-white text-xs md:text-sm uppercase">THPT Dầu Giây</span>
                </div>
                <p class="text-[11px] md:text-xs">Địa chỉ: Đường TL762, Khối 2, TT. Dầu Giây, H. Thống Nhất, T. Đồng Nai.</p>
            </div>
            <div class="space-y-1.5">
                <h4 class="font-bold text-white uppercase text-xs md:text-sm">Liên Kết Nhanh</h4>
                <ul class="space-y-1 text-[11px] md:text-xs">
                    <li><a href="/index" class="hover:text-yellow-400">Trang chủ</a></li>
                    <li><a href="/chitiet" class="hover:text-yellow-400">Thông tin công khai</a></li>
                    <li><a href="/thidua" class="hover:text-yellow-400">Bảng thi đua</a></li>
                    <li><a href="/login" class="hover:text-yellow-400">Đăng nhập hệ thống</a></li>
                </ul>
            </div>
            <div class="space-y-1.5">
                <h4 class="font-bold text-white uppercase text-xs md:text-sm">Theo Dõi Chúng Tôi</h4>
                <div class="flex items-center space-x-3 pt-1">
                    <a href="https://facebook.com" target="_blank" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition" title="Facebook"><i class="fa-brands fa-facebook-f text-sm"></i></a>
                    <a href="https://instagram.com" target="_blank" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-pink-600 text-white flex items-center justify-center transition" title="Instagram"><i class="fa-brands fa-instagram text-sm"></i></a>
                    <a href="https://tiktok.com" target="_blank" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-black text-white flex items-center justify-center transition border border-slate-700" title="TikTok"><i class="fa-brands fa-tiktok text-sm"></i></a>
                    <a href="https://youtube.com" target="_blank" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center transition" title="YouTube"><i class="fa-brands fa-youtube text-sm"></i></a>
                </div>
            </div>
            <div class="space-y-1.5">
                <h4 class="font-bold text-white uppercase text-xs md:text-sm">Bản Quyền</h4>
                <p class="text-[11px] md:text-xs">© 2026 Trường THPT Dầu Giây. Tất cả quyền được bảo lưu.</p>
            </div>
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerAndAIHtml);
}

// ==========================================================================
// 3. LOGIC XỬ LÝ MENU DYNAMIC ĐẦY ĐỦ CHO TỪNG VAI TRÒ (CHỦ NHIỆM, BGH, HỌC SINH...)
// ==========================================================================
function isDisciplineStaff() {
    const userRole = (localStorage.getItem('user_role') || '').toLowerCase();
    return ['admin', 'hieutruong', 'bgh', 'phohieutruong', 'giamthi', 'quansinh', 'kiemsoat', 'doantruong', 'doan'].includes(userRole);
}

function renderDynamicNavMenu() {
    const navContainer = document.getElementById('main-nav-container');
    if (!navContainer) return;

    const userRole = (localStorage.getItem('user_role') || 'khach').toLowerCase();

    // Sổ Báo Cáo có dropdown hover (Dành cho Giám thị, Quản sinh, Kiểm soát, BGH)
    let soBaoCaoMenuHtml = '';
    if (isDisciplineStaff()) {
        soBaoCaoMenuHtml = `
            <div class="relative group">
                <a href="/sobaocao" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                    <i class="fa-solid fa-clipboard-list mr-1.5"></i>Sổ Báo Cáo <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                </a>
                <div class="dropdown-menu absolute left-0 top-full w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                    <a href="/giaovien/saodo" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">
                        <i class="fa-solid fa-star mr-2 text-yellow-500"></i>Quản lý sao đỏ
                    </a>
                    <a href="/theodoiso" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">
                        <i class="fa-solid fa-book-open-reader mr-2 text-blue-500"></i>Theo dõi sổ
                    </a>
                    <a href="/tongket" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">
                        <i class="fa-solid fa-chart-line mr-2 text-emerald-500"></i>Tổng kết cuối tuần
                    </a>
                </div>
            </div>
        `;
    }

    const tuVanMenuHtml = `
        <div class="relative group">
            <a href="/tuvan" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                <i class="fa-solid fa-comments mr-1.5"></i>Tư Vấn <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
            </a>
            <div class="dropdown-menu absolute left-0 top-full w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                <a href="/tuvan?tab=tamly" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Tâm Lý</a>
                <a href="/tuvan?tab=nganhnghe" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Ngành Nghề</a>
                <a href="/tuvan?tab=tohop" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Tổ Hợp Môn Học</a>
            </div>
        </div>
    `;

    const commonMenuHtml = `
        <div class="relative group">
            <a href="/index" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                <i class="fa-solid fa-house mr-1.5"></i>Trang Chủ <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
            </a>
            <div class="dropdown-menu absolute left-0 top-full w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                <a href="/index" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Tổng quan</a>
                <a href="/chitiet" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Thông tin công khai</a>
            </div>
        </div>

        <div class="relative group">
            <a href="/tintuc" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                <i class="fa-solid fa-newspaper mr-1.5"></i>Tin Tức <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
            </a>
            <div class="dropdown-menu absolute left-0 top-full w-64 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                <a href="/tintuc?type=thongbao" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Thông báo chung</a>
                <a href="/tintuc?type=doanthe" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Công tác Đảng và Đoàn</a>
                <a href="/tintuc?type=sukien" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Sự kiện sắp ra mắt</a>
                <a href="/clb" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Câu lạc bộ</a>
                <a href="/forum" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Forum học sinh</a>
            </div>
        </div>

        <div class="relative group">
            <a href="/thidua" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                <i class="fa-solid fa-trophy mr-1.5"></i>Thi Đua <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
            </a>
            <div class="dropdown-menu absolute left-0 top-full w-52 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                <a href="/thidua?loai=chon" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">BXH Lớp chọn</a>
                <a href="/thidua?loai=thuong" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">BXH Lớp thường</a>
            </div>
        </div>

        <div class="relative group">
            <a href="/khenthuong" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                <i class="fa-solid fa-award mr-1.5"></i>Khen Thưởng <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
            </a>
            <div class="dropdown-menu absolute left-0 top-full w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                <a href="/khenthuong?loai=vuotkho" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Học sinh vượt khó</a>
                <a href="/khenthuong?loai=hsg" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Học sinh giỏi</a>
                <a href="/khenthuong?loai=giupdo" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Giúp đỡ người khác</a>
            </div>
        </div>

        <div class="relative group">
            <a href="/cuocthi" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                <i class="fa-solid fa-laptop-code mr-1.5"></i>Cuộc Thi <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
            </a>
            <div class="dropdown-menu absolute left-0 top-full w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                <a href="/cuocthi?type=hsg" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Thi HSG</a>
                <a href="/cuocthi?type=stem" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">STEM</a>
                <a href="/cuocthi?type=khkt" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Khoa học kỹ thuật</a>
                <a href="/cuocthi?type=vannghe" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Hát và múa</a>
            </div>
        </div>
    `;

    let roleSpecificMenuHtml = '';

    if (localStorage.getItem('user_role') && userRole !== 'khach') {
        
        // ==========================================
        // 1. BAN GIÁM HIỆU & ADMIN
        // ==========================================
        if (['hieutruong', 'bgh', 'admin', 'phohieutruong'].includes(userRole)) {
            roleSpecificMenuHtml = `
                <div class="relative group">
                    <a href="/khoi" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-layer-group mr-1.5"></i>Khối Lớp <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-52 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/khoi10?khoi=10" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Khối 10</a>
                        <a href="/khoi11?khoi=11" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Khối 11</a>
                        <a href="/khoi12?khoi=12" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Khối 12</a>
                        <a href="/hocsinh" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Học Sinh</a>
                    </div>
                </div>

                <div class="relative group">
                    <a href="/giaovien" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-chalkboard-user mr-1.5"></i>Giáo Viên <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-60 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/bangiamhieu?tab=bgh" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Ban Giám Hiệu</a>
                        <a href="/giaovien/giamthi?tab=giamthi" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Quản Lý Giám Thị (Đoàn)</a>
                        <a href="/giaovien/quanly?tab=quanly" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Quản Lý Giáo Viên</a>
                        <a href="/giaovien/saodo?tab=saodo" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Quản Lý Sao Đỏ</a>
                    </div>
                </div>
            `;
        } 
        // ==========================================
        // 2. GIÁO VIÊN CHỦ NHIỆM (ĐẦY ĐỦ QUẢN LÝ LỚP, BÁO CÁO, BÀI TẬP)
        // ==========================================
        else if (['chunhiem', 'gvcn'].includes(userRole)) {
            roleSpecificMenuHtml = `
                <div class="relative group">
                    <a href="/lophoc" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-users mr-1.5"></i>Lớp <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/hocsinh" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Danh sách học sinh</a>
                        <a href="/lophoc?tab=bancansu" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Ban cán sự</a>
                        <a href="/diemso" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Điểm số</a>
                    </div>
                </div>

                <div class="relative group">
                    <a href="/baocao" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-file-invoice mr-1.5"></i>Báo Cáo <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-52 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/baocao?type=sodaubai" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Sổ đầu bài</a>
                        <a href="/vipham?type=vipham" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Vi phạm</a>
                    </div>
                </div>

                <div class="relative group">
                    <a href="/baitap" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-book-open mr-1.5"></i>Bài Tập <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/baitap?action=giaobai" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Giao bài</a>
                        <a href="/baitap?action=kiemtra" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Bài kiểm tra</a>
                        <a href="/baitap?action=quanly" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Quản lý bài tập</a>
                    </div>
                </div>
            `;
        } 
        // ==========================================
        // 3. GIÁO VIÊN BỘ MÔN
        // ==========================================
        else if (['bomon', 'gvbm', 'teacher'].includes(userRole)) {
            roleSpecificMenuHtml = `
                <div class="relative group">
                    <a href="/lophoc" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-chalkboard mr-1.5"></i>Lớp <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/lophoc?tab=quanly" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Quản lý</a>
                        <a href="/diemso" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Điểm số</a>
                        <a href="/baitap?action=kiemtra" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Bài kiểm tra</a>
                    </div>
                </div>

                <div class="relative group">
                    <a href="/baitap" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-pen-to-square mr-1.5"></i>Bài Tập <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-52 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/baitap?action=giaobai" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Giao bài</a>
                        <a href="/baitap?action=quanly" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Quản lý bài tập</a>
                    </div>
                </div>
            `;
        } 
        // ==========================================
        // 4. HỌC SINH, PHỤ HUYNH, SAO ĐỎ
        // ==========================================
        else if (['hocsinh', 'phuhuynh', 'saodo'].includes(userRole)) {
            roleSpecificMenuHtml = `
                <div class="relative group">
                    <a href="/lophoc" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-graduation-cap mr-1.5"></i>Lớp <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/hocsinh" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Danh sách học sinh</a>
                        <a href="/giaovien" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Danh sách giáo viên</a>
                        <a href="/diemso" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Điểm số</a>
                    </div>
                </div>

                <div class="relative group">
                    <a href="/baocao" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-file-shield mr-1.5"></i>Báo Cáo <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-52 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/vipham?type=vipham" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Vi phạm</a>
                        <a href="/baocao?type=laodong" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Lao động</a>
                        <a href="/baocao?type=khangcao" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Kháng cáo</a>
                    </div>
                </div>

                ${tuVanMenuHtml}
            `;
        } 
        // ==========================================
        // 5. LỚP TRƯỞNG
        // ==========================================
        else if (userRole === 'loptruong') {
            roleSpecificMenuHtml = `
                <div class="relative group">
                    <a href="/lophoc" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-user-tie mr-1.5"></i>Lớp <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/lophoc?tab=quanly" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Quản lý lớp</a>
                        <a href="/diemso" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Điểm số lớp</a>
                        <a href="/giaovien" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Danh sách giáo viên</a>
                    </div>
                </div>

                <div class="relative group">
                    <a href="/baocao" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-bullhorn mr-1.5"></i>Báo Cáo <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-60 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/vipham?type=vipham" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Vi phạm</a>
                        <a href="/tintuc?type=giaovien" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Thông báo của giáo viên</a>
                        <a href="/tintuc?type=doan" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Thông báo đoàn</a>
                    </div>
                </div>

                ${tuVanMenuHtml}
            `;
        } 
        // ==========================================
        // 6. LỚP PHÓ / LỚP PHÓ HỌC TẬP
        // ==========================================
        else if (['loppho', 'lopphohoctap'].includes(userRole)) {
            roleSpecificMenuHtml = `
                <div class="relative group">
                    <a href="/lophoc" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-book-reader mr-1.5"></i>Lớp <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/hocsinh" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Danh sách học sinh</a>
                        <a href="/giaovien" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Danh sách giáo viên</a>
                        <a href="/diemso" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Điểm số chung</a>
                    </div>
                </div>

                <div class="relative group">
                    <a href="/baocao" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-clipboard-check mr-1.5"></i>Báo Cáo <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-52 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/vipham?type=vipham" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Vi phạm</a>
                        <a href="/baocao?type=laodong" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Lao động</a>
                        <a href="/baocao?type=khangcao" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Kháng cáo</a>
                    </div>
                </div>

                <div class="relative group">
                    <a href="/baitap" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-tasks mr-1.5"></i>Bài Tập <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-52 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/baitap?action=quanly" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Quản lý bài</a>
                        <a href="/baitap?action=kiemtra" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Bài kiểm tra</a>
                    </div>
                </div>

                ${tuVanMenuHtml}
            `;
        } 
        // ==========================================
        // 7. BÍ THƯ CHI ĐOÀN LỚP
        // ==========================================
        else if (userRole === 'bithulop') {
            roleSpecificMenuHtml = `
                <div class="relative group">
                    <a href="/lophoc" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-flag mr-1.5"></i>Lớp <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/hocsinh" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Danh sách học sinh</a>
                        <a href="/giaovien" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Danh sách giáo viên</a>
                        <a href="/diemso" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Điểm số</a>
                    </div>
                </div>

                <div class="relative group">
                    <a href="/baocao" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-file-lines mr-1.5"></i>Báo Cáo <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-60 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/vipham?type=vipham" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Vi phạm</a>
                        <a href="/tintuc?type=doan" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Thông báo đoàn</a>
                        <a href="/lichhop" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Lịch họp & hoạt động</a>
                    </div>
                </div>

                ${tuVanMenuHtml}
            `;
        } 
        // ==========================================
        // 8. CÁN BỘ GIÁM THỊ, QUẢN SINH, ĐOÀN TRƯỜNG, KIỂM SOÁT
        // ==========================================
        else if (['giamthi', 'doantruong', 'bithutruong', 'phobithutruong', 'quansinh', 'kiemsoat', 'doan'].includes(userRole)) {
            roleSpecificMenuHtml = `
                <div class="relative group">
                    <a href="/tintuc" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-pen-nib mr-1.5"></i>Bài Viết <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-56 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/tintuc" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Tin tức</a>
                        <a href="/khenthuong" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Khen thưởng học sinh</a>
                        <a href="/clb" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Câu lạc bộ</a>
                    </div>
                </div>

                <div class="relative group">
                    <a href="/giaovien/giamthi" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
                        <i class="fa-solid fa-shield-halved mr-1.5"></i>Kiểm Soát Nề Nếp <i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
                    </a>
                    <div class="dropdown-menu absolute left-0 top-full w-60 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 rounded-b-lg">
                        <a href="/giaovien/saodo" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Phân công Sao Đỏ</a>
                        <a href="/vipham?type=vipham" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition border-b dark:border-slate-700/50">Danh sách vi phạm</a>
                        <a href="/theodoiso" class="block px-4 py-2.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-hust-red dark:hover:text-yellow-400 transition">Theo dõi chấm sổ tuần</a>
                    </div>
                </div>
            `;
        }
    }

    const settingsMenuHtml = `
        <a href="/settings" class="py-2.5 px-3 md:py-3 md:px-4 hover:bg-yellow-400 hover:text-slate-900 transition flex items-center">
            <i class="fa-solid fa-gear mr-1.5"></i>Cài Đặt
        </a>
    `;

    navContainer.innerHTML = commonMenuHtml + soBaoCaoMenuHtml + roleSpecificMenuHtml + settingsMenuHtml;
}

// 4. Xử lý hiển thị thông tin đăng nhập và nút Đăng xuất
function checkUserSession() {
    const userRole = localStorage.getItem('user_role');
    const userName = localStorage.getItem('user_name');
    const userArea = document.getElementById('user-area');

    if (userRole && userName) {
        if (userArea) {
            userArea.innerHTML = `
                <div class="flex items-center gap-2">
                    <div class="text-right hidden sm:block">
                        <p class="text-xs font-bold text-slate-800 dark:text-slate-100">${userName}</p>
                        <span class="text-[9px] font-extrabold uppercase bg-red-100 text-red-800 px-1.5 py-0.5 rounded">${userRole}</span>
                    </div>
                    <button onclick="logout()" class="bg-slate-200 dark:bg-slate-700 hover:bg-red-600 hover:text-white text-xs font-bold px-2.5 py-1.5 rounded transition uppercase" title="Đăng xuất">
                        Đăng xuất
                    </button>
                </div>
            `;
        }
    } else {
        if (userArea) {
            userArea.innerHTML = `
                <a href="/login" class="bg-hust-red hover:bg-yellow-400 hover:text-slate-900 text-white text-xs md:text-sm font-bold px-3 py-1.5 md:px-5 md:py-2.5 rounded shadow transition flex items-center uppercase">
                    ĐĂNG NHẬP
                </a>
            `;
        }
    }
}

function logout() {
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    window.location.href = '/login';
}

// 5. Khởi tạo chế độ Sáng / Tối (Dark mode)
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if(lightIcon) lightIcon.classList.remove('hidden');
        if(darkIcon) darkIcon.classList.add('hidden');
    }

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                if(lightIcon) lightIcon.classList.add('hidden');
                if(darkIcon) darkIcon.classList.remove('hidden');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                if(lightIcon) lightIcon.classList.remove('hidden');
                if(darkIcon) darkIcon.classList.add('hidden');
            }
        });
    }
}

// 6. Xử lý Trợ lý AI Chatbot
function toggleAIChat() {
    const chatBox = document.getElementById('ai-chat-box');
    if (!chatBox) return;
    if (chatBox.classList.contains('hidden')) {
        chatBox.classList.remove('hidden');
        chatBox.classList.add('flex');
        document.getElementById('ai-input')?.focus();
    } else {
        chatBox.classList.add('hidden');
        chatBox.classList.remove('flex');
    }
}

async function sendAIMessage() {
    const inputElem = document.getElementById('ai-input');
    const message = inputElem.value.trim();
    if (!message) return;

    const messagesContainer = document.getElementById('ai-messages');
    messagesContainer.innerHTML += `
        <div class="flex items-start justify-end gap-2">
            <div class="bg-hust-red text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%] leading-relaxed">
                ${message}
            </div>
        </div>
    `;
    inputElem.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 7. Tự động chạy tất cả khi file layout nạp xong
document.addEventListener('DOMContentLoaded', () => {
    injectHeaderAndNav();
    injectFooterAndAI();
    initTheme();
    checkUserSession();
    renderDynamicNavMenu();
});