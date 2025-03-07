const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
require("dotenv").config(); // Secure credentials

const app = express();
const PORT = process.env.PORT || 5000;

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pdf', '.doc', '.docx'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF and DOC files are allowed.'));
        }
    }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5000",
    credentials: true
}));

// Debug Middleware: Log Incoming Requests
app.use((req, res, next) => {
    console.log("📩 Raw Request Body:", req.body);
    next();
});

// Serve Static Files
app.use(express.static(path.join(__dirname)));

// Create transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    debug: true // Enable debug logs
});

// Verify transporter
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Verification Error:", error);
    } else {
        console.log("Server is ready to send emails");
    }
});

// Contact Form API Route with file upload
app.post("/api/contact", upload.single('resume'), async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Enhanced email template
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
                    <h2 style="color: #5982F4; border-bottom: 2px solid #5982F4; padding-bottom: 10px;">New Portfolio Contact</h2>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #333;">Contact Details:</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>

                    <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
                        <h3 style="color: #333;">Message:</h3>
                        <p style="line-height: 1.6;">${message}</p>
                    </div>
                </div>
            `,
            attachments: req.file ? [
                {
                    filename: req.file.originalname,
                    content: req.file.buffer
                }
            ] : []
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send message",
            error: error.message
        });
    }
});

// Start Server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    const open = (await import("open")).default;
    open(`http://localhost:${PORT}/index.html`);
});