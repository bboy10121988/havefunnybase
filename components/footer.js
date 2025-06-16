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

      <!-- 原有的 footer -->
      <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">          <h4>關於海放你</h4>
          <ul>
            <li><a href="intro.html">海放你介紹</a></li>
            <li><a href="rental.html">海放你基地</a></li>
            <li><a href="plan.html">海放計畫</a></li>
            <li><a href="kids-camp.html">海放兒童營隊</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>立即預約</h4>
          <ul>
            <li><a href="rental.html">海放你基地</a></li>
            <li><a href="plan.html">海放計畫</a></li>
            <li><a href="kids-camp.html">海放兒童營隊</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>聯絡資訊</h4>
          <ul class="contact-info">
            <li><i class="fas fa-building"></i> 海放你基地活動有限公司</li>
            <li><i class="fas fa-phone"></i> 預約專線：0979116598</li>
            <li><i class="fas fa-envelope"></i> Email：<a href="mailto:havefunnybase@gmail.com" style="color: #fff; text-decoration: none;">havefunnybase@gmail.com</a></li>
            <li><i class="fas fa-map-marker-alt"></i> 花蓮營區：<a href="https://www.google.com/maps/place/%E6%B5%B7%E6%94%BE%E4%BD%A0%E5%9F%BA%E5%9C%B0+Have+Funny+Base/@23.6131676,121.5285056,850m/data=!3m2!1e3!4b1!4m9!3m8!1s0x346f532df52c4279:0x6e369ae51c5c2117!5m2!4m1!1i2!8m2!3d23.6131676!4d121.5285056!16s%2Fg%2F11pvc3kn3z?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" style="color: #fff; text-decoration: none;">977004花蓮縣豐濱鄉永豐路11-5號</a></li>
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
  }
}

customElements.define('app-footer', AppFooter);
