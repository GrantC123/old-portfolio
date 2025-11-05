class ProjectTile extends HTMLElement {
    constructor() {
        super();
    }
  
    connectedCallback() {
        this.render();
    }
  
    render() {
        const href = this.getAttribute('href') || '#';
        const image = this.getAttribute('image');
        const title = this.getAttribute('title');
        const description = this.getAttribute('description');
        const year = this.getAttribute('year');
        const label = this.getAttribute('label');
        const category = this.getAttribute('category') || '';
        this.innerHTML = `
            <a href="${href}" class="block group relative w-full">
                <!-- Mobile: Vertical Stack, Desktop: Horizontal Layout -->
                <div class="bg-zinc-800 border border-zinc-500 rounded-lg w-full overflow-hidden 
                           flex flex-col md:flex-row 
                           h-auto md:h-[399px]">
                    
                    <!-- Image Section -->
                    <div class="w-full md:w-1/2 h-[232px] md:h-full relative">
                        <img 
                            src="${image}" 
                            alt="${title}"
                            class="w-full h-full object-cover"
                        >
                    </div>
                    
                    <!-- Content Section -->
                    <div class="w-full md:w-1/2 h-full flex flex-col justify-between 
                               p-8 md:p-12">
                        <div class="flex flex-col gap-5">
                            <!-- Category Label -->
                            <p class="text-zinc-400 text-base font-bold uppercase tracking-wider font-inter">
                                ${category}
                            </p>
                            
                            <!-- Title - Smaller on mobile, larger on desktop -->
                            <h3 class="text-white font-bold font-syne leading-9 md:leading-10
                                      text-3xl md:text-4xl">
                                ${title}
                            </h3>
                            
                            <!-- Description -->
                            <p class="text-zinc-400 text-base leading-6 font-inter line-clamp-3">
                                ${description}
                            </p>
                        </div>
                        
                        <!-- Button - Full width on mobile, bottom-right on desktop -->
                        <div class="flex w-full mt-6 md:mt-0 
                                   justify-center md:justify-end">
                            <div class="border-2 border-cyan-400 flex items-center gap-3 
                                       px-6 py-4 rounded-lg transition-all duration-300 
                                       group-hover:bg-cyan-400 
                                       w-full md:w-fit">
                                <span class="text-white font-bold text-base font-syne group-hover:text-black transition-colors duration-300">
                                    View Project
                                </span>
                                <svg class="w-6 h-6 text-white group-hover:text-black transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }
}
  
customElements.define('project-tile', ProjectTile);
  