class ProjectTile extends HTMLElement {
    constructor() {
        super();
    }
  
    connectedCallback() {
        this.render();
    }
  
    render() {
        const href = this.getAttribute('href') || '#';
        this.innerHTML = `
            <a href="${href}" class="block group">
                <div class="bg-white overflow-hidden rounded-2xl transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-xl">
                    <div class="p-4">    
                        <img 
                            src="${this.getAttribute('image')}" 
                            alt="${this.getAttribute('title')}"
                            class="w-full h-[300px] object-cover rounded-lg"
                        >
                    </div>
                    <div class="p-4">
                        <span class="text-sm text-gray-600">${this.getAttribute('year')}</span>
                        <h3 class="mt-2 mb-2 text-xl sm:text-2xl font-bold">${this.getAttribute('title')}</h3>
                        <p class="text-sm sm:text-base text-gray-700 mb-4">${this.getAttribute('description')}</p>
                        <span class="inline-block bg-white px-3 py-1 rounded-sm text-sm mb-4 border border-gray-200">${this.getAttribute('label')}</span>
                    </div>
                </div>
            </a>
        `;
    }
}
  
customElements.define('project-tile', ProjectTile);
  