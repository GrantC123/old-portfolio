class HorizontalScroll extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          /* Add padding to accommodate shadows and hover effects */
          padding: 20px 0;
        }
        
        #container {
          position: relative;
          padding: 0 60px;
          /* Ensure container doesn't clip shadows */
          overflow: visible;
        }
        
        #scroll-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          overflow-y: visible;
          /* Increased padding to accommodate card shadows and hover effects */
          padding: 40px 0 60px 0;
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f9fafb;
        }
        
        /* Webkit scrollbar styling */
        #scroll-track::-webkit-scrollbar {
          height: 8px;
        }
        
        #scroll-track::-webkit-scrollbar-track {
          background: #f9fafb;
          border-radius: 4px;
        }
        
        #scroll-track::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        
        #scroll-track::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        
        #scroll-track ::slotted(*) {
          flex: 0 0 auto;
          min-width: 320px;
          max-width: 400px;
        }
        
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
          color: #6b7280;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
          opacity: 0.8;
        }
        
        .nav-button:hover {
          background: #f9fafb;
          border-color: #d1d5db;
          color: #374151;
          transform: translateY(-50%) scale(1.05);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          opacity: 1;
        }
        
        .nav-button:active {
          transform: translateY(-50%) scale(0.95);
        }
        
        .nav-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: translateY(-50%);
          background: #f3f4f6;
          border-color: #e5e7eb;
          color: #9ca3af;
        }
        
        .nav-button:disabled:hover {
          transform: translateY(-50%);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        #prev {
          left: 8px;
        }
        
        #next {
          right: 8px;
        }
        
        /* Hide arrows on mobile */
        @media (max-width: 768px) {
          #container {
            padding: 0 20px;
            overflow: visible;
          }
          
          .nav-button {
            display: none;
          }
          
          #scroll-track {
            gap: 16px;
            padding: 30px 0 50px 0;
          }
          
          #scroll-track ::slotted(*) {
            min-width: 280px;
          }
        }
        
        @media (max-width: 640px) {
          #container {
            padding: 0 16px;
            overflow: visible;
          }
          
          #scroll-track {
            padding: 20px 0 40px 0;
          }
          
          #scroll-track ::slotted(*) {
            min-width: 260px;
          }
        }
      </style>
      <div id="container">
        <button id="prev" class="nav-button" aria-label="Scroll left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        <div id="scroll-track">
          <slot></slot>
        </div>
        <button id="next" class="nav-button" aria-label="Scroll right">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
    `;
  }

  connectedCallback() {
    this.prevBtn = this.shadowRoot.getElementById('prev');
    this.nextBtn = this.shadowRoot.getElementById('next');
    this.scrollTrack = this.shadowRoot.getElementById('scroll-track');
    
    // Check if arrows should be shown
    this.showArrows = this.getAttribute('show-arrows') !== 'false';
    
    if (!this.showArrows) {
      this.prevBtn.style.display = 'none';
      this.nextBtn.style.display = 'none';
      this.shadowRoot.getElementById('container').style.padding = '0 20px';
    }
    
    // Add event listeners
    this.prevBtn.addEventListener('click', () => this.scrollLeft());
    this.nextBtn.addEventListener('click', () => this.scrollRight());
    
    // Update button states on scroll
    this.scrollTrack.addEventListener('scroll', () => this.updateButtons());
    
    // Initial button state
    setTimeout(() => this.updateButtons(), 100);
    
    // Add touch/wheel support
    this.addInteractionSupport();
    
    // Update on resize
    window.addEventListener('resize', () => this.updateButtons());
  }
  
  scrollLeft() {
    const scrollAmount = this.getScrollAmount();
    // Use smooth scrolling for button clicks
    this.scrollTrack.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }
  
  scrollRight() {
    const scrollAmount = this.getScrollAmount();
    // Use smooth scrolling for button clicks
    this.scrollTrack.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
  
  getScrollAmount() {
    // Scroll by approximately one card width
    const cardWidth = 320; // Base card width
    const gap = 24; // Gap between cards
    return cardWidth + gap;
  }
  
  updateButtons() {
    if (!this.showArrows) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = this.scrollTrack;
    
    // Update prev button
    this.prevBtn.disabled = scrollLeft <= 0;
    
    // Update next button (with small tolerance for rounding)
    this.nextBtn.disabled = scrollLeft >= scrollWidth - clientWidth - 1;
  }
  
  addInteractionSupport() {
    // Enhanced wheel support for horizontal scrolling
    this.scrollTrack.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      // Handle both horizontal and vertical wheel events
      // Mac trackpads often send deltaY even for horizontal gestures
      let delta = 0;
      
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Primarily horizontal scroll
        delta = e.deltaX;
      } else if (e.shiftKey) {
        // Shift + vertical scroll = horizontal scroll
        delta = e.deltaY;
      } else {
        // Convert vertical scroll to horizontal for better Mac trackpad support
        delta = e.deltaY;
      }
      
      // Apply scroll directly for immediate response
      this.scrollTrack.scrollLeft += delta;
      
      // Update button states after scroll
      this.updateButtons();
    }, { passive: false });
    
    // Touch support for mobile
    let startX = 0;
    let scrollStart = 0;
    let isDragging = false;
    
    this.scrollTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      scrollStart = this.scrollTrack.scrollLeft;
      isDragging = true;
    });
    
    this.scrollTrack.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;
      this.scrollTrack.scrollLeft = scrollStart + diff;
    });
    
    this.scrollTrack.addEventListener('touchend', () => {
      isDragging = false;
    });
  }
}

customElements.define('horizontal-scroll', HorizontalScroll); 