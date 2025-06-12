class GoogleReviews extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .reviews-section {
                    background: #f8f9fa;
                    padding: 4rem 0;
                    margin: 4rem 0;
                }
                
                .reviews-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                
                .reviews-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }
                
                .reviews-header h2 {
                    font-size: 2.5rem;
                    color: var(--primary-color);
                    margin-bottom: 1rem;
                    font-weight: 700;
                }
                
                .reviews-header .google-logo {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1.1rem;
                    color: #666;
                    margin-bottom: 0.5rem;
                }
                
                .reviews-header .overall-rating {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                    margin: 1rem 0;
                }
                
                .reviews-header .rating-score {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #333;
                }
                
                .reviews-header .stars {
                    color: #ffc107;
                    font-size: 1.5rem;
                }
                
                .reviews-header .total-reviews {
                    color: #666;
                    font-size: 1rem;
                }
                
                /* 瀑布流布局 */
                .reviews-masonry {
                    column-count: 3;
                    column-gap: 1.5rem;
                    column-fill: balance;
                }
                
                .review-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    break-inside: avoid;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                
                .review-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                }
                
                .review-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                
                .reviewer-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #e0e0e0;
                }
                
                .reviewer-info h4 {
                    margin: 0 0 0.25rem 0;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #333;
                }
                
                .reviewer-info .review-date {
                    font-size: 0.85rem;
                    color: #666;
                    margin: 0;
                }
                
                .review-rating {
                    color: #ffc107;
                    font-size: 1rem;
                    margin-bottom: 0.75rem;
                }
                
                .review-text {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: #444;
                    margin-bottom: 1rem;
                }
                
                .view-on-google {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: #4285f4;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 0.85rem;
                    font-weight: 500;
                    transition: background 0.3s ease;
                }
                
                .view-on-google:hover {
                    background: #3367d6;
                    color: white;
                }
                
                .view-on-google i {
                    font-size: 1rem;
                }
                
                /* 響應式設計 */
                @media (max-width: 768px) {
                    .reviews-masonry {
                        column-count: 2;
                        column-gap: 1rem;
                    }
                    
                    .reviews-container {
                        padding: 0 1rem;
                    }
                    
                    .reviews-header h2 {
                        font-size: 2rem;
                    }
                    
                    .review-card {
                        padding: 1.25rem;
                        margin-bottom: 1rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .reviews-masonry {
                        column-count: 1;
                    }
                    
                    .reviews-section {
                        padding: 3rem 0;
                    }
                    
                    .reviews-header h2 {
                        font-size: 1.75rem;
                    }
                    
                    .overall-rating {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                }
            </style>
            
            <section class="reviews-section">
                <div class="reviews-container">
                    <div class="reviews-header">
                        <div class="google-logo">
                            <i class="fab fa-google"></i>
                            <span>Google 評論</span>
                        </div>
                        <h2>顧客真實評價</h2>
                        <div class="overall-rating">
                            <span class="rating-score">4.8</span>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <span class="total-reviews">基於 127 則評論</span>
                        </div>
                    </div>
                    
                    <div class="reviews-masonry">
                        <div class="review-card">
                            <div class="review-header">
                                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b547?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="王小美" class="reviewer-avatar">
                                <div class="reviewer-info">
                                    <h4>王小美</h4>
                                    <p class="review-date">3 週前</p>
                                </div>
                            </div>
                            <div class="review-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p class="review-text">海放你基地真的太棒了！設施很完善，工作人員超級友善，海景更是美得讓人窒息。孩子們玩得超開心，我們全家都愛上這裡了！</p>
                            <a href="https://www.google.com/maps/place/海放你基地" target="_blank" class="view-on-google">
                                <i class="fab fa-google"></i>
                                View on Google
                            </a>
                        </div>
                        
                        <div class="review-card">
                            <div class="review-header">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="李大明" class="reviewer-avatar">
                                <div class="reviewer-info">
                                    <h4>李大明</h4>
                                    <p class="review-date">1 個月前</p>
                                </div>
                            </div>
                            <div class="review-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p class="review-text">第一次帶家人來露營，選擇海放你基地真是明智的決定！租借的帳篷品質很好，晚上聽著海浪聲入睡，早上看著日出，太浪漫了！</p>
                            <a href="https://www.google.com/maps/place/海放你基地" target="_blank" class="view-on-google">
                                <i class="fab fa-google"></i>
                                View on Google
                            </a>
                        </div>
                        
                        <div class="review-card">
                            <div class="review-header">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="陳美玲" class="reviewer-avatar">
                                <div class="reviewer-info">
                                    <h4>陳美玲</h4>
                                    <p class="review-date">2 週前</p>
                                </div>
                            </div>
                            <div class="review-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p class="review-text">參加了兒童營隊，孩子學到很多戶外知識，教練們都很專業又有耐心。營區環境乾淨整潔，安全措施也做得很好，讓家長很放心！</p>
                            <a href="https://www.google.com/maps/place/海放你基地" target="_blank" class="view-on-google">
                                <i class="fab fa-google"></i>
                                View on Google
                            </a>
                        </div>
                        
                        <div class="review-card">
                            <div class="review-header">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="張志強" class="reviewer-avatar">
                                <div class="reviewer-info">
                                    <h4>張志強</h4>
                                    <p class="review-date">3 天前</p>
                                </div>
                            </div>
                            <div class="review-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p class="review-text">露營車住宿體驗超棒！設備齊全，冷暖氣很舒適，還有獨立衛浴。窗外就是無敵海景，CP值超高！已經預訂下次的行程了。</p>
                            <a href="https://www.google.com/maps/place/海放你基地" target="_blank" class="view-on-google">
                                <i class="fab fa-google"></i>
                                View on Google
                            </a>
                        </div>
                        
                        <div class="review-card">
                            <div class="review-header">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="林雅雯" class="reviewer-avatar">
                                <div class="reviewer-info">
                                    <h4>林雅雯</h4>
                                    <p class="review-date">1 週前</p>
                                </div>
                            </div>
                            <div class="review-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p class="review-text">公司團建活動選擇這裡太棒了！客製化包場服務很貼心，BBQ設備齊全，大家玩得很開心。工作人員協助度很高，推薦給其他公司！</p>
                            <a href="https://www.google.com/maps/place/海放你基地" target="_blank" class="view-on-google">
                                <i class="fab fa-google"></i>
                                View on Google
                            </a>
                        </div>
                        
                        <div class="review-card">
                            <div class="review-header">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="黃建華" class="reviewer-avatar">
                                <div class="reviewer-info">
                                    <h4>黃建華</h4>
                                    <p class="review-date">5 天前</p>
                                </div>
                            </div>
                            <div class="review-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                            <p class="review-text">一泊二食的服務很不錯，食物品質超出預期！海鮮很新鮮，BBQ設備也很好用。唯一小建議是希望能增加更多蔬食選項。</p>
                            <a href="https://www.google.com/maps/place/海放你基地" target="_blank" class="view-on-google">
                                <i class="fab fa-google"></i>
                                View on Google
                            </a>
                        </div>
                        
                        <div class="review-card">
                            <div class="review-header">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="吳佩君" class="reviewer-avatar">
                                <div class="reviewer-info">
                                    <h4>吳佩君</h4>
                                    <p class="review-date">2 個月前</p>
                                </div>
                            </div>
                            <div class="review-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p class="review-text">帶父母來這裡度假，他們很喜歡這裡的環境。工作人員對長輩很照顧，設施對老人家來說也很友善。下次還會再來！</p>
                            <a href="https://www.google.com/maps/place/海放你基地" target="_blank" class="view-on-google">
                                <i class="fab fa-google"></i>
                                View on Google
                            </a>
                        </div>
                        
                        <div class="review-card">
                            <div class="review-header">
                                <img src="https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="劉家豪" class="reviewer-avatar">
                                <div class="reviewer-info">
                                    <h4>劉家豪</h4>
                                    <p class="review-date">4 天前</p>
                                </div>
                            </div>
                            <div class="review-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p class="review-text">朋友聚會選擇這裡真的很棒！海景第一排的位置太美了，拍照效果一流。租借的設備都很新，服務人員也很熱心協助。</p>
                            <a href="https://www.google.com/maps/place/海放你基地" target="_blank" class="view-on-google">
                                <i class="fab fa-google"></i>
                                View on Google
                            </a>
                        </div>
                        
                        <div class="review-card">
                            <div class="review-header">
                                <img src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="許雅婷" class="reviewer-avatar">
                                <div class="reviewer-info">
                                    <h4>許雅婷</h4>
                                    <p class="review-date">1 個月前</p>
                                </div>
                            </div>
                            <div class="review-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p class="review-text">第一次露營就選對地方了！工作人員教我們怎麼搭帳篷，很有耐心。晚上的營火活動很溫馨，讓我們留下美好回憶。強烈推薦給新手露營者！</p>
                            <a href="https://www.google.com/maps/place/海放你基地" target="_blank" class="view-on-google">
                                <i class="fab fa-google"></i>
                                View on Google
                            </a>
                        </div>
                        
                        <div class="review-card">
                            <div class="review-header">
                                <img src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" alt="鄭大衛" class="reviewer-avatar">
                                <div class="reviewer-info">
                                    <h4>鄭大衛</h4>
                                    <p class="review-date">6 天前</p>
                                </div>
                            </div>
                            <div class="review-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <p class="review-text">海放計畫的課程內容很豐富，學到很多實用的戶外技能。教練很專業，安全措施也做得很好。推薦給想要挑戰自己的朋友們！</p>
                            <a href="https://www.google.com/maps/place/海放你基地" target="_blank" class="view-on-google">
                                <i class="fab fa-google"></i>
                                View on Google
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('google-reviews', GoogleReviews);