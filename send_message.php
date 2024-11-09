<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $fullName = $_POST['full_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Email address to send the message to (example)
    $to = "developer@example.com"; // Replace with actual email address
    $headers = "From: " . $email;

    // Prepare the message
    $email_message = "Name: " . $fullName . "\n";
    $email_message .= "Email: " . $email . "\n";
    $email_message .= "Phone: " . $phone . "\n";
    $email_message .= "Subject: " . $subject . "\n";
    $email_message .= "Message: " . $message . "\n";

    // Send email (for this example, we use the PHP mail function)
    if (mail($to, $subject, $email_message, $headers)) {
        // Send JSON response on success
        echo json_encode(['success' => true]);
    } else {
        // Send JSON response on failure
        echo json_encode(['success' => false]);
    }
}
?>
