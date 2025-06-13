class GoogleReviewsUpdater extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // 從 localStorage 獲取已保存的評論，如果沒有則使用空陣列
        const savedReviews = localStorage.getItem('googleReviews');
        const reviews = savedReviews ? JSON.parse(savedReviews) : [];
        
        // 渲染工具介面
        this.innerHTML = `
            <style>
                .reviews-updater {
                    padding: 2rem;
                    background-color: #f8f9fa;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    margin: 2rem 0;
                }
                
                .reviews-updater h2 {
                    color: var(--primary-color);
                    margin-bottom: 1rem;
                }
                
                .form-group {
                    margin-bottom: 1.25rem;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: #333;
                }
                
                .form-control {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 1rem;
                }
                
                textarea.form-control {
                    min-height: 120px;
                    resize: vertical;
                }
                
                .rating-select {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .star-btn {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #ddd;
                    cursor: pointer;
                    transition: color 0.2s ease;
                }
                
                .star-btn.active {
                    color: #ffc107;
                }
                
                .btn {
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 6px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                
                .btn:hover {
                    background-color: var(--secondary-color);
                }
                
                .btn-danger {
                    background-color: #dc3545;
                }
                
                .btn-danger:hover {
                    background-color: #c82333;
                }
                
                .reviews-list {
                    margin-top: 2rem;
                }
                
                .review-item {
                    background-color: white;
                    border-radius: 8px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                }
                
                .review-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.75rem;
                }
                
                .reviewer-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-right: 1rem;
                }
                
                .reviewer-info h4 {
                    margin: 0;
                    font-size: 1rem;
                }
                
                .review-date {
                    color: #666;
                    font-size: 0.85rem;
                    margin-top: 0.25rem;
                }
                
                .review-rating {
                    color: #ffc107;
                    margin-bottom: 0.5rem;
                }
                
                .review-text {
                    color: #444;
                    margin-bottom: 0.75rem;
                }
                
                .action-buttons {
                    text-align: right;
                }
                
                .help-text {
                    font-size: 0.85rem;
                    color: #666;
                    margin-bottom: 1.5rem;
                }
                
                .save-btn {
                    margin-top: 1rem;
                    background-color: var(--secondary-color);
                }
                
                .save-btn:hover {
                    background-color: #1a5c8a;
                }
                
                .export-container {
                    margin-top: 1.5rem;
                }
                
                .code-output {
                    background-color: #f5f5f5;
                    border-radius: 6px;
                    padding: 1rem;
                    margin-top: 1rem;
                    white-space: pre-wrap;
                    font-family: monospace;
                    max-height: 300px;
                    overflow-y: auto;
                    border: 1px solid #ddd;
                }
                
                .default-avatars {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }
                
                .avatar-option {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 2px solid transparent;
                    cursor: pointer;
                    object-fit: cover;
                }
                
                .avatar-option.selected {
                    border-color: var(--primary-color);
                }
                
                /* 響應式設計 */
                @media (max-width: 768px) {
                    .reviews-updater {
                        padding: 1.5rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .reviews-updater {
                        padding: 1rem;
                    }
                }
            </style>
            
            <div class="reviews-updater">
                <h2>Google 評論管理工具</h2>
                
                <p class="help-text">
                    使用此工具可以收集真實的 Google 評論，並將它們顯示在您的網站上。從 Google 地圖上複製評論內容，填寫以下表單後點擊新增。
                </p>
                
                <div class="form-group">
                    <label for="reviewer-name">評論者姓名</label>
                    <input type="text" id="reviewer-name" class="form-control" placeholder="例如：王小明">
                </div>
                
                <div class="form-group">
                    <label for="review-date">評論時間</label>
                    <input type="text" id="review-date" class="form-control" placeholder="例如：1 個月前">
                </div>
                
                <div class="form-group">
                    <label>評分星級</label>
                    <div class="rating-select">
                        <button type="button" class="star-btn" data-rating="1">★</button>
                        <button type="button" class="star-btn" data-rating="2">★</button>
                        <button type="button" class="star-btn" data-rating="3">★</button>
                        <button type="button" class="star-btn" data-rating="4">★</button>
                        <button type="button" class="star-btn" data-rating="5">★</button>
                        <span id="current-rating">0</span>/5
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="reviewer-avatar">頭像圖片</label>
                    <input type="text" id="reviewer-avatar" class="form-control" placeholder="圖片 URL 或選擇下方預設頭像">
                    
                    <div class="default-avatars" id="avatar-options">
                        <!-- 預設頭像選項將由 JavaScript 生成 -->
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="review-text">評論內容</label>
                    <textarea id="review-text" class="form-control" placeholder="從 Google 複製評論內容貼到這裡"></textarea>
                </div>
                
                <button type="button" id="add-review-btn" class="btn">新增評論</button>
                
                <div class="reviews-list" id="reviews-container">
                    <!-- 評論列表將由 JavaScript 生成 -->
                </div>
                
                <button type="button" id="save-reviews-btn" class="btn save-btn">保存所有評論</button>
                
                <div class="export-container">
                    <button type="button" id="export-btn" class="btn">匯出 HTML 代碼</button>
                    <div class="code-output" id="export-output" style="display: none;"></div>
                </div>
            </div>
        `;
        
        // 加載預設頭像
        const defaultAvatars = [
            'https://images.unsplash.com/photo-1494790108755-2616b612b547?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80'
        ];
        
        const avatarOptionsContainer = this.querySelector('#avatar-options');
        
        defaultAvatars.forEach((avatarUrl, index) => {
            const avatarImg = document.createElement('img');
            avatarImg.src = avatarUrl;
            avatarImg.alt = `預設頭像 ${index + 1}`;
            avatarImg.className = 'avatar-option';
            avatarImg.dataset.url = avatarUrl;
            
            avatarImg.addEventListener('click', () => {
                // 移除之前選中的頭像
                this.querySelectorAll('.avatar-option').forEach(img => {
                    img.classList.remove('selected');
                });
                
                // 標記當前選中的頭像
                avatarImg.classList.add('selected');
                
                // 更新頭像 URL 輸入框
                this.querySelector('#reviewer-avatar').value = avatarUrl;
            });
            
            avatarOptionsContainer.appendChild(avatarImg);
        });
        
        // 初始化星級評分
        let currentRating = 0;
        const ratingButtons = this.querySelectorAll('.star-btn');
        const currentRatingText = this.querySelector('#current-rating');
        
        ratingButtons.forEach(button => {
            button.addEventListener('click', () => {
                const rating = parseInt(button.dataset.rating);
                currentRating = rating;
                currentRatingText.textContent = rating;
                
                // 更新星級按鈕顯示
                ratingButtons.forEach((btn, index) => {
                    if (index < rating) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            });
        });
        
        // 新增評論
        const addReviewBtn = this.querySelector('#add-review-btn');
        addReviewBtn.addEventListener('click', () => {
            const name = this.querySelector('#reviewer-name').value.trim();
            const date = this.querySelector('#review-date').value.trim();
            const avatar = this.querySelector('#reviewer-avatar').value.trim();
            const text = this.querySelector('#review-text').value.trim();
            
            // 驗證輸入
            if (!name) {
                alert('請輸入評論者姓名');
                return;
            }
            
            if (!date) {
                alert('請輸入評論時間');
                return;
            }
            
            if (currentRating === 0) {
                alert('請選擇評分星級');
                return;
            }
            
            if (!text) {
                alert('請輸入評論內容');
                return;
            }
            
            // 創建評論對象
            const review = {
                name,
                date,
                rating: currentRating,
                avatar: avatar || defaultAvatars[0], // 如果沒有頭像，使用第一個預設頭像
                text
            };
            
            // 添加到評論數組
            reviews.push(review);
            
            // 更新顯示
            renderReviews(reviews);
            
            // 清空輸入
            this.querySelector('#reviewer-name').value = '';
            this.querySelector('#review-date').value = '';
            this.querySelector('#reviewer-avatar').value = '';
            this.querySelector('#review-text').value = '';
            
            // 重置星級
            currentRating = 0;
            currentRatingText.textContent = '0';
            ratingButtons.forEach(btn => btn.classList.remove('active'));
        });
        
        // 保存評論到 localStorage
        const saveReviewsBtn = this.querySelector('#save-reviews-btn');
        saveReviewsBtn.addEventListener('click', () => {
            localStorage.setItem('googleReviews', JSON.stringify(reviews));
            alert('評論已保存！');
        });
        
        // 匯出 HTML 代碼
        const exportBtn = this.querySelector('#export-btn');
        const exportOutput = this.querySelector('#export-output');
        
        exportBtn.addEventListener('click', () => {
            if (reviews.length === 0) {
                alert('沒有評論可匯出');
                return;
            }
            
            // 計算平均評分
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = (totalRating / reviews.length).toFixed(1);
            
            // 生成評論卡片 HTML
            let reviewCardsHTML = '';
            reviews.forEach(review => {
                // 根據評分生成星星
                const fullStars = review.rating;
                const emptyStars = 5 - fullStars;
                let starsHTML = '';
                
                for (let i = 0; i < fullStars; i++) {
                    starsHTML += '<i class="fas fa-star"></i>';
                }
                
                for (let i = 0; i < emptyStars; i++) {
                    starsHTML += '<i class="far fa-star"></i>';
                }
                
                reviewCardsHTML += `
<div class="review-card">
    <div class="review-header">
        <img src="${review.avatar}" alt="${review.name}" class="reviewer-avatar">
        <div class="reviewer-info">
            <h4>${review.name}</h4>
            <p class="review-date">${review.date}</p>
        </div>
    </div>
    <div class="review-rating">
        ${starsHTML}
    </div>
    <p class="review-text">${review.text}</p>
    <a href="https://www.google.com/maps/place/%E6%B5%B7%E6%94%BE%E4%BD%A0%E5%9F%BA%E5%9C%B0+Have+Funny+Base/@23.6131676,121.5259307,17z/" target="_blank" class="view-on-google">
        <i class="fab fa-google"></i>
        View on Google
    </a>
</div>`;
            });
            
            // 生成完整的評論區塊 HTML
            const completeHTML = `
<div class="reviews-header">
    <div class="google-logo">
        <i class="fab fa-google"></i>
        <span>Google 評論</span>
    </div>
    <h2>顧客真實評價</h2>
    <div class="overall-rating">
        <span class="rating-score">${averageRating}</span>
        <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
        </div>
        <span class="total-reviews">基於 ${reviews.length} 則評論</span>
    </div>
</div>

<div class="reviews-masonry">
${reviewCardsHTML}
</div>`;
            
            // 顯示代碼
            exportOutput.textContent = completeHTML;
            exportOutput.style.display = 'block';
        });
        
        // 初始渲染評論
        renderReviews(reviews);
        
        // 渲染評論列表
        function renderReviews(reviewsArray) {
            const reviewsContainer = document.querySelector('#reviews-container');
            reviewsContainer.innerHTML = '';
            
            if (reviewsArray.length === 0) {
                reviewsContainer.innerHTML = '<p>尚未添加任何評論</p>';
                return;
            }
            
            reviewsArray.forEach((review, index) => {
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review-item';
                
                // 根據評分生成星星
                const fullStars = review.rating;
                const emptyStars = 5 - fullStars;
                let starsHTML = '';
                
                for (let i = 0; i < fullStars; i++) {
                    starsHTML += '★';
                }
                
                for (let i = 0; i < emptyStars; i++) {
                    starsHTML += '☆';
                }
                
                reviewElement.innerHTML = `
                    <div class="review-header">
                        <img src="${review.avatar}" alt="${review.name}" class="reviewer-avatar">
                        <div class="reviewer-info">
                            <h4>${review.name}</h4>
                            <p class="review-date">${review.date}</p>
                        </div>
                    </div>
                    <div class="review-rating">
                        ${starsHTML}
                    </div>
                    <p class="review-text">${review.text}</p>
                    <div class="action-buttons">
                        <button type="button" class="btn btn-danger delete-review" data-index="${index}">刪除</button>
                    </div>
                `;
                
                reviewsContainer.appendChild(reviewElement);
            });
            
            // 添加刪除按鈕事件
            document.querySelectorAll('.delete-review').forEach(button => {
                button.addEventListener('click', () => {
                    const index = parseInt(button.dataset.index);
                    reviewsArray.splice(index, 1);
                    renderReviews(reviewsArray);
                });
            });
        }
    }
}

customElements.define('google-reviews-updater', GoogleReviewsUpdater);
