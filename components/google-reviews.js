class GoogleReviews extends HTMLElement {
    constructor() {
        super();
        this.reviews = [];
        this.averageRating = '5.0';
        this.reviewCount = '0';
        
        // 綁定事件處理器
        this.handleReviewsUpdated = this.handleReviewsUpdated.bind(this);
        this.handleReviewLoadingStart = this.handleReviewLoadingStart.bind(this);
        this.handleReviewLoadingError = this.handleReviewLoadingError.bind(this);
    }

    connectedCallback() {
        // 註冊事件監聽器
        document.addEventListener('reviewsUpdated', this.handleReviewsUpdated);
        document.addEventListener('reviewLoadingStart', this.handleReviewLoadingStart);
        document.addEventListener('reviewLoadingError', this.handleReviewLoadingError);
        
        // 初始化顯示
        this.showLoadingState();
        
        try {
            // 如果有快取的評論，先顯示
            const savedReviews = localStorage.getItem('googleReviews');
            if (savedReviews) {
                this.handleReviewsUpdated({ detail: { reviews: JSON.parse(savedReviews) } });
            }
            
            // 自動備份評論資料
            this.autoBackupReviews();
        } catch (error) {
            console.error('載入評論時發生錯誤:', error);
            this.handleReviewLoadingError({ detail: { error: '載入評論失敗' } });
        }
    }

    // 自動備份評論到 localStorage
    autoBackupReviews() {
        setInterval(() => {
            try {
                const reviews = JSON.stringify(this.reviews);
                localStorage.setItem('googleReviews_backup', reviews);
                console.log('評論資料已自動備份');
            } catch (error) {
                console.error('備份評論時發生錯誤:', error);
            }
        }, 5 * 60 * 1000); // 每 5 分鐘備份一次
    }

    // 還原備份
    restoreFromBackup() {
        try {
            const backup = localStorage.getItem('googleReviews_backup');
            if (backup) {
                localStorage.setItem('googleReviews', backup);
                this.handleReviewsUpdated({ detail: { reviews: JSON.parse(backup) } });
                console.log('已從備份還原評論資料');
                return true;
            }
        } catch (error) {
            console.error('還原備份時發生錯誤:', error);
        }
        return false;
    }

    showLoadingState() {
        this.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #666;"></i>
                <p style="margin-top: 1rem; color: #666;">正在載入評論...</p>
            </div>
        `;
    }
    
    handleReviewLoadingStart() {
        this.showLoadingState();
    }
    
    handleReviewLoadingError(event) {
        this.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #dc3545;">
                <i class="fas fa-exclamation-circle" style="font-size: 2rem;"></i>
                <p style="margin-top: 1rem;">載入評論時發生錯誤：${event.detail.error}</p>
                <button onclick="window.reviewUpdater.update(true)" 
                        style="margin-top: 1rem; padding: 0.5rem 1rem; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    重試
                </button>
            </div>
        `;
    }
    
    handleReviewsUpdated(event) {
        const reviews = event.detail.reviews;
        const highRatedReviews = reviews.filter(review => review.rating >= 4);
        
        if (highRatedReviews.length > 0) {
            const totalRating = highRatedReviews.reduce((sum, review) => sum + review.rating, 0);
            this.averageRating = (totalRating / highRatedReviews.length).toFixed(1);
            this.reviewCount = highRatedReviews.length.toString();
            this.reviews = highRatedReviews;
            this.render();
        }
    }
    
    generateStars(rating) {
        return Array(5).fill(0).map((_, i) => 
            `<i class="fas fa-star" style="color: ${i < rating ? '#ffc107' : '#e4e5e9'}"></i>`
        ).join('');
    }
    
    formatDate(dateStr) {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 24 * 60 * 60 * 1000) {
            const hours = Math.floor(diff / (60 * 60 * 1000));
            if (hours < 1) return '剛剛';
            return `${hours} 小時前`;
        }
        
        if (diff < 7 * 24 * 60 * 60 * 1000) {
            const days = Math.floor(diff / (24 * 60 * 60 * 1000));
            return `${days} 天前`;
        }
        
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
    }
    
    renderReviews(reviews) {
        if (!reviews || reviews.length === 0) {
            return '<p style="text-align: center; color: #666;">目前還沒有評論</p>';
        }

        return reviews.map(review => {
            const stars = this.generateStars(review.rating);
            const formattedDate = this.formatDate(review.date);
            
            return `
                <div class="review-card">
                    <div class="review-header">
                        <img src="${review.avatar}" alt="${review.name}" class="reviewer-avatar">
                        <div class="reviewer-info">
                            <h4>${review.name}</h4>
                            <p class="review-date">${formattedDate}</p>
                        </div>
                    </div>
                    <div class="review-rating">
                        ${stars}
                    </div>
                    <p class="review-text">${review.text}</p>
                    <a href="https://www.google.com/maps/place/%E6%B5%B7%E6%94%BE%E4%BD%A0%E5%9F%BA%E5%9C%B0+Have+Funny+Base/@23.6131676,121.5259307,17z/data=!4m11!3m10!1s0x346f532df52c4279:0x6e369ae51c5c2117!5m2!4m1!1i2!8m2!3d23.6131676!4d121.5285056!9m1!1b1!16s%2Fg%2F11pvc3kn3z?entry=ttu" 
                       target="_blank" 
                       class="view-on-google">
                        <i class="fab fa-google"></i>
                        在 Google 上查看
                    </a>
                </div>
            `;
        }).join('');
    }

    // 匯出評論資料
    exportReviews() {
        try {
            const reviews = localStorage.getItem('googleReviews');
            if (reviews) {
                const blob = new Blob([reviews], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `google-reviews-backup-${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                return true;
            }
        } catch (error) {
            console.error('匯出評論時發生錯誤:', error);
        }
        return false;
    }

    // 匯入評論資料
    async importReviews(file) {
        try {
            const text = await file.text();
            const reviews = JSON.parse(text);
            
            // 驗證資料格式
            if (!Array.isArray(reviews)) {
                throw new Error('無效的評論資料格式');
            }
            
            // 儲存並更新評論
            localStorage.setItem('googleReviews', JSON.stringify(reviews));
            this.handleReviewsUpdated({ detail: { reviews } });
            return true;
        } catch (error) {
            console.error('匯入評論時發生錯誤:', error);
            return false;
        }
    }

    render() {
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
                            <span>精選評論</span>
                        </div>
                        <h2>顧客真實好評</h2>
                        <div class="overall-rating">
                            <span class="rating-score">${this.averageRating}</span>
                            <div class="stars">
                                ${this.generateStars(Math.round(parseFloat(this.averageRating)))}
                            </div>
                            <span class="total-reviews">精選 ${this.reviewCount} 則評論</span>
                        </div>
                    </div>
                    
                    <div class="reviews-masonry">
                        ${this.renderReviews(this.reviews.filter(review => review.rating >= 4))}
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('google-reviews', GoogleReviews);