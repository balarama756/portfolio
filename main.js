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
