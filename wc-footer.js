// footer-component.js
class MyFooter extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `
            <footer class="bg-purple-900 text-white font-inter">
                <div class="text-center py-8 border-t border-gray-700 px-8 flex justify-between max-w-7xl mx-auto">
                    <span class="text-sm text-white text-shadow-sm">grantcrowderdesign@gmail.com</span>
                    <p class="text-sm text-white text-shadow-sm">&copy; 2025 Grant Crowder Design | Crafted with love <img src="Images/heart.svg" alt="heart" class="w-5 h-5 inline-block drop-shadow-sm drop-shadow-pink-400/50"></p>
                </div>
            </footer>
        `;
    }
}

// Define the new element
customElements.define('my-footer', MyFooter);