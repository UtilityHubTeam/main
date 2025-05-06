document.addEventListener('DOMContentLoaded', function() {
  // Add parallax effect to recent post items
  const postItems = document.querySelectorAll('.recent-post-item');
  
  postItems.forEach(item => {
    // Add subtle mouse movement effect
    item.addEventListener('mousemove', function(e) {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      // Calculate percentage position
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      
      // Apply subtle transform based on mouse position
      // This creates a 3D-like effect where the card follows the mouse
      const tiltAmount = 2; // Maximum tilt in degrees
      const tiltX = (0.5 - yPercent) * tiltAmount;
      const tiltY = (xPercent - 0.5) * tiltAmount;
      
      item.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    
    // Reset transform when mouse leaves
    item.addEventListener('mouseleave', function() {
      item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
  
  // Add a subtle shine effect that follows the mouse
  postItems.forEach(item => {
    const shine = document.createElement('div');
    shine.classList.add('shine-effect');
    item.appendChild(shine);
    
    item.addEventListener('mousemove', function(e) {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      // Calculate percentage position
      const xPercent = x / rect.width * 100;
      const yPercent = y / rect.height * 100;
      
      // Position the shine effect at the mouse position
      shine.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`;
    });
  });
});