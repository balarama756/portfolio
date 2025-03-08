document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const fileInput = document.getElementById("resume");
    const fileName = document.getElementById("file-name");
    const removeFileBtn = document.getElementById("remove-file");
    const formContainer = document.getElementById('form-container');
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');
    const zoomReset = document.getElementById('zoom-reset');

    // Display selected file name and show remove button
    fileInput.addEventListener("change", function() {
        if (this.files[0]) {
            fileName.textContent = this.files[0].name;
            removeFileBtn.style.display = "block";
        } else {
            fileName.textContent = "";
            removeFileBtn.style.display = "none";
        }
    });

    // Remove file handler
    removeFileBtn.addEventListener("click", function() {
        fileInput.value = "";
        fileName.textContent = "";
        removeFileBtn.style.display = "none";
    });

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", document.getElementById("name").value.trim());
        formData.append("email", document.getElementById("email").value.trim());
        formData.append("phone", document.getElementById("mobile").value.trim());
        formData.append("subject", document.getElementById("subject").value.trim());
        formData.append("message", document.getElementById("message").value.trim());
        
        if (fileInput.files[0]) {
            formData.append("resume", fileInput.files[0]);
        }

        try {
            const submitBtn = contactForm.querySelector(".btn");
            const originalBtnText = submitBtn.value;
            submitBtn.value = "Sending...";
            submitBtn.disabled = true;

            const response = await fetch("https://portfolio-7-jzx3.onrender.com/api/contact", {
                method: "POST",
                body: formData,
                mode: 'cors',
                credentials: 'same-origin'
            });

            const result = await response.json();

            if (response.ok) {
                alert("Message sent successfully!");
                contactForm.reset();
                fileName.textContent = "";
                removeFileBtn.style.display = "none";
            } else {
                throw new Error(result.message || "Failed to send message");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            submitBtn.value = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    let scale = 1;
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    // Zoom controls
    zoomIn.addEventListener('click', () => {
        if (scale < 1.5) {
            scale += 0.1;
            updateFormTransform();
        }
    });

    zoomOut.addEventListener('click', () => {
        if (scale > 0.5) {
            scale -= 0.1;
            updateFormTransform();
        }
    });

    zoomReset.addEventListener('click', () => {
        scale = 1;
        updateFormTransform();
        formContainer.scrollTo(0, 0);
    });

    // Pan functionality
    contactForm.addEventListener('mousedown', (e) => {
        isDragging = true;
        contactForm.style.cursor = 'grabbing';
        
        startX = e.pageX - formContainer.offsetLeft;
        startY = e.pageY - formContainer.offsetTop;
        scrollLeft = formContainer.scrollLeft;
        scrollTop = formContainer.scrollTop;
    });

    contactForm.addEventListener('mouseleave', () => {
        isDragging = false;
        contactForm.style.cursor = 'grab';
    });

    contactForm.addEventListener('mouseup', () => {
        isDragging = false;
        contactForm.style.cursor = 'grab';
    });

    contactForm.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        e.preventDefault();
        const x = e.pageX - formContainer.offsetLeft;
        const y = e.pageY - formContainer.offsetTop;

        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;

        formContainer.scrollLeft = scrollLeft - walkX;
        formContainer.scrollTop = scrollTop - walkY;
    });

    // Touch events for mobile
    contactForm.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - formContainer.offsetLeft;
        startY = e.touches[0].pageY - formContainer.offsetTop;
        scrollLeft = formContainer.scrollLeft;
        scrollTop = formContainer.scrollTop;
    });

    contactForm.addEventListener('touchend', () => {
        isDragging = false;
    });

    contactForm.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const x = e.touches[0].pageX - formContainer.offsetLeft;
        const y = e.touches[0].pageY - formContainer.offsetTop;

        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;

        formContainer.scrollLeft = scrollLeft - walkX;
        formContainer.scrollTop = scrollTop - walkY;
    });

    function updateFormTransform() {
        contactForm.style.transform = `scale(${scale})`;
    }
});