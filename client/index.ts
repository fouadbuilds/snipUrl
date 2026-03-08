// 1. Element Selectors
const urlInput = document.getElementById('url-input') as HTMLInputElement;
const shortenBtn = document.getElementById("shorten-btn") as HTMLButtonElement;
const resultContainer = document.getElementById(
  "result-container",
) as HTMLDivElement;
const shortUrlLink = document.getElementById("short-url") as HTMLAnchorElement;
const copyBtn = document.getElementById("copy-btn") as HTMLButtonElement;
import { postLongUrl } from "./api.js";

// /**
//  * Updates the UI to show the shortened URL result
//  * @param shortUrl - The string to display and link to
//  */
// const displayOutput = (shortUrl: string): void => {

//   // Set the link text and the actual href destination
//   shortUrlLink.textContent = shortUrl;
//   shortUrlLink.href = shortUrl.startsWith("http")
//     ? shortUrl
//     : `https://${shortUrl}`;

//   // Reveal the container
//   resultContainer.classList.remove("hidden");
// };

/**
 * Handles the copy-to-clipboard functionality with visual feedback
 */
const handleCopy = async (): Promise<void> => {
  const textToCopy = shortUrlLink.textContent || "";

  try {
    await navigator.clipboard.writeText(textToCopy);

    const originalContent = copyBtn.innerHTML;

    copyBtn.innerHTML = '<i data-lucide="check"></i>';

    (window as any).lucide?.createIcons();

    setTimeout(() => {
      copyBtn.innerHTML = originalContent;

      (window as any).lucide?.createIcons();
    }, 1200);
  } catch (err) {
    console.error("Clipboard error:", err);
  }
};

// 2. Event Listeners

// Trigger output when clicking the arrow
shortenBtn.addEventListener("click", async () => {
  const longUrl: string = urlInput.value;

  if (longUrl !== "") {
    try {
      const data = await postLongUrl(longUrl);
      shortUrlLink.textContent = data.message;
      resultContainer.classList.remove("hidden");
    } catch (error) {
      console.error("Failed to shorten url:", error);
      shortUrlLink.textContent = "Error!";
    }
  }
});

// Trigger output when pressing Enter
urlInput.addEventListener("keypress", async (e: KeyboardEvent) => {
  if (e.key === "Enter" && urlInput.value.trim() !== "") {
    const longUrl: string = urlInput.value;

    try {
      const data = await postLongUrl(longUrl);
      shortUrlLink.textContent = data.message;
      resultContainer.classList.remove("hidden");
    } catch (error) {
      console.error("Failed to shorten:", error);
      shortUrlLink.textContent = "Error!";
    }
  }
});

// Copy button click
copyBtn.addEventListener("click", handleCopy);
