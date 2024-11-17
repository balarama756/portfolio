const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Set the ngrok URL (use dynamic ngrok URL if running Ngrok)
const ngrokUrl = 'https://fd2a-139-5-248-27.ngrok-free.app'; // Replace with your actual ngrok URL

// Enable CORS for specific origins and handle preflight requests
app.use(cors({
  origin: ['http://localhost:8080', 'https://balarama756.github.io', ngrokUrl], // Add your actual domains and ngrok URL here
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Preflight request handling globally (OPTIONS)
app.options('*', cors({
  origin: ['http://localhost:8080', 'https://balarama756.github.io', ngrokUrl],
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

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
  console.log('Received contact request:', req.body); // Log the data sent by the client
  try {
    const { name, email, subject, message } = req.body;

    // Save message to the database
    const newMessage = new Message({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();
    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (err) {
    console.error('Error while saving the message:', err);
    res.status(500).json({ message: 'Error sending message. Please try again.' });
  }
});

// Route to fetch all messages (GET)
app.get('/api/messages', async (req, res) => {
  console.log('Fetching all messages...');
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error('Error while fetching messages:', err);
    res.status(500).json({ message: 'Error fetching messages.' });
  }
});

// Log response headers for debugging
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('Response Headers:', res.getHeaders());
  });
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
