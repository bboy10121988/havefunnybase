class GoogleReviews extends HTMLElement {
    constructor() {
        super();
        this.reviews = [
            {
                id: 1,
                name: "陳*明",
                rating: 5,
                date: "2024年5月",
                text: "超棒的露營體驗！設施很完善，工作人員服務態度很好，晚上的營火活動特別有趣。會再來的！",
                avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 2,
                name: "王*華",
                rating: 5,
                date: "2024年4月",
                text: "帶孩子來露營，小朋友玩得很開心！營地乾淨整潔，有很多親子活動，推薦給有小孩的家庭。",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 3,
                name: "李*強",
                rating: 4,
                date: "2024年4月",
                text: "第一次來海放你基地，環境很不錯，空氣清新，設備齊全。唯一小建議是希望能增加更多遮陽設施。",
                avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face"
            }
        ];
    }

    connectedCallback() {
        this.render();
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        // 滿星
        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star full">★</span>';
        }
        
        // 半星
        if (hasHalfStar) {
            stars += '<span class="star half">★</span>';
        }
        
        // 空星
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="star empty">☆</span>';
        }
        
        return stars;
    }

    render() {
        this.innerHTML = `
            <div class="google-reviews">
                <div class="reviews-header">
                    <div class="header-content">
                        <div class="header-text">
                            <div class="title-with-icon">
                                <div class="google-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                </div>
                                <h3>Google 評論</h3>
                            </div>
                            <div class="overall-rating">
                                <div class="rating-stars">
                                    ${this.generateStars(4.8)}
                                </div>
                                <span class="rating-text">4.8 分 (50+ 則評論)</span>
                            </div>
                        </div>
                    </div>
                    <a href="https://maps.app.goo.gl/K9zH4BYNSqW4kPT29" target="_blank" class="view-all-btn">
                        查看所有評論
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>

                <!-- Google 地圖區域 -->
                <div class="map-section">
                    <google-map></google-map>
                </div>

                <div class="reviews-grid">
                    ${this.reviews.map(review => `
                        <div class="review-card">
                            <div class="review-header">
                                <img class="user-avatar" src="${review.avatar}" alt="${review.name}" loading="lazy">
                                <div class="user-info">
                                    <div class="user-name">${review.name}</div>
                                    <div class="review-date">${review.date}</div>
                                </div>
                                <div class="review-rating">
                                    ${this.generateStars(review.rating)}
                                </div>
                            </div>
                            <div class="review-text">${review.text}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="reviews-footer">
                    <a href="https://maps.app.goo.gl/K9zH4BYNSqW4kPT29" target="_blank" class="google-maps-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                        </svg>
                        在 Google Maps 上查看更多評論
                    </a>
                </div>
            </div>

            <style>
                .google-reviews {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 40px 20px;
                    background: #ffffff;
                    border-radius: 16px;
                    box-shadow: 0 4px 20px rgba(0, 47, 67, 0.1);
                }

                .map-section {
                    margin: 32px 0;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 47, 67, 0.15);
                }

                .reviews-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 32px;
                    padding-bottom: 24px;
                    border-bottom: 2px solid #f0f4f8;
                }

                .header-content {
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    flex: 1;
                }

                .title-with-icon {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 8px;
                }

                .google-icon {
                    flex-shrink: 0;
                    width: 32px;
                    height: 32px;
                    background: #ffffff;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                }

                .header-text {
                    text-align: left;
                }

                .header-text h3 {
                    margin: 0;
                    font-size: 24px;
                    font-weight: 700;
                    color: #002F43;
                    line-height: 1.2;
                }

                .overall-rating {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-top: 8px;
                }

                .rating-stars {
                    display: flex;
                    gap: 2px;
                }

                .star {
                    font-size: 20px;
                    line-height: 1;
                }

                .star.full {
                    color: #FFB400;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                }

                .star.half {
                    color: #FFB400;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                    opacity: 0.7;
                }

                .star.empty {
                    color: #E5E7EB;
                    text-shadow: none;
                }

                .rating-text {
                    font-size: 16px;
                    font-weight: 600;
                    color: #002F43;
                }

                .view-all-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 20px;
                    background: #002F43;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }

                .view-all-btn:hover {
                    background: #004466;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 47, 67, 0.3);
                }

                .reviews-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 24px;
                    margin-bottom: 32px;
                }

                .review-card {
                    background: #f8fafb;
                    border: 1px solid #e5e9ed;
                    border-radius: 12px;
                    padding: 20px;
                    transition: all 0.3s ease;
                }

                .review-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(0, 47, 67, 0.15);
                    border-color: #002F43;
                }

                .review-header {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    margin-bottom: 16px;
                }

                .user-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 8px rgba(0, 47, 67, 0.15);
                    flex-shrink: 0;
                }

                .user-info {
                    flex: 1;
                    min-width: 0;
                }

                .user-name {
                    font-weight: 700;
                    font-size: 16px;
                    color: #002F43;
                    margin-bottom: 4px;
                }

                .review-date {
                    font-size: 14px;
                    color: #6B7280;
                }

                .review-rating {
                    display: flex;
                    gap: 1px;
                    flex-shrink: 0;
                }

                .review-rating .star {
                    font-size: 16px;
                }

                .review-text {
                    font-size: 15px;
                    line-height: 1.6;
                    color: #1F2937;
                    background: #ffffff;
                    padding: 16px;
                    border-radius: 8px;
                    border-left: 4px solid #002F43;
                }

                .reviews-footer {
                    text-align: center;
                    padding-top: 24px;
                    border-top: 1px solid #E5E7EB;
                }

                .google-maps-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 24px;
                    background: transparent;
                    color: #002F43;
                    text-decoration: none;
                    border: 2px solid #002F43;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 16px;
                    transition: all 0.3s ease;
                }

                .google-maps-link:hover {
                    background: #002F43;
                    color: #ffffff;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 47, 67, 0.3);
                }

                /* 響應式設計 */
                @media (max-width: 768px) {
                    .google-reviews {
                        padding: 24px 16px;
                        margin: 0 16px;
                    }

                    .reviews-header {
                        flex-direction: column;
                        gap: 20px;
                        align-items: stretch;
                    }

                    .header-content {
                        flex-direction: column;
                        align-items: flex-start;
                        text-align: left;
                        gap: 12px;
                    }

                    .title-with-icon {
                        justify-content: flex-start;
                    }

                    .header-text h3 {
                        font-size: 20px;
                    }

                    .overall-rating {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                    }

                    .view-all-btn {
                        align-self: center;
                    }

                    .reviews-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }

                    .review-card {
                        padding: 16px;
                    }

                    .review-header {
                        gap: 10px;
                    }

                    .user-avatar {
                        width: 40px;
                        height: 40px;
                    }

                    .user-name {
                        font-size: 15px;
                    }

                    .review-text {
                        font-size: 14px;
                        padding: 12px;
                    }

                    .google-maps-link {
                        padding: 12px 20px;
                        font-size: 14px;
                    }
                }

                @media (max-width: 480px) {
                    .google-reviews {
                        border-radius: 0;
                        margin: 0;
                    }

                    .reviews-grid {
                        grid-template-columns: 1fr;
                    }

                    .review-card {
                        padding: 12px;
                    }

                    .review-header {
                        flex-direction: column;
                        gap: 8px;
                        align-items: flex-start;
                    }

                    .user-info {
                        order: 1;
                    }

                    .review-rating {
                        order: 2;
                    }
                }
            </style>
        `;
    }
}

customElements.define('google-reviews', GoogleReviews);