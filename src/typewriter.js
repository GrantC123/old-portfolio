document.addEventListener('DOMContentLoaded', function() {
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        // Store the original content
        const originalContent = typewriter.innerHTML;
        typewriter.innerHTML = '';

        // Split content into words while preserving HTML structure
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalContent;

        const words = [];
        
        function processNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                // Split text nodes into words and filter out empty strings
                const textWords = node.textContent.trim().split(/\s+/).filter(word => word.length > 0);
                textWords.forEach(word => {
                    words.push({
                        text: word,
                        isHTML: false
                    });
                });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === 'SPAN') {
                    // Keep the entire span as one piece
                    words.push({
                        text: node.outerHTML,
                        isHTML: true
                    });
                } else {
                    // Process child nodes
                    Array.from(node.childNodes).forEach(child => processNode(child));
                }
            }
        }

        // Process all nodes
        Array.from(tempDiv.childNodes).forEach(node => processNode(node));

        // Add words one by one
        let currentIndex = 0;
        const container = document.createElement('div');
        container.className = 'typewriter-container';
        typewriter.appendChild(container);
        
        function addNextWord() {
            if (currentIndex < words.length) {
                const word = words[currentIndex];
                const wrapper = document.createElement('span');
                
                if (word.isHTML) {
                    wrapper.innerHTML = word.text;
                } else {
                    wrapper.className = 'typewriter-word';
                    wrapper.textContent = word.text;
                }
                
                container.appendChild(wrapper);
                // Add a space after each word (except the last one)
                if (currentIndex < words.length - 1) {
                    const space = document.createElement('span');
                    space.className = 'typewriter-space';
                    space.innerHTML = '&nbsp;';
                    container.appendChild(space);
                }
                
                currentIndex++;
                setTimeout(addNextWord, 150);
            }
        }

        // Start the animation
        setTimeout(addNextWord, 500);
    }
}); 