<?php
// Check if the form is submitted via POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Collect form data
    $fullName = isset($_POST['full_name']) ? trim($_POST['full_name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Validate the input data
    if (empty($fullName) || empty($email) || empty($phone) || empty($subject) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all fields.']);
        exit;
    }

    // Sanitize the input data to prevent XSS or security issues
    $fullName = filter_var($fullName, FILTER_SANITIZE_STRING);
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    $phone = filter_var($phone, FILTER_SANITIZE_NUMBER_INT);
    $subject = filter_var($subject, FILTER_SANITIZE_STRING);
    $message = filter_var($message, FILTER_SANITIZE_STRING);

    // Validate the email address
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
        exit;
    }

    // Define the recipient email (change this to your actual email address)
    $to = "developer@example.com"; // Replace with your actual email address

    // Prepare the email headers
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Prepare the email content
    $emailMessage = "You have received a new message from the contact form on your website.\n\n";
    $emailMessage .= "Name: " . $fullName . "\n";
    $emailMessage .= "Email: " . $email . "\n";
    $emailMessage .= "Phone: " . $phone . "\n";
    $emailMessage .= "Subject: " . $subject . "\n";
    $emailMessage .= "Message:\n" . $message . "\n";

    // Attempt to send the email using PHP's mail() function
    if (mail($to, $subject, $emailMessage, $headers)) {
        // If the email was successfully sent, return a success response
        echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!']);
    } else {
        // If the email could not be sent, return a failure response
        echo json_encode(['success' => false, 'message' => 'There was an error sending your message. Please try again later.']);
    }

} else {
    // If the request method is not POST, return an error response
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
