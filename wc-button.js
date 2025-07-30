class PrimaryButton extends HTMLElement {
  static get observedAttributes() {
    return ['no-icon', 'href', 'download', 'target'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    const iconSlot = this.shadowRoot.querySelector('slot[name="icon"]');
    if (iconSlot) {
      iconSlot.addEventListener('slotchange', () => this.updateIconState());
      this.updateIconState();
    }
    this.replaceLucideIcons();
  }

  attributeChangedCallback() {
    this.render();
    setTimeout(() => {
      this.updateIconState();
      this.replaceLucideIcons();
    }, 0);
  }

  updateIconState() {
    const iconSlot = this.shadowRoot.querySelector('slot[name="icon"]');
    const assigned = iconSlot && iconSlot.assignedNodes().length > 0;
    const btn = this.shadowRoot.querySelector('.btn');
    if (btn) {
      if (this.hasAttribute('no-icon') || !assigned) {
        btn.classList.remove('has-icon');
      } else {
        btn.classList.add('has-icon');
      }
    }
    // Show/hide the icon span
    const iconSpan = this.shadowRoot.querySelector('.icon');
    if (iconSpan) {
      iconSpan.style.display = (this.hasAttribute('no-icon') || !assigned) ? 'none' : 'inline-block';
    }
  }

  replaceLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({ node: this.shadowRoot });  }  
    }

  render() {
    const href = this.getAttribute('href');
    const download = this.hasAttribute('download');
    const target = this.getAttribute('target') || '_self';
    const tag = href ? 'a' : 'button';
    const downloadAttr = download ? 'download' : '';
    const hrefAttr = href ? `href="${href}"` : '';
    const targetAttr = href ? `target="${target}"` : '';
    this.shadowRoot.innerHTML = `
      <style>
        :host { 
          display: inline-block; 
          position: relative;
        }
        .btn-wrapper {
          position: relative;
          display: inline-block;
        }
        .btn-shadow {
          position: absolute;
          inset: 0;
          background: black;
          border-radius: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .btn {
          background: #53E5F8;
          border: 1px solid #000915;
          border-radius: 0.5rem;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          font-family: 'Syne', Arial, sans-serif;
          font-weight: bold;
          font-size: 18px;
          color: #000915;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
          z-index: 10;
        }
        .btn.has-icon { gap: 0.625rem; }
        .btn-wrapper:hover .btn-shadow { opacity: 1; }
        .btn-wrapper:hover .btn { 
          transform: translate(-12px, -12px);
        }
        .icon { width: 1.5rem; height: 1.5rem; }
        @media (max-width: 600px) {
          .btn { padding: 0.75rem 1rem; font-size: 15px; }
        }
      </style>
      <div class="btn-wrapper">
        <div class="btn-shadow"></div>
        <${tag} class="btn" ${hrefAttr} ${downloadAttr} ${targetAttr}>
          <slot>Button</slot>
          <span class="icon"><slot name="icon"></slot></span>
        </${tag}>
      </div>
    `;
  }
}

customElements.define('primary-button', PrimaryButton); 