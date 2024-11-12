// Import Redux (use this in case you are running a Node.js environment or CDN in the browser)
const { createStore } = Redux;

// Step 1: Define Action Types
const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

// Step 2: Define Action Creators
function setSuccessMessage(message) {
    return {
        type: SET_SUCCESS_MESSAGE,
        payload: message
    };
}

function setErrorMessage(message) {
    return {
        type: SET_ERROR_MESSAGE,
        payload: message
    };
}

// Step 3: Define Initial State
const initialState = {
    successMessage: '',
    errorMessage: ''
};

// Step 4: Define Reducer
function messageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SUCCESS_MESSAGE:
            return { ...state, successMessage: action.payload };
        case SET_ERROR_MESSAGE:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}

// Step 5: Create Redux Store
const store = createStore(messageReducer);

// Step 6: Subscribe to the Redux Store
store.subscribe(() => {
    const state = store.getState();
    const successMessageDiv = document.querySelector('.success-message');
    const errorMessageDiv = document.querySelector('.error-message');

    if (state.successMessage) {
        successMessageDiv.textContent = state.successMessage;
        successMessageDiv.style.display = 'block';
        successMessageDiv.classList.add('show');
        setTimeout(() => {
            successMessageDiv.classList.remove('show');
            successMessageDiv.style.display = 'none';
        }, 3000);
    }

    if (state.errorMessage) {
        errorMessageDiv.textContent = state.errorMessage;
        errorMessageDiv.style.display = 'block';
        errorMessageDiv.classList.add('show');
        setTimeout(() => {
            errorMessageDiv.classList.remove('show');
            errorMessageDiv.style.display = 'none';
        }, 3000);
    }
});

// DOM Elements
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

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

// Contact Form Submission with Redux for Success and Error Pop-ups
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

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
            // Dispatch success message to Redux
            store.dispatch(setSuccessMessage('Message sent successfully!'));
        } else {
            // Dispatch error message to Redux
            store.dispatch(setErrorMessage('There was an error sending your message.'));
        }
    } catch (error) {
        // Dispatch error message to Redux
        store.dispatch(setErrorMessage('There was an error sending your message.'));
        console.error('Error:', error); // Log the error
    }
});
