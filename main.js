// Constants and Configurations
const API_URL = 'https://your-backend-url.com/api/contact'; // Replace with your deployed backend URL

// Select DOM elements
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

// Create reusable message pop-ups
const successMessage = document.createElement('div');
const errorMessage = document.createElement('div');

successMessage.classList.add('message', 'success-message');
errorMessage.classList.add('message', 'error-message');

document.body.appendChild(successMessage);
document.body.appendChild(errorMessage);

// Toggle Menu Icon and Navbar
menuIcon.onclick = () => {
  menuIcon.classList.toggle('fa-xmark'); // CSS class for the "X" icon
  navbar.classList.toggle('active');    // CSS class to show/hide the navbar
};

// Scroll Behavior and Active Link Highlight
window.onscroll = () => {
  const top = window.scrollY;

  // Highlight active section
  sections.forEach((section) => {
    const offset = section.offsetTop - 150;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => link.classList.remove('active'));
      const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
      if (activeLink) activeLink.classList.add('active'); // CSS class for the active link
    }
  });

  // Sticky Header
  const header = document.querySelector('header');
  header.classList.toggle('sticky', top > 100); // CSS class for the sticky header

  // Close Navbar on Scroll
  menuIcon.classList.remove('fa-xmark');
  navbar.classList.remove('active');
};

// Scroll Reveal Animations
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });

// Typed.js Animations
new Typed('.multiple-text', {
  strings: ['Full Stack Developer', 'Web Designer', 'Memer', 'Video Editor', 'Graphic Designer'],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true,
});

// Form Submission with Success and Error Messages
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validate form inputs
  if (!name || !email || !subject || !message) {
    showMessage('All fields are required.', 'error');
    return;
  }

  const data = { name, email, subject, message };

  try {
    // Send data to backend
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      showMessage(result.message || 'Message sent successfully!', 'success');
    } else {
      showMessage(result.message || 'Failed to send message. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage('An unexpected error occurred. Please try again.', 'error');
  }
});

// Function to Display Success/Error Messages
function showMessage(message, type) {
  const messageBox = type === 'success' ? successMessage : errorMessage;
  messageBox.textContent = message;
  messageBox.style.display = 'block';
  messageBox.classList.add('show'); // Add animation class

  setTimeout(() => {
    messageBox.classList.remove('show'); // Remove animation
    messageBox.style.display = 'none'; // Hide after animation
  }, 3000);
}
