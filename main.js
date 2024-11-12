// Select DOM elements
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let successMessage = document.createElement('div'); // Create a success pop-up div
successMessage.classList.add('success-message'); // Add a class for styling the pop-up
document.body.appendChild(successMessage); // Append the message to the body

let errorMessage = document.createElement('div'); // Create an error pop-up div
errorMessage.classList.add('error-message'); // Add a class for styling the pop-up
document.body.appendChild(errorMessage); // Append the error message to the body

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
                document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
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
    e.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const data = { name, email, subject, message };

    try {
        const response = await fetch('https://cd63-139-5-248-121.ngrok-free.app/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            // Display success pop-up
            successMessage.textContent = 'Message sent successfully!';
            successMessage.style.display = 'block';
            successMessage.style.backgroundColor = '#28a745'; // Green for success
            successMessage.style.color = '#fff';
            setTimeout(() => {
                successMessage.style.display = 'none'; // Hide the pop-up after 3 seconds
            }, 3000);
        } else {
            // Display error pop-up in red
            errorMessage.textContent = 'There was an error sending your message.';
            errorMessage.style.display = 'block';
            errorMessage.style.backgroundColor = '#dc3545'; // Red for error
            errorMessage.style.color = '#fff';
            setTimeout(() => {
                errorMessage.style.display = 'none'; // Hide the error pop-up after 3 seconds
            }, 3000);
        }
    } catch (error) {
        // Display error pop-up in red
        errorMessage.textContent = 'There was an error sending your message.';
        errorMessage.style.display = 'block';
        errorMessage.style.backgroundColor = '#dc3545'; // Red for error
        errorMessage.style.color = '#fff';
        setTimeout(() => {
            errorMessage.style.display = 'none'; // Hide the error pop-up after 3 seconds
        }, 3000);
        console.error(error); // Log the error for debugging
    }
});
