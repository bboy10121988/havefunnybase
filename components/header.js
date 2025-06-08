class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <!-- 主橫幅區域 - 全寬度 -->
            <div class="main-banner">
                <div class="banner-overlay">
                    <div class="banner-content">
                        <h1>海放你基地</h1>
                        <p>體驗大自然的美麗，留下難忘的露營回憶</p>
                    </div>
                </div>
            </div>
            
            <!-- 引入導航欄 -->
            <app-navigation></app-navigation>

            <style>
                /* 主橫幅樣式 */
                .main-banner {
                    width: 100%;
                    height: 70vh; /* 設定高度為視窗高度的70% */
                    background-image: url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    position: relative;
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
                    padding: 2rem;
                    max-width: 800px;
                }

                .banner-content h1 {
                    font-size: 3.5rem;
                    margin-bottom: 1rem;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }

                .banner-content p {
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
                }

                /* 響應式設計 */
                @media (max-width: 768px) {
                    .main-banner {
                        height: 50vh; /* 在手機上減少高度 */
                    }

                    .banner-content h1 {
                        font-size: 2.5rem;
                    }

                    .banner-content p {
                        font-size: 1.2rem;
                    }
                }

                @media (max-width: 480px) {
                    .main-banner {
                        height: 40vh;
                    }

                    .banner-content h1 {
                        font-size: 2rem;
                    }

                    .banner-content p {
                        font-size: 1rem;
                    }
                }
            </style>
        `;
    }
}

customElements.define('app-header', Header);