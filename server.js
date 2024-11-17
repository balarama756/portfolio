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

// Explicit CORS Handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://balarama756.github.io'); // Replace with your actual domain
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(204).send(); // No content for preflight requests
  }
  next();
});

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
  console.log('Received contact request:', req.body);
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
