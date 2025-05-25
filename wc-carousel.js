class TextCarousel extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.visibleCount = 3;
      this.current = 0;
      this.shadowRoot.innerHTML = `
        <style>
          /* Import Tailwind CSS */
          @import url('/dist/output.css');
          
          :host {
            display: block;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          #carousel {
            position: relative;
            overflow: hidden;
            padding: 0 60px;
          }
          
          #track {
            display: flex;
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            gap: 24px;
          }
          
          #track ::slotted(*) {
            flex: 0 0 calc((100% - 48px) / 3);
            min-height: 320px;
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
          }
          
          .nav-button:hover {
            background: #f9fafb;
            border-color: #d1d5db;
            color: #374151;
            transform: translateY(-50%) scale(1.05);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          
          .nav-button:active {
            transform: translateY(-50%) scale(0.95);
          }
          
          .nav-button:disabled {
            opacity: 0.4;
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
          
          /* Responsive design */
          @media (max-width: 768px) {
            #carousel {
              padding: 0 50px;
            }
            
            #track ::slotted(*) {
              flex: 0 0 calc((100% - 24px) / 2);
            }
            
            .nav-button {
              width: 40px;
              height: 40px;
              font-size: 16px;
            }
          }
          
          @media (max-width: 640px) {
            #carousel {
              padding: 0 45px;
            }
            
            #track ::slotted(*) {
              flex: 0 0 100%;
            }
            
            #track {
              gap: 16px;
            }
          }
        </style>
        <div id="carousel">
          <button id="prev" class="nav-button" aria-label="Previous slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <div id="track">
            <slot></slot>
          </div>
          <button id="next" class="nav-button" aria-label="Next slide">
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
      this.track = this.shadowRoot.getElementById('track');
      
      // Use a small timeout to ensure slotted content is ready
      setTimeout(() => {
        // Get all direct child div elements (the philosophy cards)
        this.cards = Array.from(this.children).filter(child => child.tagName === 'DIV');
        console.log('Carousel initialized with', this.cards.length, 'cards'); // Debug log
        
        // Ensure we have cards before updating
        if (this.cards.length > 0) {
          this.update();
        }
      }, 100); // Increased timeout to ensure DOM is ready
  
      this.prevBtn.addEventListener('click', () => this.scrollBy(-1));
      this.nextBtn.addEventListener('click', () => this.scrollBy(1));
      
      // Add touch/swipe support
      this.addTouchSupport();
      
      // Auto-resize on window resize
      window.addEventListener('resize', () => this.handleResize());
    }
    
    addTouchSupport() {
      let startX = 0;
      let isDragging = false;
      
      // Touch events for mobile
      this.track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      });
      
      this.track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
      });
      
      this.track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        // Reduced threshold from 50 to 30 pixels for more sensitive touch
        if (Math.abs(diff) > 30) {
          if (diff > 0) {
            this.scrollBy(1);
          } else {
            this.scrollBy(-1);
          }
        }
      });

      // Mouse/trackpad wheel events for desktop
      let wheelTimeout;
      this.track.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        // Clear any existing timeout
        clearTimeout(wheelTimeout);
        
        // Reduced debounce from 50ms to 30ms for more responsive scrolling
        wheelTimeout = setTimeout(() => {
          const deltaX = e.deltaX;
          const deltaY = e.deltaY;
          
          // Use horizontal scroll if available, otherwise use vertical
          const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
          
          // Reduced threshold from 10 to 5 pixels for more sensitive wheel scrolling
          if (Math.abs(delta) > 5) {
            if (delta > 0) {
              this.scrollBy(1);
            } else {
              this.scrollBy(-1);
            }
          }
        }, 30); // Reduced debounce time
      }, { passive: false });

      // Pointer events for mouse dragging (optional enhancement)
      let isPointerDown = false;
      let startPointerX = 0;

      this.track.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse') {
          isPointerDown = true;
          startPointerX = e.clientX;
          this.track.style.cursor = 'grabbing';
          e.preventDefault();
        }
      });

      this.track.addEventListener('pointermove', (e) => {
        if (!isPointerDown || e.pointerType !== 'mouse') return;
        e.preventDefault();
      });

      this.track.addEventListener('pointerup', (e) => {
        if (!isPointerDown || e.pointerType !== 'mouse') return;
        isPointerDown = false;
        this.track.style.cursor = 'grab';
        
        const endPointerX = e.clientX;
        const diff = startPointerX - endPointerX;
        
        // Reduced threshold from 50 to 25 pixels for more sensitive mouse dragging
        if (Math.abs(diff) > 25) {
          if (diff > 0) {
            this.scrollBy(1);
          } else {
            this.scrollBy(-1);
          }
        }
      });

      // Handle pointer leave to reset state
      this.track.addEventListener('pointerleave', () => {
        if (isPointerDown) {
          isPointerDown = false;
          this.track.style.cursor = 'grab';
        }
      });

      // Set initial cursor style
      this.track.style.cursor = 'grab';
    }
    
    handleResize() {
      // Update visible count based on screen size
      const width = window.innerWidth;
      if (width < 640) {
        this.visibleCount = 1;
      } else if (width < 768) {
        this.visibleCount = 2;
      } else {
        this.visibleCount = 3;
      }
      
      this.update();
    }

    scrollBy(delta) {
      // Calculate the maximum scroll position based on actual cards and visible count
      const maxScroll = Math.max(0, this.cards.length - this.visibleCount);
      this.current = Math.max(0, Math.min(this.current + delta, maxScroll));
      this.update();
    }

    update() {
      if (!this.cards || this.cards.length === 0) return;
      
      // Calculate the percentage to move based on individual card movement
      // Each card should move by (100 / visibleCount)% when scrolling
      const cardPercentage = 100 / this.visibleCount;
      const translateX = this.current * cardPercentage;
      
      this.track.style.transform = `translateX(-${translateX}%)`;
      
      // Update button states
      const maxScroll = Math.max(0, this.cards.length - this.visibleCount);
      this.prevBtn.disabled = this.current === 0;
      this.nextBtn.disabled = this.current >= maxScroll;
    }
  }
  
  customElements.define('text-carousel', TextCarousel);
  