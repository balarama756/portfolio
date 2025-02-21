document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("mobile").value.trim(); // Ensure ID is correct
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !phone || !subject || !message) {
            alert("All fields are required.");
            return;
        }

        // ✅ Log data before sending
        console.log("📤 Sending Data:", { name, email, phone, subject, message });

        try {
            const response = await fetch("https://portfolio-6-awit.onrender.com/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, subject, message }),
            });

            const result = await response.json();
            console.log("✅ Server Response:", result);

            if (response.ok) {
                alert("Message sent successfully!");
                contactForm.reset();
            } else {
                alert(result.message || "Failed to send message.");
            }
        } catch (error) {
            console.error("❌ Error:", error);
            alert("An error occurred. Please try again.");
        }
    });
});
