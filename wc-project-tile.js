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
            <a href="${href}" class="block h-full group relative">
                <div class="absolute inset-0 z-0 pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100 bg-black rounded-2xl border border-gray-900"></div>
                <div class="relative z-10 bg-white overflow-hidden border border-gray-900 rounded-2xl transition-transform duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3 h-full flex flex-col">
                    <div class="flex flex-col md:flex-row bg-white overflow-hidden w-full h-full">
                        <div class="w-full md:w-1/2 h-[320px] md:h-[400px] flex-shrink-0">
                            <img 
                                src="${image}" 
                                alt="${title}"
                                class="w-full h-full object-cover object-center rounded-t-2xl md:rounded-t-none md:rounded-l-2xl md:rounded-r-none"
                            >
                        </div>
                        <div class="w-full md:w-1/2 flex flex-col justify-between p-8 gap-8 rounded-b-2xl md:rounded-b-none md:rounded-r-2xl">
                            <div class="flex flex-col gap-5">
                                <span class="uppercase text-[#606060] text-[16px] tracking-wider font-bold" style="font-family: Roboto, Arial, sans-serif;">${category}</span>
                                <h3 class="font-syne font-bold text-[32px] leading-[1.15] text-[#011205]">${title}</h3>
                                <p class="text-[#606060] text-[16px] leading-6 tracking-wide font-roboto">${description}</p>
                            </div>
                            <div class="flex flex-col gap-4 items-start">
                                <span class="rounded bg-[#001a1f] text-[#b9f3fa] uppercase text-[16px] tracking-wider font-semibold px-4 py-2">${label}</span>
                                <span class="inline-flex items-center gap-2 font-bold text-[#011205] text-[16px] tracking-wide cursor-pointer group-hover:underline">
                                    View Project
                                    <svg class="w-6 h-6" fill="none" stroke="#011205" stroke-width="2" viewBox="0 0 17 14"><path d="M9.29 13.69C9.49 13.88 9.74 13.98 10 13.98V14C10.25 14 10.5 13.91 10.7 13.71L16.71 7.71C16.89 7.52 17 7.27 17 7C17 6.73 16.9 6.48 16.71 6.29L10.7 0.29C10.31 -0.1 9.68 -0.1 9.29 0.29C8.9 0.68 8.9 1.31 9.29 1.7L13.59 6H1C0.45 6 0 6.45 0 7C0 7.55 0.45 8 1 8H13.58L9.29 12.28C8.9 12.67 8.9 13.3 9.29 13.69Z" fill="#011205"/></svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }
}
  
customElements.define('project-tile', ProjectTile);
  