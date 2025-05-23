class ImageLightbox extends HTMLElement {        // Define the ImageLightbox class      
    constructor() {   // Define the constructor for the ImageLightbox class
        super();   // Call the constructor of the HTMLElement class
    }

    connectedCallback() {                   // This is the function that is called when the element is connected to the DOM
        this.render();                     // Render the image lightbox this is the html and css for the image lightbox         
        this.setupEventListeners();         // Setup event listeners for the image, modal, and close button
    }

    setupEventListeners() {     // Setup event listeners for the image, modal, and close button
        const img = this.querySelector('.lightbox-trigger'); // Get the image element
        const modal = this.querySelector('.modal'); // Get the modal element
        const closeBtn = this.querySelector('.close-btn'); // Get the close button element

        img.addEventListener('click', () => {    // Add event listener to the image
            modal.classList.remove('hidden'); // Remove the hidden class from the modal
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });

        closeBtn.addEventListener('click', () => {    // Add event listener to the close button element     
            modal.classList.add('hidden'); // Add the hidden class to the modal
            document.body.style.overflow = ''; // Allow scrolling when modal is closed
        });

        modal.addEventListener('click', (e) => {    // Add event listener to the modal
            if (e.target === modal) {   // If the target of the click is the modal
                modal.classList.add('hidden'); // Add the hidden class to the modal
                document.body.style.overflow = ''; // Allow scrolling when modal is closed
            }
        });

        // Add keyboard support for closing modal
        document.addEventListener('keydown', (e) => {        // Add event listener to the document
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) { // If the key pressed is Escape and the modal is not hidden
                modal.classList.add('hidden'); // Add the hidden class to the modal
                document.body.style.overflow = ''; // Allow scrolling when modal is closed
            }
        });
    }

    render() {   // Render the image lightbox this is the html and css for the image lightbox       
        const imageUrl = this.getAttribute('image') || ''; // Get the image url
        const altText = this.getAttribute('alt') || ''; // Get the alt text
        const caption = this.getAttribute('caption'); // Get the caption
        const width = this.getAttribute('width') || 'auto'; // Get the width
        const height = this.getAttribute('height') || 'auto'; // Get the height     

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