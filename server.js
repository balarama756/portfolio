const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Set the ngrok URL
const ngrokUrl = 'https://12a1-139-5-248-27.ngrok-free.app';  // Ensure you replace this with your actual ngrok URL

// CORS setup
app.use(cors({
  origin: [
    'http://localhost:8080', // Local development (if you're working on your local machine)
    'https://balarama756.github.io', // GitHub Pages URL
    ngrokUrl, // Ngrok URL (ensure you update this when your Ngrok URL changes)
    '*', // Allow all origins temporarily for debugging (remove this later)
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // Allow cookies and credentials to be sent
}));

// Handle OPTIONS (Preflight) requests
app.options('*', cors({
  origin: [
    'http://localhost:8080', 
    'https://balarama756.github.io', 
    ngrokUrl,
    '*', // Temporarily for debugging
  ],
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the Message model
const Message = mongoose.model('Message', new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
}));

// Route to handle message submissions (POST)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new Message({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();
    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending message. Please try again.' });
  }
});

// Route to fetch all messages (GET)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
