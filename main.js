// Toggle menu icon and navbar with overlay
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);

menuIcon.onclick = () => {
    menuIcon.classList.toggle("active");
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = navbar.classList.contains("active") ? "hidden" : "auto";
};

// Close menu when clicking overlay
overlay.onclick = () => {
    menuIcon.classList.remove("active");
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
};

// Close menu when clicking navigation links
document.querySelectorAll(".navbar a").forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove("active");
        navbar.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
    };
});

// Scroll sections active link
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
            });
        }
    });

    // Sticky navbar
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 100);

    // Remove menu when clicking on navbar link
    menuIcon.classList.remove("active");
    navbar.classList.remove("active");
};

// Scroll reveal
ScrollReveal({
    reset: true,
    distance: "80px",
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .services-container, .portfolio-box, .contact form", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

// Typed.js effect
var typed = new Typed(".multiple-text", {
    strings: ["Web Designer", "Video Editor", "Editor", "Memer"],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1000,
    loop: true
});