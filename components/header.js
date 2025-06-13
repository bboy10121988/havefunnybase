class AppHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <!-- 主橫幅區域 - 全寬度 -->
            <div class="main-banner">
                <div class="banner-overlay">
                    <div class="banner-content">
                        <img src="images/logo.jpg" alt="海放你基地 Logo" class="header-logo">
                        <h1 class="hero-title">海放你基地</h1>
                        <p>體驗大自然的美麗，留下難忘的露營回憶</p>
                    </div>
                </div>
            </div>
            
            <!-- 引入導航欄 -->
            <app-navigation></app-navigation>

            <!-- 懸浮按鈕組件 -->
            <div class="floating-buttons">
                <!-- 桌機版 - 右側懸浮按鈕 -->
                <div class="desktop-floating-buttons">
                    <a href="https://line.me/R/ti/p/@havefunnybase" target="_blank" class="floating-btn line-btn">
                        <div class="btn-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 10.6C22 5.9 17.5 2 12 2C6.5 2 2 5.9 2 10.6C2 14.9 5.4 18.3 9.9 19.4C10.2 19.5 10.6 19.7 10.7 20C10.8 20.3 10.7 20.8 10.7 21.1C10.7 21.1 10.6 21.8 10.6 22C10.6 22.3 10.8 22.6 11.2 22.5C11.6 22.4 16.1 19.7 18.8 17.4C20.6 15.9 22 13.4 22 10.6Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <span>LINE</span>
                    </a>
                    <button class="floating-btn booking-btn" onclick="document.getElementById('phonePopup').style.display='flex'">
                        <div class="btn-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <span>預約</span>
                    </button>
                </div>

                <!-- 手機版 - 底部懸浮按鈕 -->
                <div class="mobile-floating-buttons">
                    <a href="https://line.me/R/ti/p/@havefunnybase" target="_blank" class="mobile-btn line-btn">
                        <div class="btn-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 10.6C22 5.9 17.5 2 12 2C6.5 2 2 5.9 2 10.6C2 14.9 5.4 18.3 9.9 19.4C10.2 19.5 10.6 19.7 10.7 20C10.8 20.3 10.7 20.8 10.7 21.1C10.7 21.1 10.6 21.8 10.6 22C10.6 22.3 10.8 22.6 11.2 22.5C11.6 22.4 16.1 19.7 18.8 17.4C20.6 15.9 22 13.4 22 10.6Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <span>LINE 專人服務</span>
                    </a>
                    <a href="tel:0979116598" class="mobile-btn booking-btn">
                        <div class="btn-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="currentColor"/>
                        </div>
                        <span>我要預約</span>
                    </a>
                </div>
            </div>

            <!-- 電話號碼彈窗 -->
            <div id="phonePopup" class="popup-overlay" onclick="if(event.target === this) this.style.display='none'">
                <div class="popup-content">
                    <h3>預約專線</h3>
                    <p class="phone-number">0979-116-598</p>
                    <button class="close-btn" onclick="document.getElementById('phonePopup').style.display='none'">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>

            
            <style>
                /* 主橫幅樣式 */
                .main-banner {
                    width: 100%;
                    aspect-ratio: 4/3;
                    max-height: 600px; /* 限制最大高度 */
                    background-image: url('../images/mainbanner01.webp');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    position: relative;
                }

                /* 在較大螢幕上調整最大高度 */
                @media (min-width: 1400px) {
                    .main-banner {
                        max-height: 700px;
                    }
                }

                /* 橫幅覆蓋層 - 提供漸變效果並增加文字可讀性 */
                .banner-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 47, 67, 0.7));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* 橫幅內容樣式 */
                .banner-content {
                    text-align: center;
                    color: white;
                    padding: 0.5rem;
                    max-width: 800px;
                }

                .banner-content h1 {
                    font-size: 3.5rem;
                    margin: 0 0 1rem 0;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }

                .banner-content p {
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
                }

                /* Logo 樣式 */
                .logo-container {
                    margin: 0;
                    padding: 0;
                    text-align: center;
                }

                .header-logo {
                    width: 220px;
                    height: 220px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 4px solid white;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                    transition: transform 0.3s ease;
                    margin: 0 auto 1.5rem auto;
                    display: block;
                }

                .header-logo:hover {
                    transform: scale(1.05);
                }

                /* 懸浮按鈕容器 */
                .floating-buttons {
                    position: fixed;
                    z-index: 1000;
                }

                /* 桌機版懸浮按鈕樣式 */
                .desktop-floating-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    position: fixed;
                    right: 32px;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1000;
                }

                .floating-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    width: 70px;
                    height: 70px;
                    border-radius: 10px;
                    text-decoration: none;
                    color: white;
                    font-weight: 600;
                    font-size: 12px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                }

                .line-btn {
                    background: linear-gradient(135deg, #00B900, #009900);
                }

                .line-btn:hover {
                    background: linear-gradient(135deg, #009900, #007700);
                }

                .booking-btn {
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                }

                .booking-btn:hover {
                    background: linear-gradient(135deg, var(--secondary-color), #1a5c8a);
                }

                .floating-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
                }

                .floating-btn .btn-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;
                }

                .floating-btn svg {
                    width: 24px;
                    height: 24px;
                }

                /* 手機版懸浮按鈕樣式 */
                .mobile-floating-buttons {
                    display: none;  /* 預設隱藏 */
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: white;
                    padding: 16px;
                    gap: 12px;
                    z-index: 1000;
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                }

                .mobile-btn {
                    flex: 1;
                    display: flex;
                    flex-direction: row;  /* 改為水平排列 */
                    align-items: center;  /* 垂直居中對齊 */
                    justify-content: center;
                    gap: 8px;
                    padding: 12px 20px;  /* 調整內邊距 */
                    border-radius: 12px;
                    text-decoration: none;
                    color: white;
                    font-weight: 600;
                    font-size: 14px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                }

                .mobile-btn.line-btn {
                    background: linear-gradient(135deg, #00B900, #009900);
                }

                .mobile-btn.line-btn:hover {
                    background: linear-gradient(135deg, #009900, #007700);
                }

                .mobile-btn.booking-btn {
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                }

                .mobile-btn.booking-btn:hover {
                    background: linear-gradient(135deg, var(--secondary-color), #1a5c8a);
                }

                .mobile-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
                }

                .mobile-btn .btn-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;
                }

                .mobile-btn svg {
                    width: 24px;
                    height: 24px;
                }

                /* 彈窗樣式 */
                .popup-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                }

                .popup-content {
                    background: white;
                    padding: 32px;
                    border-radius: 16px;
                    position: relative;
                    max-width: 90%;
                    width: 320px;
                    text-align: center;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                }

                .popup-content h3 {
                    color: var(--primary-color);
                    margin: 0 0 16px 0;
                    font-size: 24px;
                }

                .phone-number {
                    font-size: 28px;
                    font-weight: bold;
                    color: #333;
                    margin: 16px 0;
                }

                .close-btn {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: none;
                    border: none;
                    padding: 4px;
                    cursor: pointer;
                    color: #666;
                    transition: all 0.3s ease;
                }

                .close-btn:hover {
                    color: #333;
                    transform: scale(1.1);
                }

                /* 改變桌機版預約按鈕的cursor樣式 */
                .desktop-floating-buttons .booking-btn {
                    border: none;
                    cursor: pointer;
                }

                /* 響應式設計 */
                @media (max-width: 768px) {
                    .desktop-floating-buttons {
                        display: none;
                    }

                    .mobile-floating-buttons {
                        display: flex;
                    }

                    /* 手機版隱藏標題，只顯示副標題 */
                    .hero-title {
                        display: none;
                    }

                    /* 手機版 logo 樣式 */
                    .header-logo {
                        width: 140px;
                        height: 140px;
                        margin: 0 auto 1rem auto;
                    }

                    .logo-container {
                        margin: 0;
                        padding: 0;
                    }

                    .banner-content p {
                        font-size: 1.2rem;
                        margin-bottom: 1rem;
                    }

                    /* 為底部懸浮按鈕預留空間 */
                    body {
                        padding-bottom: calc(16px * 2 + 48px);
                    }
                }

                @media (max-width: 480px) {
                    /* 更小螢幕的 logo 樣式 */
                    .header-logo {
                        width: 100px;
                        height: 100px;
                        border: 3px solid white;
                        margin: 0 auto 1rem auto;
                    }

                    .logo-container {
                        margin: 0;
                        padding: 0;
                    }

                    .banner-content p {
                        font-size: 1rem;
                        margin-bottom: 1rem;
                    }

                    .mobile-floating-buttons {
                        padding: 12px;
                        gap: 8px;
                    }

                    .mobile-btn {
                        padding: 12px;
                        font-size: 14px;
                    }

                    .mobile-btn svg {
                        width: 18px;
                        height: 18px;
                    }
                }

                /* 高解析度螢幕調整 */
                @media (min-width: 1400px) {
                    .desktop-floating-buttons {
                        right: 48px;
                    }

                    .floating-btn {
                        width: 70px;
                        height: 70px;
                    }
                }
            </style>
        `;
    }
}

customElements.define('app-header', AppHeader);