class Navigation extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <!-- 桌面版和手機版導航容器 -->
            <div class="nav-container">
                <!-- 左側: 漢堡選單按鈕 (手機版) -->
                <div class="hamburger-menu">
                    <div class="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <!-- 中間: Logo (手機版) -->
                <div class="mobile-title">
                    <a href="index.html" class="logo-link">
                        <img src="images/logo.jpg" alt="海放你基地" class="mobile-logo">
                    </a>
                </div>
                
                <!-- 桌面版導航選單 - 置中 -->
                <nav class="desktop-nav">
                    <ul class="nav-menu">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="intro.html">海放你介紹</a></li>
                        <li><a href="rental.html">海放你基地</a></li>
                        <li><a href="plan.html">海放計畫</a></li>
                        <li><a href="kids-camp.html">海放兒童營隊</a></li>
                        <li><a href="tel:0979116598" class="cta-button">聯繫我們</a></li>
                    </ul>
                </nav>
            </div>

            <!-- 手機版側邊選單 - 預設隱藏 -->
            <div class="mobile-sidebar">
                <div class="sidebar-header">
                    <div class="close-btn">&times;</div>
                </div>
                <ul class="mobile-menu">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="intro.html">海放你介紹</a></li>
                    <li><a href="rental.html">海放你基地</a></li>
                    <li><a href="plan.html">海放計畫</a></li>
                    <li><a href="kids-camp.html">海放兒童營隊</a></li>
                    <li><a href="tel:0979116598" class="cta-button">聯繫我們</a></li>
                </ul>
            </div>

            <style>
                /* 全局樣式 - 只在手機版生效，在響應式部分控制 */
                @media (max-width: 768px) {
                    body {
                        padding-top: 60px; /* 為固定導航欄預留空間 */
                    }
                }
                
                /* 導航容器樣式 */
                .nav-container {
                    display: flex;
                    justify-content: center; /* 保持置中對齊 */
                    align-items: center;
                    padding: 1rem 20px; /* 與內容區域相同的左右間距 */
                    background-color: white;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    position: relative;
                    z-index: 1000;
                    max-width: 1200px; /* 與容器最大寬度相同 */
                    margin: 0 auto; /* 置中 */
                    width: 100%;
                }

                /* 桌面版導航選單樣式 */
                .desktop-nav {
                    display: flex;
                    justify-content: center; /* 確保導航內容也置中 */
                    width: 100%;
                }

                .nav-menu {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    gap: 2rem;
                }

                .nav-menu li a {
                    color: var(--text-color);
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 1rem;
                    padding: 0.5rem 0;
                    position: relative;
                    transition: color 0.3s ease;
                }

                .nav-menu li a::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: var(--primary-color);
                    transition: width 0.3s ease;
                }

                .nav-menu li a:hover {
                    color: var(--primary-color);
                }

                .nav-menu li a:hover::after {
                    width: 100%;
                }

                /* CTA按鈕樣式 */
                .cta-button {
                    background-color: var(--primary-color);
                    color: white !important;
                    padding: 0.6rem 1.2rem !important;
                    border-radius: 30px;
                    font-weight: 600;
                    transition: background-color 0.3s ease, transform 0.3s ease;
                    box-shadow: 0 4px 6px rgba(43, 108, 176, 0.25);
                }

                .cta-button:hover {
                    background-color: var(--secondary-color);
                    transform: translateY(-2px);
                }

                .nav-menu li a.cta-button::after {
                    display: none;
                }

                /* 漢堡選單按鈕樣式 - 預設隱藏 */
                .hamburger-menu {
                    display: none;
                    cursor: pointer;
                    margin-left: 0; /* 移除左側間距 */
                }

                .hamburger-icon {
                    width: 24px;
                    height: 24px;
                    position: relative;
                    padding: 0; /* 移除內間距 */
                    margin: 0; /* 確保沒有外邊距 */
                    background-color: transparent;
                    border: none;
                    box-sizing: content-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .hamburger-icon span {
                    display: block;
                    position: absolute;
                    height: 1.5px; /* 更細的線條 */
                    width: 24px; /* 固定寬度 */
                    left: 0;
                    background: #111;
                    border-radius: 0;
                    opacity: 1;
                    transform: rotate(0deg);
                    transition: .25s ease-in-out;
                    border: none;
                }

                .hamburger-icon span:nth-child(1) {
                    top: 0; /* 減小間距 */
                }

                .hamburger-icon span:nth-child(2) {
                    top: 9px; /* 調整中間線位置 */
                }

                .hamburger-icon span:nth-child(3) {
                    top: 18px; /* 調整下方位置 */
                }

                .hamburger-icon.active span:nth-child(1) {
                    top: 12px; /* 與中間線對齊 */
                    transform: rotate(45deg);
                }

                .hamburger-icon.active span:nth-child(2) {
                    opacity: 0;
                    width: 0;
                }

                .hamburger-icon.active span:nth-child(3) {
                    top: 12px; /* 與中間線對齊 */
                    transform: rotate(-45deg);
                }
                
                /* 漢堡按鈕懸停效果 */
                .hamburger-icon:hover span {
                    background: var(--primary-color);
                }

                /* 手機版側邊選單樣式 */
                .mobile-sidebar {
                    position: fixed;
                    top: 0;
                    left: -300px; /* 預設隱藏在左側 */
                    width: 300px;
                    height: 100vh;
                    background-color: white;
                    box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
                    z-index: 2000;
                    transition: left 0.3s ease;
                    overflow-y: auto;
                }

                .mobile-sidebar.active {
                    left: 0; /* 從左側顯示側邊選單 */
                }

                .sidebar-header {
                    display: flex;
                    justify-content: flex-end;
                    padding: 1rem;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }

                .close-btn {
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #111;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .mobile-menu {
                    list-style: none;
                    padding: 1rem 2rem;
                    margin: 0;
                }

                .mobile-menu li {
                    margin-bottom: 1.5rem;
                }

                .mobile-menu li a {
                    color: var(--text-color);
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 1.2rem;
                    display: block;
                    padding: 0.5rem 0;
                    transition: color 0.3s ease;
                }

                .mobile-menu li a:hover {
                    color: var(--primary-color);
                }

                .mobile-menu li a.cta-button {
                    color: white !important;
                    text-align: center;
                    margin-top: 1rem;
                }

                /* 側邊選單背景覆蓋層 */
                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1500;
                    display: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .overlay.active {
                    display: block;
                    opacity: 1;
                }

                /* 手機版標題樣式 */
                .mobile-title {
                    display: none; /* 桌面版隱藏 */
                    text-align: center;
                    flex-grow: 1;
                    margin: 0 auto;
                }
                
                .mobile-title a.logo-link {
                    display: inline-block;
                }
                
                .mobile-logo {
                    height: 40px;
                    width: auto;
                    display: block;
                }
                
                /* 響應式設計 */
                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none; /* 隱藏桌面版選單 */
                    }

                    .hamburger-menu {
                        display: block; /* 顯示漢堡選單按鈕 */
                        flex-basis: 24px; /* 確保漢堡按鈕的寬度固定 */
                    }
                    
                    .mobile-title {
                        display: block; /* 顯示手機版標題 */
                        text-align: center;
                    }
                    
                    .nav-container {
                        justify-content: space-between; /* 兩端對齊 */
                        padding: 0.8rem 20px; /* 減少垂直間距 */
                        position: fixed; /* 固定在頂部 */
                        top: 0;
                        left: 0;
                        right: 0;
                        margin: 0;
                        max-width: none; /* 讓導航欄寬度為100% */
                        width: 100%;
                    }
                    
                    /* 添加一個空的元素在右側，讓漢堡按鈕和中間標題保持平衡 */
                    .nav-container::after {
                        content: '';
                        width: 24px; /* 與漢堡按鈕寬度相同 */
                        display: block;
                        flex-basis: 24px;
                    }
                }
            </style>
        `;

        // 添加事件監聽器
        const hamburgerMenu = this.querySelector('.hamburger-menu');
        const mobileSidebar = this.querySelector('.mobile-sidebar');
        const closeBtn = this.querySelector('.close-btn');
        const hamburgerIcon = this.querySelector('.hamburger-icon');
        
        // 創建覆蓋層元素
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);

        // 點擊漢堡選單按鈕顯示側邊欄
        hamburgerMenu.addEventListener('click', () => {
            mobileSidebar.classList.add('active');
            overlay.classList.add('active');
            hamburgerIcon.classList.add('active');
            document.body.style.overflow = 'hidden'; // 防止背景滾動
        });

        // 點擊關閉按鈕隱藏側邊欄
        closeBtn.addEventListener('click', () => {
            mobileSidebar.classList.remove('active');
            overlay.classList.remove('active');
            hamburgerIcon.classList.remove('active');
            document.body.style.overflow = ''; // 恢復背景滾動
        });

        // 點擊覆蓋層也可以關閉側邊欄
        overlay.addEventListener('click', () => {
            mobileSidebar.classList.remove('active');
            overlay.classList.remove('active');
            hamburgerIcon.classList.remove('active');
            document.body.style.overflow = ''; // 恢復背景滾動
        });

        // 點擊側邊欄中的選項後自動關閉側邊欄
        const mobileMenuItems = this.querySelectorAll('.mobile-menu li a');
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileSidebar.classList.remove('active');
                overlay.classList.remove('active');
                hamburgerIcon.classList.remove('active');
                document.body.style.overflow = ''; // 恢復背景滾動
            });
        });
    }
}

customElements.define('app-navigation', Navigation);