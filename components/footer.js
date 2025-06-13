class AppFooter extends HTMLElement {
  constructor() {
    super();
    
    // 載入 EmailJS SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    document.head.appendChild(script);

    script.onload = () => {
      emailjs.init("RaXYVegN1cwR8GKMH");
    };
  }

  connectedCallback() {
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(fontAwesomeLink);

    this.innerHTML = `
      <style>
        .site-footer {
          background-color: #002F43; /* 更新背景色為 #002F43 */
          color: #fff;
          padding: 3rem 0;
          margin-top: 4rem;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          padding: 0 1rem;
        }
        .footer-section {
          display: flex;
          flex-direction: column;
        }
        .footer-section h4 {
          color: #fff;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        
        .footer-section:last-child h4 {
          margin-top: 0.5rem; /* 為追蹤我們標題增加上方間距 */
        }
        
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-links li {
          margin-bottom: 0.5rem;
        }
        .footer-links a {
          color: #fff;
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-links a:hover {
          color: #0066cc;
        }
        .contact-info {
          margin-top: 1rem;
        }
        .contact-info p {
          margin: 0.5rem 0;
        }
        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem; /* 增加社群連結的上方間距 */
        }
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          color: #fff;
          font-size: 1.5rem;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .social-link:hover {
          background: #1976D2;
          transform: translateY(-3px);
          text-decoration: none;
        }
        .copyright {
          text-align: center;
          padding-top: 2rem;
          margin-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        /* 聯繫表單區塊樣式 */
        .contact-form-section {
          background-color: #fff;
          padding: 4rem 0;
          margin-bottom: 0;
        }

        .contact-form-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .contact-form-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .contact-form-header h2 {
          color: #002F43;
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .contact-form-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .contact-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: #002F43;
          outline: none;
        }

        .contact-form textarea {
          height: 150px;
          resize: vertical;
        }

        .submit-button {
          grid-column: 1 / -1;
          background-color: #002F43;
          color: #fff;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .submit-button:hover {
          background-color: #004c6d;
        }

        @media (max-width: 768px) {
          .contact-form {
            grid-template-columns: 1fr;
          }
        }

        /* 手機版響應式設計 */
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr 1fr; /* 第一排：關於海放你、立即預約 */
            gap: 1.5rem;
            text-align: center;
          }
          
          .footer-section:nth-child(3) { /* 聯絡資訊 */
            grid-column: 1 / -1; /* 占滿整個寬度 */
          }
          
          .footer-section:nth-child(4) { /* 追蹤我們 */
            grid-column: 1 / -1; /* 占滿整個寬度 */
          }
          
          .footer-section h4 {
            font-size: 1.1rem;
            margin-bottom: 0.8rem;
          }
          
          .footer-section:last-child h4 {
            margin-top: 1rem;
          }
          
          .social-links {
            justify-content: center;
            margin-top: 1.2rem;
            margin-bottom: 2rem; /* 增加下方間距 */
          }
          
          .copyright {
            padding-top: 1.5rem;
            margin-top: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .footer-content {
            padding: 0 0.5rem;
            gap: 1rem;
          }
          
          .footer-section h4 {
            font-size: 1rem;
          }
          
          .social-link {
            width: 35px;
            height: 35px;
            font-size: 1.3rem;
          }
          
          .social-links {
            margin-bottom: 2.5rem; /* 超小螢幕增加更多下方間距 */
          }
        }
      </style>

      <!-- 聯繫表單區塊 -->
      <section class="contact-form-section" id="contact">
        <div class="contact-form-container">
          <div class="contact-form-header">
            <h2>聯繫我們</h2>
            <p>有任何問題或建議，歡迎填寫以下表單與我們聯繫</p>
          </div>
          <form class="contact-form" id="contactForm">
            <div class="form-group">
              <input type="text" id="name" name="name" placeholder="您的姓名" required>
            </div>
            <div class="form-group">
              <input type="tel" id="phone" name="phone" placeholder="聯絡電話" required>
            </div>
            <div class="form-group">
              <input type="email" id="email" name="email" placeholder="電子郵件" required>
            </div>
            <div class="form-group">
              <input type="text" id="subject" name="subject" placeholder="主旨" required>
            </div>
            <div class="form-group full-width">
              <textarea id="message" name="message" placeholder="請輸入您的訊息" required></textarea>
            </div>
            <button type="submit" class="submit-button">送出訊息</button>
          </form>
        </div>
      </section>

      <!-- 原有的 footer -->
      <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">          <h4>關於海放你</h4>
          <ul>
            <li><a href="intro.html">海放你介紹</a></li>
            <li><a href="location.html">海放你基地</a></li>
            <li><a href="plan.html">海放計畫</a></li>
            <li><a href="kids-camp.html">海放兒童營隊</a></li>
            <li><a href="shop.html">海放商城</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>立即預約</h4>
          <ul>
            <li><a href="location.html#booking">預約營位</a></li>
            <li><a href="social.html">報名聯誼</a></li>
            <li><a href="kids-camp.html#signup">報名營隊</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>聯絡資訊</h4>
          <ul class="contact-info">
            <li><i class="fas fa-building"></i> 海放你基地活動有限公司</li>
            <li><i class="fas fa-phone"></i> 預約專線：0979116598</li>
            <li><i class="fas fa-envelope"></i> Email：havefunnybase@gmail.com</li>
            <li><i class="fas fa-map-marker-alt"></i> 花蓮營區：977004花蓮縣豐濱鄉永豐路11-5號</li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>追蹤我們</h4>
          <div class="social-links">
            <a href="https://www.facebook.com/Havefunnybase/" class="social-link" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/havefunnybase/" class="social-link" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="https://line.me/R/ti/p/@havefunnybase" class="social-link" target="_blank"><i class="fab fa-line"></i></a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 海放你露營生活體驗. All rights reserved.</p>
      </div>
    </div>
  </footer>
    `;

    // 添加表單提交處理
    const form = this.querySelector('#contactForm');
    const submitButton = form.querySelector('.submit-button');
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // 禁用提交按鈕並顯示載入狀態
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 發送中...';
      
      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // 使用 EmailJS 發送郵件
        await emailjs.send(
          'service_xxxxxxx', // EmailJS service ID
          'template_xxxxxxx', // EmailJS template ID
          {
            to_email: 'textsece.ai@gmail.com',
            from_name: data.name,
            phone: data.phone,
            from_email: data.email,
            subject: data.subject,
            message: data.message
          }
        );
        
        // 顯示成功訊息
        submitButton.innerHTML = '<i class="fas fa-check"></i> 發送成功！';
        submitButton.style.backgroundColor = '#28a745';
        form.reset();
        
        // 3秒後重置按鈕
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = '送出訊息';
          submitButton.style.backgroundColor = '';
        }, 3000);
        
      } catch (error) {
        console.error('發送失敗:', error);
        submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 發送失敗';
        submitButton.style.backgroundColor = '#dc3545';
        
        // 3秒後重置按鈕
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = '送出訊息';
          submitButton.style.backgroundColor = '';
        }, 3000);
      }
    });
  }
}

customElements.define('app-footer', AppFooter);
