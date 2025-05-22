console.log('Breadcrumb component script loading...');

if (typeof HTMLElement !== 'undefined') {
    console.log('HTMLElement is defined, creating Breadcrumb component...');
    
    class Breadcrumb extends HTMLElement {
        constructor() {
            super();
        }
      
        connectedCallback() {
            this.render();
        }
      
        render() {
            const projectName = this.getAttribute('project-name') || '';
            
            this.innerHTML = `
                <nav class="mx-auto px-8 py-4">
                    <div class="">
                        <ol class="list-none p-0 m-0 flex items-center mx-auto max-w-7xl">
                            <li><a href="index.html" class="no-underline text-gray-500 hover:text-purple-600 transition-colors duration-300">Home</a></li>
                            <li class="mx-2 text-gray-200">/</li>
                            <li><a href="index.html#project-section" class="no-underline text-gray-500 hover:text-purple-600 transition-colors duration-300">Work</a></li>
                            <li class="mx-2 text-gray-200">/</li>
                            <li><span class="text-gray-900">${projectName}</span></li>
                        </ol>
                    </div>
                </nav>
            `;
        }
    }
      
    // Only define the custom element if it hasn't been defined yet
    if (!customElements.get('my-breadcrumb')) {
        console.log('Defining breadcrumb custom element...');
        customElements.define('my-breadcrumb', Breadcrumb);
        console.log('Breadcrumb custom element defined successfully');
    } else {
        console.log('Breadcrumb custom element already defined');
    }
} else {
    console.error('HTMLElement is not defined - cannot create Breadcrumb component');
}
  