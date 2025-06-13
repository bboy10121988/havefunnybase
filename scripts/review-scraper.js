// 自動抓取 Google 評論
async function fetchGoogleReviews(options = {}) {
    const {
        minRating = 1,            // 最低評分
        maxResults = 10,          // 最大評論數量
        forceRefresh = false      // 強制更新
    } = options;
    
    try {
        // 檢查快取
        const cachedReviews = localStorage.getItem('googleReviews');
        const lastUpdate = localStorage.getItem('lastReviewUpdate');
        const now = new Date().getTime();
        const ONE_DAY = 24 * 60 * 60 * 1000;

        // 如果快取有效且不需要強制更新，則使用快取
        if (!forceRefresh && cachedReviews && lastUpdate && (now - parseInt(lastUpdate)) < ONE_DAY) {
            const reviews = JSON.parse(cachedReviews);
            return filterAndSortReviews(reviews, minRating, maxResults);
        }

        // 顯示載入狀態
        document.dispatchEvent(new CustomEvent('reviewLoadingStart'));
        
        // 使用代理腳本抓取評論
        const response = await fetch('scripts/review-scraper-proxy.php');
        if (!response.ok) {
            throw new Error(`HTTP 錯誤: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        
        if (data.result && data.result.reviews) {
            const reviews = data.result.reviews.map(review => ({
                name: review.author_name,
                date: review.relative_time_description,
                rating: review.rating,
                text: review.text,
                avatar: review.profile_photo_url || getDefaultAvatar(),
                time: review.time
            }));
            
            // 存儲到 localStorage
            localStorage.setItem('googleReviews', JSON.stringify(reviews));
            localStorage.setItem('lastReviewUpdate', now.toString());
            
            // 篩選和排序評論
            const filteredReviews = filterAndSortReviews(reviews, minRating, maxResults);
            
            // 觸發評論載入完成事件
            document.dispatchEvent(new CustomEvent('reviewLoadingComplete', {
                detail: { count: filteredReviews.length }
            }));
            
            return filteredReviews;
        }
        
        return [];
    } catch (error) {
        console.error('抓取 Google 評論失敗:', error);
        document.dispatchEvent(new CustomEvent('reviewLoadingError', {
            detail: { error: error.message }
        }));
        
        // 如果有快取，則在錯誤時使用快取
        const cachedReviews = localStorage.getItem('googleReviews');
        if (cachedReviews) {
            const reviews = JSON.parse(cachedReviews);
            return filterAndSortReviews(reviews, minRating, maxResults);
        }
        
        return [];
    }
}

// 每 24 小時更新一次評論
async function updateReviews() {
    const lastUpdate = localStorage.getItem('lastReviewUpdate');
    const now = new Date().getTime();
    const ONE_DAY = 24 * 60 * 60 * 1000;
    
    if (!lastUpdate || (now - parseInt(lastUpdate)) > ONE_DAY) {
        await fetchGoogleReviews();
    }
}

// 篩選和排序評論
function filterAndSortReviews(reviews, minRating, maxResults) {
    return reviews
        // 篩選評分
        .filter(review => review.rating >= minRating)
        // 按評分和時間排序
        .sort((a, b) => {
            if (a.rating === b.rating) {
                return new Date(b.time) - new Date(a.time);
            }
            return b.rating - a.rating;
        })
        // 限制數量
        .slice(0, maxResults);
}

// 獲取預設頭像
function getDefaultAvatar() {
    const defaultAvatars = [
        "https://images.unsplash.com/photo-1494790108755-2616b612b547?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    ];
    return defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
}

// 自動更新評論
class ReviewUpdater {
    constructor(options = {}) {
        this.options = {
            minRating: options.minRating || 1,
            maxResults: options.maxResults || 10,
            autoUpdate: options.autoUpdate !== false,
            updateInterval: options.updateInterval || 24 * 60 * 60 * 1000 // 24 小時
        };
        
        this.updateTimer = null;
        this.isUpdating = false;
        
        if (this.options.autoUpdate) {
            this.startAutoUpdate();
        }
    }
    
    async update(force = false) {
        if (this.isUpdating) return;
        this.isUpdating = true;
        
        try {
            const reviews = await fetchGoogleReviews({
                ...this.options,
                forceRefresh: force
            });
            
            document.dispatchEvent(new CustomEvent('reviewsUpdated', {
                detail: { reviews }
            }));
            
            return reviews;
        } catch (error) {
            console.error('更新評論失敗:', error);
        } finally {
            this.isUpdating = false;
        }
    }
    
    startAutoUpdate() {
        this.update();  // 初始更新
        
        // 設定定期更新
        this.updateTimer = setInterval(() => {
            this.update();
        }, this.options.updateInterval);
    }
    
    stopAutoUpdate() {
        if (this.updateTimer) {
            clearInterval(this.updateTimer);
            this.updateTimer = null;
        }
    }
}

// 建立全局更新器實例
const reviewUpdater = new ReviewUpdater({
    minRating: 4,          // 只顯示 4 星以上評論
    maxResults: 10,        // 最多顯示 10 則評論
    autoUpdate: true       // 啟用自動更新
});

// 導出函數和實例給其他模組使用
window.scrapeGoogleReviews = fetchGoogleReviews;
window.reviewUpdater = reviewUpdater;

// 監聽評論載入事件
document.addEventListener('reviewLoadingStart', () => {
    console.log('開始載入評論...');
});

document.addEventListener('reviewLoadingComplete', (event) => {
    console.log(`成功載入 ${event.detail.count} 則評論`);
});

document.addEventListener('reviewLoadingError', (event) => {
    console.error('載入評論失敗:', event.detail.error);
});

// 頁面載入時啟動更新器
document.addEventListener('DOMContentLoaded', () => {
    // 檢查是否支援必要的API
    if (!window.fetch || !window.localStorage) {
        console.error('瀏覽器不支援必要的 API');
        return;
    }
    
    // 開始自動更新
    reviewUpdater.startAutoUpdate();
});
