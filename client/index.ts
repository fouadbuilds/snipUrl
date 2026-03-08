// 1. Element Selectors
const urlInput = document.getElementById('url-input') as HTMLInputElement;
const shortenBtn = document.getElementById('shorten-btn') as HTMLButtonElement;
const resultContainer = document.getElementById('result-container') as HTMLDivElement;
const shortUrlLink = document.getElementById('short-url') as HTMLAnchorElement;
const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;

/**
 * Updates the UI to show the shortened URL result
 * @param shortUrl - The string to display and link to
 */
const displayOutput = (shortUrl: string): void => {
    // Set the link text and the actual href destination
    shortUrlLink.textContent = shortUrl;
    shortUrlLink.href = shortUrl.startsWith('http') ? shortUrl : `https://${shortUrl}`;
    
    // Reveal the container
    resultContainer.classList.remove('hidden');
};

/**
 * Handles the copy-to-clipboard functionality with visual feedback
 */
const handleCopy = async (): Promise<void> => {
    const textToCopy = shortUrlLink.textContent || "";
    
    try {
        await navigator.clipboard.writeText(textToCopy);
        
        // Visual Feedback: Change icon to text temporarily
        const originalContent = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span style="font-size: 0.7rem; font-weight: bold;">copied</span>';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalContent;
            // Refresh Lucide icons if using the CDN script
            (window as any).lucide?.createIcons();
        }, 1200);
    } catch (err) {
        console.error("Clipboard error:", err);
    }
};

// 2. Event Listeners

// Trigger output when clicking the arrow
shortenBtn.addEventListener('click', () => {
    if (urlInput.value.trim() !== "") {
        displayOutput(`snip.url/${Math.random().toString(36).substring(7)}`);
    }
});

// Trigger output when pressing Enter
urlInput.addEventListener('keypress', (e: KeyboardEvent) => {
    if (e.key === 'Enter' && urlInput.value.trim() !== "") {
        displayOutput(`snip.url/${Math.random().toString(36).substring(7)}`);
    }
});

// Copy button click
copyBtn.addEventListener('click', handleCopy);