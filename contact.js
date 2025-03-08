document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const fileInput = document.getElementById("resume");
    const fileName = document.getElementById("file-name");
    const removeFileBtn = document.getElementById("remove-file");

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

            const response = await fetch("https://portfolio-y234.onrender.com/api/contact", {
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
});