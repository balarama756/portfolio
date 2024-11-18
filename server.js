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

// CORS setup
app.use(cors({
  origin: [
    'http://localhost:8080', // Local development
    'https://balarama756.github.io', // GitHub Pages
    process.env.FRONTEND_URL, // Set in your environment variables for flexibility
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
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

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending message. Please try again.' });
  }
});

// Route to fetch all messages (GET)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching messages.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
