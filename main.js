// Select DOM elements
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Create success pop-up div
let successMessage = document.createElement('div');
successMessage.classList.add('success-message');
document.body.appendChild(successMessage); // Append to body

// Create error pop-up div
let errorMessage = document.createElement('div');
errorMessage.classList.add('error-message');
document.body.appendChild(errorMessage); // Append to body

// Menu Toggle
menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

// Scroll section active link
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');

            });
        }
    });

    // Sticky nav bar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

// Scroll reveal JS
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});
ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });

// Typed JS
const typed = new Typed('.multiple-text', {
    strings: ['Full Stack Developer', 'Web Designer', 'Memer', 'Video Editor', 'Graphic Designer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

// Contact Form Submission with Success and Error Pop-ups
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const data = { name, email, subject, message };

    try {
        const response = await fetch( 'https://12a1-139-5-248-27.ngrok-free.app/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors', // Ensure CORS mode is enabled
        });
        
        const result = await response.json();

        if (response.ok) {
            // Show success message
            successMessage.textContent = 'Message sent successfully!';
            successMessage.style.display = 'block';
            successMessage.classList.add('show'); // Add animation class for fade-in
            setTimeout(() => {
                successMessage.classList.remove('show'); // Remove fade-in animation
                successMessage.style.display = 'none'; // Hide after animation
            }, 3000);
        } else {
            // Show error message
            errorMessage.textContent = 'There was an error sending your message.';
            errorMessage.style.display = 'block';
            errorMessage.classList.add('show'); // Add animation class for fade-in
            setTimeout(() => {
                errorMessage.classList.remove('show'); // Remove fade-in animation
                errorMessage.style.display = 'none'; // Hide after animation
            }, 3000);
        }
    } catch (error) {
        // Show error pop-up in case of a fetch error
        errorMessage.textContent = 'There was an error sending your message.';
        errorMessage.style.display = 'block';
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
            errorMessage.style.display = 'none';
        }, 3000);
        console.error('Error:', error); // Log the error
    }
});