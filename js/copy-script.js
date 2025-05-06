document.addEventListener('DOMContentLoaded', function() {
  const loadstringCode = document.getElementById('loadstring-code');
  const copyMessage = document.getElementById('copy-message');
  const codeWrapper = document.querySelector('.code-wrapper');
  
  if (loadstringCode && copyMessage && codeWrapper) {
    // Make both the pre element and its wrapper clickable
    codeWrapper.addEventListener('click', copyToClipboard);
    loadstringCode.addEventListener('click', copyToClipboard);
    
    function copyToClipboard(e) {
      // Prevent event bubbling if clicked on pre
      e.stopPropagation();
      
      // Copy the text to clipboard
      const textToCopy = loadstringCode.textContent;
      
      try {
        // For modern browsers
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            // Show the copy animation
            copyMessage.classList.add('show');
            
            // Hide the message after animation completes
            setTimeout(() => {
              copyMessage.classList.remove('show');
            }, 2000);
          })
          .catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback for clipboard API failure
            fallbackCopyTextToClipboard(textToCopy);
          });
      } catch (err) {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(textToCopy);
      }
    }
  }
  
  // Fallback copy method for older browsers
  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        copyMessage.classList.add('show');
        setTimeout(() => {
          copyMessage.classList.remove('show');
        }, 2000);
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
  }
});