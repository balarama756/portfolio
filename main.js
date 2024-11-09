let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active')

}

/*======================================================= Scroll section active link ================================================================*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id= sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach.apply(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    /*========================================================== Sticky nav bar ================================================================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

     /*==================================================== Remove toggle icon and nav bar ================================================================*/
     menuIcon.classList.remove('fa-xmark');
     navbar.classList.remove('active'); 
};

 /*==================================================== Scroll reveal js ================================================================*/
ScrollReveal({
    distance:'80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, heading',  { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'buttom'});
ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left'});
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right'});
/*===================================== =============== typed js ================================================================*/
const typed = new Typed('.multiple-text',{
    strings:['Full Stack Developer', 'web designer', 'memer', 'video editor','Graphic designer'],
    typeSpeed:70,
    backSpeed:70,
    backDelay: 1000,
    loop: true,
}); 

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Get form data
    let fullName = document.getElementById('full-name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;

    // Prepare data to send
    let formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('subject', subject);
    formData.append('message', message);

    // Send data to the server using Fetch API
    fetch('send_message.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Show response message to the user
        const responseMessage = document.getElementById('response-message');
        if (data.success) {
            responseMessage.style.color = 'green';
            responseMessage.textContent = 'Your message was sent successfully!';
        } else {
            responseMessage.style.color = 'red';
            responseMessage.textContent = 'There was an error sending your message. Please try again later.';
        }
        responseMessage.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        const responseMessage = document.getElementById('response-message');
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'There was an error sending your message. Please try again later.';
        responseMessage.style.display = 'block';
    });
});
