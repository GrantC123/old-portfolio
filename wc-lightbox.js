class ImageLightbox extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const img = this.querySelector('.lightbox-trigger');
        const modal = this.querySelector('.modal');
        const closeBtn = this.querySelector('.close-btn');

        img.addEventListener('click', () => {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });

        // Add keyboard support for closing modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }

    render() {
        const imageUrl = this.getAttribute('image') || '';
        const altText = this.getAttribute('alt') || '';
        const caption = this.getAttribute('caption');
        const width = this.getAttribute('width') || 'auto';
        const height = this.getAttribute('height') || 'auto';

        this.innerHTML = `
            <div class="lightbox-container">
                <img 
                    src="${imageUrl}" 
                    alt="${altText}"
                    class="lightbox-trigger cursor-pointer"
                    style="width: ${width}; height: ${height};"
                >
                ${caption ? `
                    <p class="mt-2 text-sm text-gray-600">${caption}</p>
                ` : ''}

                <!-- Modal -->
                <div class="modal hidden fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg z-50 flex items-center justify-center p-4">
                    <button class="close-btn absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img 
                        src="${imageUrl}" 
                        alt="${altText}"
                        class="max-h-[90vh] max-w-[90vw] object-contain"
                    >
                </div>
            </div>
        `;
    }
}

customElements.define('image-lightbox', ImageLightbox); 