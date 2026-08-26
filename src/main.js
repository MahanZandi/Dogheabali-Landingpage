import './main.css';

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
  });
}

// Sliding Nav Underline
const navLinks = document.getElementById('nav-links');
const indicator = document.getElementById('nav-indicator');
const links = navLinks?.querySelectorAll('.nav-link');

if (links && indicator) {
  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      const rect = link.getBoundingClientRect();
      const parentRect = navLinks.getBoundingClientRect();
      indicator.style.left = `${rect.left - parentRect.left}px`;
      indicator.style.width = `${rect.width}px`;
    });
  });

  // Hide on leave
  navLinks.addEventListener('mouseleave', () => {
    indicator.style.width = '0px';
  });
}
