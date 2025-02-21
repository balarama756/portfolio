const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Secure credentials

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Debug Middleware: Log Incoming Requests
app.use((req, res, next) => {
    console.log("📩 Raw Request Body:", req.body);
    next();
});

// Serve Static Files
app.use(express.static(path.join(__dirname)));

// Contact Form API Route
app.post("/api/contact", async (req, res) => {
    try {
        console.log("📩 Full Request Body:", req.body); // ✅ Ensure all data is logged

        const { name, email, phone, subject, message } = req.body;

        // 🛑 Fix: Make sure the `subject` is included in logs and checks
        if (!name || !email || !phone || !subject || !message) {
            console.error("❌ Missing Fields:", { name, email, phone, subject, message });
            return res.status(400).json({ error: "All fields are required" });
        }

        console.log("✅ Data Received Successfully:", { name, email, phone, subject, message });

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Use environment variables
                pass: process.env.EMAIL_PASS,
            },
        });

        // Define Email Options
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: "balaramak86@gmail.com",
            subject: `New Contact Form - ${subject}`, // ✅ Fixed: Ensure subject is passed
            text: `You have a new message:\n\n
                📌 Name: ${name}\n
                📧 Email: ${email}\n
                📱 Phone: ${phone}\n
                📝 Subject: ${subject}\n
                💬 Message: ${message}\n\n
                🔔 Please respond soon.`,
        };

        // Send Email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("❌ Email Error:", err);
                return res.status(500).json({ message: "Error sending message." });
            }
            console.log("✅ Email Sent Successfully:", info.response);
            res.status(200).json({ message: "Message sent successfully!" });
        });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ message: "Server error occurred." });
    }
});

// Start Server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    const open = (await import("open")).default;
    open(`http://localhost:${PORT}/index.html`);
});
