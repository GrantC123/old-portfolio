class ProjectOverview extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const timeline = this.getAttribute('timeline') || '';
        const tools = this.getAttribute('tools') || '';
        const client = this.getAttribute('client') || '' ;
        const output = this.getAttribute('output') || '';
        const role = this.getAttribute('role') || '';
        this.innerHTML = `
            <div class="project-overview bg-white rounded-lg shadow-sm p-6 my-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-6">Project Overview</h2>
                <dl class="grid grid-cols-1 gap-6 md:grid-cols-2">

                    <div class="overview-item">
                        <dt class="text-sm font-medium text-purple-600">Role</dt>
                        <dd class="mt-1 text-base text-gray-900">${role}</dd>
                    </div>
                
                    <div class="overview-item">
                        <dt class="text-sm font-medium text-purple-600">Timeline</dt>
                        <dd class="mt-1 text-base text-gray-900">${timeline}</dd>
                    </div>
                    <div class="overview-item">
                        <dt class="text-sm font-medium text-purple-600">Tools</dt>
                        <dd class="mt-1 text-base text-gray-900">${tools}</dd>
                    </div>
                    <div class="overview-item">
                        <dt class="text-sm font-medium text-purple-600">Client</dt>
                        <dd class="mt-1 text-base text-gray-900">${client}</dd>
                    </div>
                    <div class="overview-item">
                        <dt class="text-sm font-medium text-purple-600">Output</dt>
                        <dd class="mt-1 text-base text-gray-900">${output}</dd>
                    </div>
                </dl>
            </div>
        `;
    }
}

customElements.define('project-overview', ProjectOverview); 