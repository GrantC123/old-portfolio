class ProjectImageFull extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const imageUrl = this.getAttribute('image') || '';
        const altText = this.getAttribute('alt') || '';
        const caption = this.getAttribute('caption');

        this.innerHTML = `
            <div class="w-full">
                <figure class="w-full">
                    <img 
                        src="${imageUrl}" 
                        alt="${altText}"
                        class="w-full h-[400px] md:h-[600px] object-cover"
                    >
                    ${caption ? `
                        <div class="max-w-7xl mx-auto px-6">
                            <figcaption class="mt-4 text-center text-gray-600 text-sm">
                                ${caption}
                            </figcaption>
                        </div>
                    ` : ''}
                </figure>
            </div>
        `;
    }
}

customElements.define('project-image-full', ProjectImageFull);