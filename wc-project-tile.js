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
            <a href="${href}" class="block">
                <div class="relative group w-full h-full">
                    <div class="absolute inset-0 z-0 pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100 bg-black rounded-xl border border-gray-900 "></div>
                    <div class="relative z-10 bg-white overflow-hidden border border-gray-900 rounded-xl transition-transform duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3">
                        <div>    
                            <img 
                                src="${this.getAttribute('image')}" 
                                alt="${this.getAttribute('title')}"
                                class="w-full h-[300px] object-cover"
                            >
                        </div>
                        <div class="p-4">
                            <span class="text-sm text-gray-600">${this.getAttribute('year')}</span>
                            <h3 class="mt-2 mb-2 text-xl sm:text-2xl font-bold">${this.getAttribute('title')}</h3>
                            <p class="text-sm sm:text-base text-gray-700 mb-4">${this.getAttribute('description')}</p>
                            <span class="inline-block px-3 py-1 text-xs font-semibold bg-coral-800 text-coral-100 rounded">${this.getAttribute('label')}</span>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }
}
  
customElements.define('project-tile', ProjectTile);
  