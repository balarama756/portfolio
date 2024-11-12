let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

/======================================================= Scroll section active link ================================================================/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

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

    /========================================================== Sticky nav bar ================================================================/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /==================================================== Remove toggle icon and nav bar ================================================================/
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

/==================================================== Scroll reveal js ================================================================/
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });

/===================================== =============== typed js ================================================================/
const typed = new Typed('.multiple-text', {
    strings: ['Full Stack Developer', 'web designer', 'memer', 'video editor', 'Graphic designer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

/==================================================== Contact Form Submission ================================================================/
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
            alert('Message sent successfully!');
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        alert('There was an error sending your message.');
        console.error(error); // Log the error for debugging
    }
});