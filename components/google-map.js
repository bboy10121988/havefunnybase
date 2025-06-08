class GoogleMap extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .map-embed {
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 47, 67, 0.15);
                    height: 400px;
                    width: 100%;
                }
                
                .map-embed iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                }
                
                @media (max-width: 768px) {
                    .map-embed {
                        height: 300px;
                    }
                }
            </style>
            
            <div class="map-embed">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.8234567890123!2d121.5259307!3d23.6131676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346f532df52c4279%3A0x6e369ae51c5c2117!2z5rW36pS-5L2g5Z-65Zyw!5e0!3m2!1szh-TW!2stw!4v1699999999999!5m2!1szh-TW!2stw"
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        `;
    }
}

customElements.define('google-map', GoogleMap);
